import * as React from 'react';
import { Row, Col, Card, Button, Form, CardDeck } from 'react-bootstrap';
import { apiAuth } from '../../utils/api';
import { GetUser } from '../../utils/user';
import { ProductInterface } from './Interfaces/updateCheckpointInterfaces';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { localDataDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';

export const JsonCreateData = () => {
    const [products, setProducts] = React.useState<ProductInterface[]>([]);
    const [currentProduct, setCurrentProduct] = React.useState<string>('');

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
        const user = GetUser();
        if (user) {
            apiAuth.get('/user/products/' + GetUser()?.id).then((response) => {
                setProducts(response.data);
            });
        }
    }, []);

    // function to create json in path file
    const createJson = () => {
        const user = GetUser();
        if (currentProduct === '') {
            sweetAlertHandler({ title: '¡Algo salio mal!', type: 'error', text: 'Debes seleccionar un producto' });
            return;
        }
        const payloadBody = {
            id: user?.id,
            product: currentProduct,
            token: user?.token,
            username: user?.username
        };
        // Create file
        localDataDir().then((pathLocal: string) => {
            const pathLocalSplited = pathLocal.split('\\');
            join(pathLocalSplited[0], pathLocalSplited[1], pathLocalSplited[2], pathLocalSplited[3], 'LocalLow', 'Selecu', 'data.json')
                .then((pathJoined: string) => {
                    invoke('save_json_file', { path: pathJoined, content: JSON.stringify(payloadBody) })
                        .then(() => {
                            sweetAlertHandler({
                                title: 'Archivo creado',
                                type: 'success',
                                text: 'Se ha creado el archivo satisfactoriamente'
                            });
                        })
                        .catch((err) => {
                            sweetAlertHandler({ title: '¡Algo salio mal!', type: 'error', text: 'No se ha podido crear el archivo' });
                        });
                })
                .catch((err) => {
                    sweetAlertHandler({ title: '¡Algo salio mal!', type: 'error', text: 'No se ha podido crear el archivo' });
                });
        });
    };
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
                                        {products.map((product, index) => {
                                            return <option key={index}>{product.name}</option>;
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
                                        <Button onClick={createJson}>Crear</Button>
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
