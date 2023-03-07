import * as React from 'react';
import { createRef, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
interface Todo {
    note: string;
    complete: boolean;
}
interface ModalToDoProps {
    todoList: Todo[];
}
const ModalToDo = (props: ModalToDoProps) => {
    const formRef = createRef();
    const [newNote, setNewNote] = useState('');
    const [cardTodo, setCardTodo] = useState<Todo[]>([]);
    const [isBasic, setIsBasic] = useState(false);

    useEffect(() => {
        setCardTodo(props.todoList);
    }, [props.todoList]);

    const completeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        const newCard = cardTodo.map((item, index) => {
            return index === key ? { ...item, complete: e.target.checked } : item;
        });
        setCardTodo(newCard);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNote(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent, formData: any, inputs: any) => {
        e.preventDefault();
        setCardTodo([...cardTodo, { note: newNote, complete: false }]);
        setNewNote('');
        resetForm();
    };

    const resetForm = () => {
        if (formRef.current) (formRef.current as any).resetValidationState(true);
    };

    const handleErrorSubmit = (e: any, formData: any, errorInputs: any) => {
        // console.log(errorInputs);
    };

    const deleteHandler = (key: number) => {
        setCardTodo(cardTodo.filter((item, index) => index !== key));
    };

    const todoListHtml = cardTodo.map((item, index) => {
        return (
            <div key={index}>
                <div className="to-do-list mb-3">
                    <div className="d-inline-block">
                        <label
                            className={[
                                item.complete ? 'done-task' : '',
                                'check-task custom-control custom-checkbox d-flex justify-content-center'
                            ].join(' ')}
                        >
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck2"
                                defaultChecked={item.complete}
                                onChange={(e) => completeHandler(e, index)}
                            />
                            <span className="custom-control-label">{item.note}</span>
                        </label>
                    </div>
                    <div className="float-right">
                        <a href="#!" className="delete_todolist" onClick={() => deleteHandler(index)}>
                            <i className="fa fa-trash-alt" />
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="new-task">{todoListHtml}</div>
                    <Button variant="primary" onClick={() => setIsBasic(true)}>
                        ADD NEW TASK
                    </Button>
                    <Modal show={isBasic} onHide={() => setIsBasic(false)}>
                        <ValidationForm ref={formRef} onSubmit={handleSubmit} onErrorSubmit={handleErrorSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title as="h5">Add New Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <TextInput
                                            name="newNoteModal"
                                            id="newNoteModal"
                                            placeholder="Create your task list"
                                            required
                                            value={newNote}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Form.Row>
                            </Modal.Body>
                            <Modal.Footer className="p-3">
                                <Button variant="primary" type="submit" onClick={() => setIsBasic(false)}>
                                    Save
                                </Button>
                                <Button variant="light" onClick={() => setIsBasic(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </ValidationForm>
                    </Modal>
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default ModalToDo;
