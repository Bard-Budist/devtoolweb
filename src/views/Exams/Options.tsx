import * as React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import Select from 'react-select';
import AnimatedModal from '../../App/components/AnimatedModal';
import { TopicSelectInterface, TopicInterface } from '../../interfaces/TopicInterface';
import { api } from '../../utils/api';
import { QuestionInterface } from '../../interfaces/QuestionInterface';
import './styles.css';

// @ts-ignore
$.DataTable = require('datatables.net-bs');
require('jszip');
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
require('datatables.net-autofill');
require('datatables.net-buttons-bs');
require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-colreorder');
require('datatables.net-keytable');
require('datatables.net-responsive-bs');
require('datatables.net-rowgroup');
require('datatables.net-rowreorder');
require('datatables.net-scroller');
require('datatables.net-select');
require('datatables.net-fixedcolumns');
require('datatables.net-fixedheader');

function atable() {
    const tableButton = '#datatable-button';
    // @ts-ignore
    const table = $(tableButton).DataTable({
        language: {
            lengthMenu: 'Mostrando _MENU_ opciones',
            paginate: {
                first: 'Primera pagina',
                next: 'Siguiente',
                previous: 'Atras'
            },
            search: 'Buscar'
        },
        order: [[0, 'asc']],
        columnDefs: [
            {
                targets: 3,
                data: null,
                defaultContent: '<button>Click!</button>'
            }
        ],
        columns: [
            {
                data: 'id',
                render: function (data: any, type: any, row: any) {
                    return data;
                }
            },
            {
                data: 'question',
                render: function (data: any, type: any, row: any) {
                    return data;
                }
            },
            {
                data: 'options',
                render: function (data: any, type: any, row: any) {
                    return `<a href="#" class="btn btn-info btn-sm option-btn">
              Ver opciones
            </a>`;
                }
            },
            {
                data: 'contexts',
                render: function (data: any, type: any, row: any) {
                    return `<a href="#" class="btn btn-info btn-sm context-btn" >
              Ver contexto
            </a>`;
                }
            }
        ],
        responsive: {
            responsive: {
                details: {
                    // @ts-ignore
                    display: $.fn.dataTable.Responsive.display.childRowImmediate,
                    type: ''
                }
            }
        }
        // buttons: tableBtns
    });

    // @ts-ignore
}

function setDataTable(questions: any) {
    // @ts-ignore
    const tableButton = $('#datatable-button').DataTable();
    tableButton.clear();
    tableButton.rows.add(questions).draw();
    // @ts-ignore
}

const Options = () => {
    const [topic, setTopics] = useState<TopicSelectInterface[]>();
    const [questions, setQuestions] = useState<QuestionInterface>();
    const [showModal, setShowModal] = useState(false);
    const [animation, setAnimation] = useState('flip');
    const animationVariant = ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'];
    const [selectedTopic, setSelectedTopic] = useState<TopicSelectInterface | null>({
        id: 0,
        label: '',
        name: ''
    });
    const [alreadyInitTable, setAlreadyInitTable] = useState(false);

    // Loading
    const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);

    const GetTopicsHandler = () => {
        setLoadingTopics(true);
        api.get('topics')
            .then((data) => {
                const topicsFormat = data.data.map((currentTopic: TopicInterface) => {
                    return { ...currentTopic, label: currentTopic.name };
                });
                setTopics(topicsFormat);
            })
            .finally(() => setLoadingTopics(false));
    };

    const GetQuestionsByTopics = (selectedOption: TopicSelectInterface | null) => {
        if (selectedOption) {
            setLoadingQuestions(true);
            api.patch('questions/topic', { name: selectedOption.name }).then((data) => {
                setQuestions(data.data);
                setDataTable(data.data.questions);
            });
        }
    };

    const handleChangeTopic = (selectedOption: TopicSelectInterface | null) => {
        setSelectedTopic(selectedOption);
        GetQuestionsByTopics(selectedOption);
    };

    useEffect(() => {
        GetTopicsHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!alreadyInitTable && selectedTopic?.id != 0) {
            atable();
            setAlreadyInitTable(true);
            // @ts-ignore
            $('#datatable-button tbody').on('click', '.option-btn', function () {
                // @ts-ignore
                const data = tableButton.row($(this).parents('tr')).data();
                console.log(data);
                alert(data[0] + '\'s salary is: ' + data[3]);
            });

            // @ts-ignore
            $('#datatable-button tbody').on('click', '.context-btn', function () {
                // @ts-ignore
                const data = tableButton.row($(this).parents('tr')).data();
                console.log(data);
                alert(data[0] + '\'s salary is: ' + data[3]);
            });
        }
    }, [selectedTopic]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Ver preguntas</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {loadingTopics ? (
                                <div className="d-flex justify-content-center" style={{ position: 'absolute', width: '100%' }}>
                                    <div className="spinner-border" role="status" style={{ position: 'absolute' }}>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="color"
                                    isSearchable
                                    options={topic}
                                    onChange={(value) => handleChangeTopic(value)}
                                    value={selectedTopic}
                                    placeholder="Seleccione un tema"
                                />
                            )}

                            {selectedTopic?.id !== 0 ? (
                                <Table striped hover responsive bordered className="table table-condensed" id="datatable-button">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Pregunta</th>
                                            <th>Opciones</th>
                                            <th>Contextos</th>
                                        </tr>
                                        {/* <tbody>
                  {loadingQuestions && (
                    <div className="d-flex justify-content-center" style={{position: "absolute", width: "100%"}}>
                      <div className="spinner-border" role="status" style={{position: "absolute"}}>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div> )}
                  </tbody>*/}
                                    </thead>
                                </Table>
                            ) : (
                                <p>Selecciona un tema</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Crear pregunta</Card.Title>
                        </Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
            </Row>
            <AnimatedModal animation={animation} visible={showModal} onClose={() => setShowModal(false)} height={440}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Modal Dialog 1</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <p>This is a modal window. You can do the following things with it:</p>
                        <ul>
                            <li>
                                <strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what
                                they say.
                            </li>
                            <li>
                                <strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its
                                presence.
                            </li>
                            <li>
                                <strong>Close:</strong> click on the button below to close the modal.
                            </li>
                        </ul>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <button onClick={() => setShowModal(false)} className="btn btn-primary md-close">
                            Close Me!!
                        </button>
                    </Card.Footer>
                </Card>
            </AnimatedModal>
        </>
    );
};
export default Options;
