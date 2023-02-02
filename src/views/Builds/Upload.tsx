import * as React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { InitAWS, s3 } from '../../utils/aws';
import { DropzoneComponent } from 'react-dropzone-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const BuildUpload = () => {
    const [initialWorld, setInitialWorld] = React.useState('');
    const [endWorld, setEndWorld] = React.useState('');
    const [season, setSeason] = React.useState('');

    const [errorInput, setErrorInput] = React.useState(false);

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

    let dropzone: any;
    let djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: '.zip',
        autoProcessQueue: false,
        uploadMultiple: false
    };
    let componentConfig = {
        iconFiletypes: ['.zip'],
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };

    const eventHandlers = {
        init: (dz: any) => {
            dropzone = dz;
            InitAWS();
        }
    };

    const uploadS3 = () => {
        sweetAlertHandler({ title: 'Aun no puedes hacer esto :c', type: 'error', text: 'Que haces aqui?' });
        if (initialWorld === '' || endWorld === '') {
            sweetAlertHandler({ title: '¡Faltan datos!', type: 'error', text: 'Revisa los datos que ingresaste' });
        } else {
            if (dropzone != null) {
                for (let i = 0; i < dropzone.files.length; i++) {
                    s3.upload(
                        {
                            Body: dropzone.files[i],
                            Key: `builds/development/zips/${initialWorld}_`,
                            Bucket: 'dev-selecu-builds'
                        },
                        (err: Error, data: any) => {
                            if (err) {
                                dropzone.emit('error', dropzone.files[i], err.message);
                                console.log(err.message);
                                console.log(err);
                            } else {
                                dropzone.emit('complete', dropzone.files[i]);
                                console.log(data);
                            }
                        }
                    ).on('httpUploadProgress', (progress) => {
                        let percent = (progress.loaded * 100) / progress.total;
                        dropzone.emit('uploadprogress', dropzone.files[i], percent, progress.loaded);
                    });
                }
            }
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Parametros</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Temporada</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={(event) => {
                                                setSeason(event.target.value);
                                            }}
                                            value={season}
                                        >
                                            <option>T2</option>
                                            <option>T3</option>
                                            <option>T4</option>
                                            <option>T5</option>
                                            <option>T8</option>
                                            <option>T9</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    {/*<Form.Group>
                                        <Form.Label>Temporada</Form.Label>
                                        <Form.Control as="select">
                                            <option>T2</option>
                                            <option>T3</option>
                                            <option>T4</option>
                                            <option>T5</option>
                                            <option>T8</option>
                                            <option>T9</option>
                                        </Form.Control>
                                    </Form.Group>*/}
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Mundo inicial</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ejemplo: 5"
                                            value={initialWorld}
                                            onChange={(event) => {
                                                setInitialWorld(event.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Mundo final</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ejemplo: 8"
                                            value={endWorld}
                                            onChange={(event) => {
                                                setEndWorld(event.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Subir Build</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
                            <Row className="text-center m-t-10">
                                <Col>
                                    <Button onClick={uploadS3}>Subir</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default BuildUpload;
