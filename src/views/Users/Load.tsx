import * as React from 'react'
import { Col, Row, Card, Form, Button, Table } from 'react-bootstrap'
import { DropzoneComponent } from 'react-dropzone-component'
import AsyncSelect from 'react-select/async'
import { apiAuth } from '../../utils/api'
import { InstitutionInterface, LoadOptionsInterface } from '../../interfaces/LoadInterface'
import './Load.scss'
import InstitutionModal from './Components/InstitutionsModal'
import Select from 'react-select'
import SitesModal from './Components/sitesModal'
import MentorModal from './Components/mentorModal'
import { User } from '../../interfaces/UserInterfaces'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Papa from 'papaparse'
import { writeText } from '@tauri-apps/api/clipboard'

interface studentsLoad {
  'Número de identificación': string
  'Tipo de documento': string
  'Nombre Completo ': string
  Email: string
  Usuario: string
  Contraseña: string
}

let dropzone: any
const Load = () => {
  const [institutionId, setInstitutionId] = React.useState<number>(0)
  const [openModalInstitution, setOpenModalInstitution] = React.useState<boolean>(false)
  const [openModalSites, setOpenModalSites] = React.useState<boolean>(false)
  const [openModalMentor, setOpenModalMentor] = React.useState<boolean>(false)
  const [loadOptionsInstitutions, setLoadOptionsInstitutions] = React.useState<
    LoadOptionsInterface[]
  >([])
  const [loadOptionsSites, setLoadOptionsSites] = React.useState<LoadOptionsInterface[]>([])
  const [mentorsOptions, setMentorsOptions] = React.useState<LoadOptionsInterface[]>([])
  const [productsOptions, setProductsOptions] = React.useState<LoadOptionsInterface[]>([])

  const [productsSelected, setProductsSelected] = React.useState<number[]>([])
  const [sitesSelected, setSitesSelected] = React.useState<number>(0)
  const [roleSelected, setRoleSelected] = React.useState<string>('')
  const [studentsLoad, setStudentsLoad] = React.useState<studentsLoad[]>([])
  const [mentorSelected, setMentorSelected] = React.useState<number[]>([])
  const [groupNumber, setGroupNumber] = React.useState<string>('')
  const [nameGroup, setNameGroup] = React.useState<string>('')

  const [loading, setLoading] = React.useState<boolean>(false)

  const sweetAlertHandler = (alert: {
    title: string
    text: string
    type: undefined | 'warning' | 'error' | 'success' | 'info' | 'question'
  }) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: alert.title,
      text: alert.text,
      icon: alert.type,
    })
  }

  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: [
      '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
    ],
  }
  const componentConfig = {
    iconFiletypes: ['.cvs'],
    showFiletypeIcon: true,
    postUrl: '/',
  }

  const eventHandlers = {
    init: (dz: any) => {
      dropzone = dz
    },
    complete: (file: any) => {
      console.log(file)
    },
    error: () => {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'Ocurrio algo mal subiendo el bundle',
      })
    },
  }

  React.useEffect(() => {
    getInstitutions()
    getMentors()
    getProducts()
  }, [])

  const handleInstitutionChange = (selectedOption: LoadOptionsInterface | null) => {
    if (selectedOption === null) return
    setInstitutionId(selectedOption.value)
    getSites(selectedOption.value)
  }

  const handleReset = () => {
    getInstitutions()
  }

  const handleResetSites = () => {
    getSites(institutionId)
  }

  const handleResetMentor = () => {
    getMentors()
  }

  const getInstitutions = () => {
    apiAuth.get('/organization').then((response) => {
      const options = response.data.map((institution: InstitutionInterface) => ({
        value: institution.id,
        label: institution.name,
      }))
      setLoadOptionsInstitutions(options)
    })
  }

  const getSites = (institutionId: number) => {
    apiAuth.get('/institution/organization/' + institutionId).then((response) => {
      const options = response.data.map((institution: InstitutionInterface) => ({
        value: institution.id,
        label: institution.name,
      }))
      setLoadOptionsSites(options)
    })
  }

  const getMentors = () => {
    apiAuth.get('/user/role/Mentor').then((response) => {
      const options = response.data.map((mentor: User) => ({
        value: mentor.id,
        label: mentor.fullName,
      }))
      setMentorsOptions(options)
    })
  }

  const getProducts = () => {
    apiAuth.get('/products').then((response) => {
      const options = response.data.map((product: InstitutionInterface) => ({
        value: product.id,
        label: product.name,
      }))
      setProductsOptions(options)
    })
  }

  const loadCsv = () => {
    if (dropzone.files.length === 0) {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'No se ha seleccionado ningún archivo',
      })
      return
    }
    for (let i = 0; i < dropzone.files.length; i++) {
      console.log(dropzone.files[i])
      Papa.parse(dropzone.files[i], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const students: studentsLoad[] = results.data
          setStudentsLoad(students)
          dropzone.emit('complete', dropzone.files[i])
        },
      })
    }
  }

  const createUser = () => {
    setLoading(true)
    if (studentsLoad.length === 0) {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'No se ha cargado ningún archivo',
      })
      setLoading(false)
      return
    }

    if (roleSelected === '') {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'No se ha seleccionado un rol',
      })
      setLoading(false)
      return
    }
    if (
      nameGroup === '' ||
      groupNumber === '' ||
      sitesSelected === 0 ||
      productsSelected.length === 0
    ) {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'Faltan datos por llenar',
      })
      setLoading(false)
      return
    }

    // map students
    const students: any = studentsLoad.map((student) => {
      return {
        email: student.Email,
        fullName: student['Nombre Completo '],
        role: roleSelected,
        institution: sitesSelected,
        productIds: productsSelected,
        username: student.Usuario,
        typeDocumentName: student['Tipo de documento'],
        password: generatePassword(
          student['Número de identificación'],
          student['Nombre Completo '],
        ),
        identification: student['Número de identificación'],
      }
    })

    const payload = {
      students,
      mentors: mentorSelected,
      numberGroup: groupNumber,
      nameGroup,
      rol: roleSelected,
      products: productsSelected,
      institution: sitesSelected,
    }

    apiAuth
      .post('/groups/load', payload)
      .then((response) => {
        setLoading(false)
        // Clean data
        setStudentsLoad([])
        setMentorSelected([])
        setGroupNumber('')
        setNameGroup('')
        setRoleSelected('')
        setProductsSelected([])
        setInstitutionId(0)
        setSitesSelected(0)
        const studentsClipboard = students.map((student: any) => {
          const newStudent: any = {}
          newStudent.usuario = student.username
          newStudent.contraseña = student.password
          return newStudent
        })
        const cvsParse = Papa.unparse(studentsClipboard, {
          header: true,
        })
        writeText(cvsParse).then(() => {
          dropzone.removeAllFiles()
          sweetAlertHandler({
            title: '¡Todo salio bien!',
            type: 'success',
            text: 'Los usuarios se han copiado al portapapeles',
          })
        })
      })
      .catch((error) => {
        console.log(error)
        sweetAlertHandler({
          title: '¡Algo salio mal!',
          type: 'error',
          text: 'Ocurrió un error al crear los usuarios',
        })
        setLoading(false)
      })
  }

  const generatePassword = (identification: string, fullName: string) => {
    const password = `${fullName.split(' ')[0].toLocaleLowerCase()}${identification.substring(
      0,
      2,
    )}`
    return password
  }
  return (
    <>
      <InstitutionModal
        showModal={openModalInstitution}
        closeModal={() => {
          setOpenModalInstitution(false)
        }}
        resetInstitutions={handleReset}
      />
      <SitesModal
        showModal={openModalSites}
        closeModal={() => {
          setOpenModalSites(false)
        }}
        institutions={loadOptionsInstitutions}
        resetSites={handleResetSites}
        currentInstitution={institutionId}
      />
      <MentorModal
        showModal={openModalMentor}
        closeModal={() => {
          setOpenModalMentor(false)
        }}
        resetMentors={handleResetMentor}
      />
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <h5>Configuración base</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3} lg={3} md={3}>
                  {' '}
                  <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                      as='select'
                      value={roleSelected}
                      onChange={(event) => {
                        setRoleSelected(event.target.value)
                      }}
                    >
                      <option>Seleccione Rol</option>
                      <option>Student</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={8} lg={4} md={6}>
                  {' '}
                  <Form.Group>
                    <Form.Label>Institución</Form.Label>
                    <Select
                      name='Institución'
                      className='select-load'
                      classNamePrefix='select'
                      onChange={handleInstitutionChange}
                      isSearchable
                      placeholder='Seleccione una institución'
                      loadingMessage={() => 'Cargando...'}
                      options={loadOptionsInstitutions}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} lg={2} md={2}>
                  {institutionId !== 0 && (
                    <Form.Group>
                      <Form.Label>Sede</Form.Label>
                      <Select
                        key={JSON.stringify(institutionId)}
                        cacheOptions
                        defaultOptions={institutionId !== 0 ? true : false}
                        name='Sede'
                        className='select-load'
                        classNamePrefix='select'
                        isSearchable
                        placeholder='Seleccione una sede'
                        options={loadOptionsSites}
                        onChange={(input) => {
                          if (input === null) return
                          setSitesSelected(input.value)
                        }}
                      />
                    </Form.Group>
                  )}
                  {institutionId === 0 && (
                    <Form.Group>
                      <Form.Label>Sede</Form.Label>
                      <AsyncSelect
                        name='Sede'
                        className='select-load'
                        classNamePrefix='select'
                        isSearchable
                        placeholder='Seleccione una sede'
                      />
                    </Form.Group>
                  )}
                </Col>
                <Col sm={12} lg={3} md={12} className='text-center' style={{ alignSelf: 'center' }}>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setOpenModalInstitution(true)
                    }}
                  >
                    Instituciones
                  </Button>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setOpenModalSites(true)
                    }}
                  >
                    Sedes
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={7} lg={9} md={7}>
                  {' '}
                  <Form.Group>
                    <Form.Label>Mentor</Form.Label>
                    <Select
                      key={JSON.stringify(institutionId)}
                      cacheOptions
                      defaultOptions={institutionId !== 0 ? true : false}
                      name='Mentor'
                      className='select-load'
                      classNamePrefix='select'
                      isSearchable
                      isMulti
                      placeholder='Seleccione mentores'
                      options={mentorsOptions}
                      onChange={(input) => {
                        if (input === null) {
                          setMentorSelected([])
                          return
                        }
                        const selectedMentor = input.map(
                          (mentor: LoadOptionsInterface) => mentor.value,
                        )
                        setMentorSelected(selectedMentor)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col sm={5} lg={3} md={5} className='text-center' style={{ alignSelf: 'center' }}>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setOpenModalMentor(true)
                    }}
                  >
                    Crear mentor
                  </Button>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={2}>
                  <Form.Group>
                    <Form.Label>Numero de grupo</Form.Label>
                    <Form.Control
                      as='input'
                      value={groupNumber}
                      onChange={(event) => {
                        setGroupNumber(event.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label>Nombre de grado</Form.Label>
                    <Form.Control
                      as='input'
                      value={nameGroup}
                      onChange={(event) => {
                        setNameGroup(event.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>Productos</Form.Label>
                    <Select
                      name='Products'
                      className='select-load'
                      classNamePrefix='select'
                      isSearchable
                      isMulti
                      placeholder='Seleccione productos'
                      options={productsOptions}
                      onChange={(input) => {
                        if (input === null) {
                          setProductsSelected([])
                          return
                        }
                        const productsSelected = input.map(
                          (product: LoadOptionsInterface) => product.value,
                        )
                        setProductsSelected(productsSelected)
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className='text-center' style={{ alignSelf: 'center' }}>
                  <DropzoneComponent
                    config={componentConfig}
                    djsConfig={djsConfig}
                    eventHandlers={eventHandlers}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={6} className='text-center' style={{ alignSelf: 'center' }}>
                  <Button variant='primary' onClick={loadCsv}>
                    Cargar
                  </Button>
                </Col>
                <Col sm={6} className='text-center' style={{ alignSelf: 'center' }}>
                  {loading ? (
                    <Button disabled variant='outline-warning'>
                      <span
                        className='spinner-grow spinner-grow-sm mr-1 outline-warning'
                        role='status'
                      />
                      Creando...
                    </Button>
                  ) : (
                    <Button variant='outline-warning' onClick={createUser}>
                      Crear usuarios
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>Configuración de carga</small>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <h5>Usuarios cargados</h5>
            </Card.Header>
            <Card.Body>
              <Table variant='dark' responsive style={{ maxHeight: 300 }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Numero identificación</th>
                    <th>Tipo identificación</th>
                    <th>Nombre completo</th>
                    <th>Correo</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsLoad.map((student, index) => (
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td>{student['Número de identificación']}</td>
                      <td>{student['Tipo de documento']}</td>
                      <td>{student['Nombre Completo ']}</td>
                      <td>{student.Email}</td>
                      <td>{student.Usuario}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Load
