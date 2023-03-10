import * as React from 'react'
import AnimatedModal from '../../../App/components/AnimatedModal'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { apiAuth } from '../../../utils/api'
import Select from 'react-select'
import { InstitutionInterface, LoadOptionsInterface } from '../../../interfaces/LoadInterface'

interface InstitutionModalProps {
  showModal: boolean
  closeModal: () => void
  resetMentors: () => void
}

const MentorModal = (props: InstitutionModalProps) => {
  const [identification, setIdentification] = React.useState<string>('')
  const [fullName, setFullName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [userName, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [siteId, setSiteId] = React.useState<number>(0)
  const [sites, setSites] = React.useState<LoadOptionsInterface[]>([])
  const [typeIdentification, setTypeIdentification] = React.useState<LoadOptionsInterface[]>([])
  const [typeIdentificationSelected, setTypeIdentificationSelected] = React.useState<number>(0)
  const [products, setProducts] = React.useState<LoadOptionsInterface[]>([])
  const [productSelected, setProductSelected] = React.useState<number[]>([])

  const createMentor = () => {
    apiAuth
      .post('/user', {
        identification: identification,
        username: userName,
        email: email,
        password: password,
        fullName: fullName,
        role: 'Mentor',
        institution: siteId,
        productIds: productSelected,
        typeDocument: typeIdentificationSelected,
      })
      .then(() => {
        props.closeModal()
        props.resetMentors()
        setIdentification('')
        setFullName('')
        setEmail('')
        setUsername('')
        setPassword('')
        setSiteId(0)
      })
  }

  const getSites = () => {
    apiAuth.get('/institution/organization/name/' + 'CosmoSchool').then((response) => {
      const options = response.data.map((institution: InstitutionInterface) => ({
        value: institution.id,
        label: institution.name,
      }))
      setSites(options)
    })
  }

  const getTypeIdentification = () => {
    apiAuth.get('/user/typedocuments').then((response) => {
      const options = response.data.map((typeIdentification: InstitutionInterface) => ({
        value: typeIdentification.id,
        label: typeIdentification.name,
      }))
      setTypeIdentification(options)
    })
  }

  const getProducts = () => {
    apiAuth.get('/products').then((response) => {
      const options = response.data.map((product: InstitutionInterface) => ({
        value: product.id,
        label: product.name,
      }))
      setProducts(options)
    })
  }

  React.useEffect(() => {
    if (props.showModal) {
      getSites()
      getTypeIdentification()
      getProducts()
    }
  }, [props.showModal])

  return (
    <>
      <AnimatedModal
        animation={'zoom'}
        visible={props.showModal}
        onClose={() => props.closeModal()}
        height={530}
        width={700}
      >
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Crear mentor</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={5}>
                <Form.Group>
                  <Form.Label>Identificación</Form.Label>
                  <Select
                    name='Institución'
                    className='select-load'
                    classNamePrefix='select'
                    isSearchable
                    placeholder='Tipo de identificación'
                    loadingMessage={() => 'Cargando...'}
                    options={typeIdentification}
                    onChange={(input: LoadOptionsInterface | null) => {
                      if (input) {
                        setTypeIdentificationSelected(input.value)
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={7}>
                <Form.Group>
                  <Form.Label>Identificación</Form.Label>
                  <Form.Control
                    as='input'
                    value={identification}
                    onChange={(input) => {
                      setIdentification(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    as='input'
                    value={email}
                    onChange={(input) => {
                      setEmail(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    as='input'
                    value={fullName}
                    onChange={(input) => {
                      setFullName(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    as='input'
                    value={userName}
                    onChange={(input) => {
                      setUsername(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    as='input'
                    type='password'
                    value={password}
                    onChange={(input) => {
                      setPassword(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Sede</Form.Label>
                  <Select
                    name='Institución'
                    className='select-load'
                    classNamePrefix='select'
                    isSearchable
                    options={sites}
                    onChange={(input) => {
                      if (input === null) {
                        setSiteId(0)
                        return
                      }
                      setSiteId(input.value)
                    }}
                    placeholder='Seleccione una sede'
                    loadingMessage={() => 'Cargando...'}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Productos asociados</Form.Label>
                  <Select
                    name='Institución'
                    className='select-load'
                    classNamePrefix='select'
                    isSearchable
                    isMulti
                    options={products}
                    placeholder='Seleccione productos'
                    loadingMessage={() => 'Cargando...'}
                    onChange={(input) => {
                      if (input === null) {
                        setProductSelected([])
                        return
                      }
                      const productsSelected = input.map(
                        (product: LoadOptionsInterface) => product.value,
                      )
                      setProductSelected(productsSelected)
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className='text-center'>
            <button onClick={createMentor} className='btn btn-primary md-close'>
              Crear
            </button>
          </Card.Footer>
        </Card>
      </AnimatedModal>
    </>
  )
}

export default MentorModal
