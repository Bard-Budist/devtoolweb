import * as React from 'react'
import AnimatedModal from '../../../App/components/AnimatedModal'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { apiAuth } from '../../../utils/api'
import { LoadOptionsInterface } from '../../../interfaces/LoadInterface'
import Select from 'react-select'

interface SiteModalProps {
  showModal: boolean
  closeModal: () => void
  resetSites: () => void
  institutions: LoadOptionsInterface[]
  currentInstitution: number
}

const SitesModal = (props: SiteModalProps) => {
  const [name, setName] = React.useState<string>('')
  const [institutionId, setInstitutionId] = React.useState<number>(0)

  const crearteInstitution = () => {
    apiAuth.post('/institution', { name: name, organization: institutionId }).then(() => {
      props.closeModal()
      if (props.currentInstitution === institutionId && institutionId !== 0) {
        props.resetSites()
      }
      setName('')
    })
  }

  return (
    <>
      <AnimatedModal
        animation={'zoom'}
        visible={props.showModal}
        onClose={() => props.closeModal()}
        height={340}
        width={600}
      >
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Crear sedes</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={12}>
                <Select
                  name='Institución'
                  className='select-load'
                  classNamePrefix='select'
                  isSearchable
                  placeholder='Seleccione una institución'
                  loadingMessage={() => 'Cargando...'}
                  options={props.institutions}
                  onChange={(input) => {
                    if (input) setInstitutionId(input.value)
                  }}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre sede</Form.Label>
                  <Form.Control
                    as='input'
                    value={name}
                    onChange={(input) => {
                      setName(input.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className='text-center'>
            <button onClick={crearteInstitution} className='btn btn-primary md-close'>
              Crear
            </button>
          </Card.Footer>
        </Card>
      </AnimatedModal>
    </>
  )
}

export default SitesModal
