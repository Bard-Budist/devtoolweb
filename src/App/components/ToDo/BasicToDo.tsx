import * as React from 'react';
import { createRef, useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ValidationForm, TextInputGroup } from 'react-bootstrap4-form-validation';
import { Link } from 'react-router-dom';
interface Todo {
    note: string;
    complete: boolean;
}
interface BasicToDoProps {
    todoList: Todo[];
}
const BasicToDo = (props: BasicToDoProps) => {
    const formRef = createRef();
    const [newNote, setNewNote] = useState('');
    const [cardTodo, setCardTodo] = useState<Todo[]>([]);

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

    const todoListHTML = cardTodo.map((item, index) => {
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
                        <Link to="#" className="delete_todolist" onClick={() => deleteHandler(index)}>
                            <i className="fa fa-trash-alt" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <ValidationForm ref={formRef} onSubmit={handleSubmit} onErrorSubmit={handleErrorSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <TextInputGroup
                                    name="newNote"
                                    id="newNote"
                                    placeholder="Create your task list"
                                    required
                                    append={
                                        <Button type="submit" variant="secondary">
                                            <i className="fa fa-plus" />
                                        </Button>
                                    }
                                    value={newNote}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Form.Row>
                    </ValidationForm>
                    <div className="new-task">{todoListHTML}</div>
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default BasicToDo;
