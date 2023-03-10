import * as React from 'react'
import AnimatedModal from '../../../App/components/AnimatedModal'
import { Card, Form } from 'react-bootstrap'
import { apiAuth } from '../../../utils/api'

interface InstitutionModalProps {
  showModal: boolean
  closeModal: () => void
  resetInstitutions: () => void
}

const InstitutionModal = (props: InstitutionModalProps) => {
  const [name, setName] = React.useState<string>('')

  const crearteInstitution = () => {
    apiAuth.post('/organization', { name: name }).then((response) => {
      props.closeModal()
      props.resetInstitutions()
      setName('')
    })
  }

  return (
    <>
      <AnimatedModal
        animation={'zoom'}
        visible={props.showModal}
        onClose={() => props.closeModal()}
        height={290}
        width={600}
      >
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Crear institución</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Nombre Institución</Form.Label>
              <Form.Control
                as='input'
                value={name}
                onChange={(input) => {
                  setName(input.target.value)
                }}
              ></Form.Control>
            </Form.Group>
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

export default InstitutionModal
