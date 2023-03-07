import * as React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { api } from '../../utils/api';
import { TopicInterface, CreateTopic } from '../../interfaces/TopicInterface';
import { ShowNotificationError } from '../../utils/notifications';

export const Topic = () => {
    const [topics, setTopics] = useState<TopicInterface[]>([]);
    const [topicInput, setTopicInput] = useState<string>('');

    // Loaders
    const [loadingTopics, setLoadingTopics] = useState(true);

    const GetTopicsHandler = () => {
        setLoadingTopics(true);
        api.get('topics')
            .then((data) => {
                setTopics(data.data);
            })
            .finally(() => setLoadingTopics(false));
    };

    const CreateTopic = () => {
        if (topicInput === '') {
            ShowNotificationError('Faltan datos', 'Debes ingresar un tema');
            return;
        }
        const newTopic: CreateTopic = {
            name: topicInput
        };
        api.post('topics', newTopic)
            .then((res) => {
                console.log(res.data);
                GetTopicsHandler();
                setTopicInput('');
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    ShowNotificationError('Tema duplicado', 'Por favor ingresa un tema nuevo');
                    setTopicInput('');
                } else {
                    ShowNotificationError('Algo paso', 'Algo paso creando un nuevo tema');
                }
            });
    };

    useEffect(() => {
        GetTopicsHandler();
    }, []);

    return (
        <>
            <Row>
                <Col xl={7} md={12}>
                    <Card>
                        <Card.Header>
                            <h5>Crear tema</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Nombre del tema</Form.Label>
                                        <Form.Control
                                            value={topicInput}
                                            required
                                            placeholder="Ingresa el tema"
                                            onChange={(e) => setTopicInput(e.target.value)}
                                        />
                                        <Form.Text className="text-muted">
                                            Recuerda poner el nombre del grado al final con un <strong>_</strong>{' '}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2 mr-5">
                                        <Button className="mb-0" onClick={CreateTopic}>
                                            Guardar tema
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={5} md={12}>
                    <Card>
                        <Card.Header>
                            <h5>Temas</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Table striped hover responsive bordered id="data-table-zero">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingTopics ? (
                                            <div className="d-flex justify-content-center" style={{ position: 'absolute', width: '100%' }}>
                                                <div className="spinner-border" role="status" style={{ position: 'absolute' }}>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {topics.map((topic) => {
                                                    return (
                                                        <tr key={topic.id}>
                                                            <td>{topic.id}</td>
                                                            <td>{topic.name}</td>
                                                            <td>
                                                                <a href="/" className="btn btn-danger btn-sm">
                                                                    Borrar
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </tbody>
                                </Table>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default Topic;
