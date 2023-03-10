import * as React from 'react'
import { Row, Col, Card, Button, Form, CardDeck } from 'react-bootstrap'
import { apiAuth } from '../../utils/api'
import { User } from '../../utils/user'
import { ProductInterface } from './Interfaces/updateCheckpointInterfaces'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const UpdateCheckpoint = () => {
  const [products, setProducts] = React.useState<ProductInterface[]>([])
  const [checkpoint, setCheckpoint] = React.useState('')
  const [currentProduct, setCurrentProduct] = React.useState<string>('')
  const [currentEnvironment, setCurrentEnvironment] = React.useState<string>('')

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

  React.useEffect(() => {
    apiAuth.get('/user/products/' + User.id).then((response) => {
      setProducts(response.data)
    })
  }, [])

  // function to update the checkpoint data
  const updateCheckpoint = () => {
    if (currentProduct === '') {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'Debes seleccionar un producto',
      })
      return
    }
    if (checkpoint === '') {
      sweetAlertHandler({
        title: '¡Algo salio mal!',
        type: 'error',
        text: 'Debes ingresar un checkpoint',
      })
      return
    }
    const payloadCheckpoint = {
      current: parseCheckpoint(checkpoint),
      currentGameCheckpoint: parseCheckpoint(checkpoint),
    }

    const payloadBody = {
      userId: User.id,
      product: currentProduct,
      data: JSON.stringify(payloadCheckpoint),
    }
    apiAuth
      .put('/checkpoint-data/update', payloadBody)
      .then((response) => {
        sweetAlertHandler({
          title: 'Hecho!',
          type: 'success',
          text: 'Se ha actualizado el checkpoint',
        })
      })
      .catch((error) => {
        sweetAlertHandler({ title: '¡Algo salio mal!', type: 'error', text: error.message })
      })
  }

  // parse checkpoint to list of integers
  const parseCheckpoint = (checkpoint: string) => {
    const checkpointArray = checkpoint.split('.')
    const checkpointIntegers = checkpointArray.map((checkpoint) => {
      return parseInt(checkpoint)
    })

    return checkpointIntegers
  }

  return (
    <>
      <Row>
        <Col sm={12}>
          <br />
          <h5 className='mt-4'>Configuración</h5>
          <CardDeck>
            <Card>
              <Card.Header>
                <h5>Entorno</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Temporada</Form.Label>
                  <Form.Control
                    as='select'
                    value={currentEnvironment}
                    onChange={(event) => {
                      setCurrentEnvironment(event.target.value)
                    }}
                  >
                    <option>Producción</option>
                    <option>Desarrollo</option>
                  </Form.Control>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>Aquí debes poner a que entorno esta dirigido</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header>
                <h5>Producto</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Temporada</Form.Label>
                  <Form.Control
                    as='select'
                    value={currentProduct}
                    onChange={(event) => {
                      setCurrentProduct(event.target.value)
                    }}
                  >
                    <option>Seleccione el producto</option>
                    {products.map((product, i) => {
                      return <option key={i}>{product.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>Tu producto al que actualizaras</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Col>
        <Col sm={12}>
          <h5 className='mt-4'>Checkpoint</h5>
          <hr />
          <CardDeck>
            <Card>
              <Card.Header>
                <h5>Checkpoint</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Interacción</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ejemplo: 3.1.1.1'
                    value={checkpoint}
                    onChange={(event) => {
                      setCheckpoint(event.target.value)
                    }}
                  />
                </Form.Group>
              </Card.Body>

              <Row className='text-center m-t-10'>
                <Col>
                  <Button onClick={updateCheckpoint}>Subir</Button>
                </Col>
              </Row>
              <Card.Footer>
                <small className='text-muted'>El primer numero corresponde a la temporada</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Col>
      </Row>
    </>
  )
}
export default UpdateCheckpoint
