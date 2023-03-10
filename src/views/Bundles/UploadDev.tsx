import * as React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { s3 } from '../../utils/aws';
import { forage } from '@tauri-apps/tauri-forage';
import { DropzoneComponent } from 'react-dropzone-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { writeText } from '@tauri-apps/api/clipboard';
import { useEffect } from 'react';

let dropzone: any;
export const AssetsUploadDev = () => {
    const [interaction, setInteraction] = React.useState('');
    const [season, setSeason] = React.useState('');
    const [history, setHistory] = React.useState('');

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

    const djsConfig = {
        addRemoveLinks: true,
        autoProcessQueue: false,
        uploadMultiple: false
    };
    const componentConfig = {
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };
    const saveHistory = (lastSave: string) => {
        let previousHistory = localStorage.getItem('history-dev');
        if (previousHistory) {
            previousHistory += lastSave + '\n';
            localStorage.setItem('history-dev', previousHistory);
            setHistory(previousHistory);
        } else {
            localStorage.setItem('history-dev', lastSave + '\n');
            setHistory(lastSave + '\n');
        }
    };

    const eventHandlers = {
        init: (dz: any) => {
            dropzone = dz;
        },
        complete: (file: any) => {
            console.log(file);
        },
        error: () => {
            sweetAlertHandler({ title: '¡Algo salio mal!', type: 'error', text: 'Ocurrio algo mal subiendo el bundle' });
        }
    };

    const uploadS3 = () => {
        if (interaction === '' || season === 'Selecione la temporada') {
            sweetAlertHandler({ title: '¡Faltan datos!', type: 'error', text: 'Revisa los datos que ingresaste' });
        } else {
            if (dropzone != null) {
                for (let i = 0; i < dropzone.files.length; i++) {
                    console.log('Uploading ' + dropzone.files[i].name);
                    s3.upload(
                        {
                            Body: dropzone.files[i],
                            Key: `assetsbundles/dev/${season}/interacions/${interaction}/${dropzone.files[i].name}`,
                            Bucket: 'dev-update-manager'
                        },
                        (err: Error, data: any) => {
                            if (err) {
                                dropzone.emit('error', dropzone.files[i], err.message);
                            } else {
                                dropzone.emit('complete', dropzone.files[i]);
                                writeText(
                                    `https://dev-update-manager.s3.amazonaws.com/assetsbundles/dev/${season}/interacions/${interaction}/${dropzone.files[i].name}`
                                ).then(() => {
                                    saveHistory(
                                        `https://dev-update-manager.s3.amazonaws.com/assetsbundles/dev/${season}/interacions/${interaction}/${dropzone.files[i].name}`
                                    );
                                    sweetAlertHandler({
                                        title: 'Nice!',
                                        type: 'success',
                                        text: 'Subido!, se ha copiado la url en el portapeles'
                                    });
                                });
                            }
                        }
                    ).on('httpUploadProgress', (progress) => {
                        const percent = (progress.loaded * 100) / progress.total;
                        dropzone.emit('uploadprogress', dropzone.files[i], percent, progress.loaded);
                    });
                }
            }
        }
    };

    const cleanHistory = () => {
        localStorage.removeItem('history-dev');
        setHistory('');
    };

    useEffect(() => {
        const data = localStorage.getItem('history-dev');
        if (data) {
            setHistory(data);
        }
    }, []);

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
                                        <Form.Label>Ruta</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={(event) => {
                                                setSeason(event.target.value);
                                            }}
                                            value={season}
                                        >
                                            <option>Seleccione ruta primaria</option>
                                            <option>T2</option>
                                            <option>T3</option>
                                            <option>T4</option>
                                            <option>T5</option>
                                            <option>T6</option>
                                            <option>T7</option>
                                            <option>T8</option>
                                            <option>T9</option>
                                            <option>Manager</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Interaccion</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ejemplo: 3.1.1 y/o bundle_a"
                                            value={interaction}
                                            onChange={(event) => {
                                                setInteraction(event.target.value);
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
                            <Card.Title as="h5">Subir bundle</Card.Title>
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
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Historial</Card.Title>
                            <button type="button" className="btn btn-primary btn-sm rounded m-0 float-right" onClick={cleanHistory}>
                                <i className="feather icon-refresh-cw" />
                            </button>
                        </Card.Header>
                        <Card.Body>
                            <Form.Control as="textarea" disabled={true} value={history} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default AssetsUploadDev;
