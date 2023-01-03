import * as React from 'react';
import { Alert } from 'react-bootstrap';
interface NotificationProps {
    message: string;
    link: string;
}
const Notification = (props: NotificationProps) => {
    return (
        <React.Fragment>
            <Alert variant="warning">
                {props.message}
                <Alert.Link href={props.link} target="_blank" className="float-right">
                    Demo & Documentation
                </Alert.Link>
            </Alert>
        </React.Fragment>
    );
};

export default Notification;
