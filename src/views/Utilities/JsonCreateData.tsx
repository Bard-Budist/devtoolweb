import * as React from 'react';
import { Row, Col, Card, Button, Table, Form, CardDeck } from 'react-bootstrap';
import { apiAuth, apiAuthDev } from '../../utils/api';
import { User } from '../../utils/user';
import { ProductInterface } from './Interfaces/updateCheckpointInterfaces';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export const JsonCreateData = () => {
    const [products, setProducts] = React.useState<ProductInterface[]>([]);
    const [checkpoint, setCheckpoint] = React.useState('');
    const [currentProduct, setCurrentProduct] = React.useState<string>('');
    const [currentEnvironment, setCurrentEnvironment] = React.useState<string>('');

    const sweetAlertHandler = (alert: {
        title: string;
        text: string;
        type: undefined | 'warning' | 'error' | 'success' | 'info' | 'question';
    }) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            icon: alert.type
        });
    };

    React.useEffect(() => {
        apiAuth.get('/user/products/' + User.id).then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <>
            <Row>
                <Col sm={12}>
                    <br />
                    <h5 className="mt-4">Configuración</h5>
                    <CardDeck>
                        <Card>
                            <Card.Header>
                                <h5>Producto</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Temporada</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={currentProduct}
                                        onChange={(event) => {
                                            setCurrentProduct(event.target.value);
                                        }}
                                    >
                                        <option>Seleccione el producto</option>
                                        {products.map((product) => {
                                            return <option>{product.name}</option>;
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Producto asociado del archivo</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Header>
                                <h5>Acciones</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="text-center m-t-10">
                                    <Col>
                                        <Button>Crear</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Col>
                <Col sm={12}>
                    <hr />
                </Col>
            </Row>
        </>
    );
};
export default JsonCreateData;
