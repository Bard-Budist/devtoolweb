import * as React from 'react';
import { Col, Row, Card, Form, Button, Table } from 'react-bootstrap';
import { DropzoneComponent } from 'react-dropzone-component';
import './Load.scss';
import Select from 'react-select';

const Load = () => {
    let djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: 'image/jpeg,image/png,image/gif'
    };
    let componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: '/'
    };

    return (
        <>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <h5>Configuración base</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={4} lg={4} md={4}>
                                    {' '}
                                    <Form.Group>
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Control as="select">
                                            <option>Student</option>
                                            <option>Development</option>
                                            <option>Mentor</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={8} lg={4} md={6}>
                                    {' '}
                                    <Form.Group>
                                        <Form.Label>Institución</Form.Label>
                                        <Select
                                            defaultValue={[]}
                                            isMulti
                                            name="Institución"
                                            options={[]}
                                            className="select-load"
                                            classNamePrefix="select"
                                            isSearchable
                                            placeholder="Seleccione una institución"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} lg={2} md={2}>
                                    {' '}
                                    <Form.Group>
                                        <Form.Label>Sede</Form.Label>
                                        <Select
                                            defaultValue={[]}
                                            isMulti
                                            name="Institución"
                                            options={[]}
                                            className="select-load"
                                            classNamePrefix="select"
                                            isSearchable
                                            placeholder="Seleccione una sede"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} lg={2} md={12} className="text-center" style={{ alignSelf: 'center' }}>
                                    <Button variant="primary">Instituciones</Button>
                                    <Button variant="primary">Sedes</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4} lg={2} md={4}>
                                    {' '}
                                    <Form.Group>
                                        <Form.Label>Tipo usuario</Form.Label>
                                        <Form.Control as="select">
                                            <option>Pago</option>
                                            <option>Free</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={4} lg={8} md={4}>
                                    {' '}
                                    <Form.Group>
                                        <Form.Label>Mentor</Form.Label>
                                        <Form.Control as="select"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={4} lg={2} md={4} className="text-center" style={{ alignSelf: 'center' }}>
                                    <Button variant="primary">Crear mentor</Button>
                                    <Button variant="primary">Ver</Button>
                                </Col>
                                <Col sm={12}>
                                    <Form.Group>
                                        <Form.Label>Grupo</Form.Label>
                                        <Form.Control as="select"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} className="text-center" style={{ alignSelf: 'center' }}>
                                    <DropzoneComponent config={componentConfig} djsConfig={djsConfig} />
                                </Col>
                                <Col sm={12} className="text-center" style={{ alignSelf: 'center' }}>
                                    <Button variant="primary">Cargar</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Configuración de carga</small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <h5>Usuarios cargados</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table variant="dark" responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Load;
