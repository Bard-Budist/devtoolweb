import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { ToastProvider, ToastConsumer, ToastProps } from 'react-toast-notifications';
import { AttentionSeeker, Bounce, Fade, Flip, Hinge, JackInTheBox, Rotate, Slide, Zoom } from 'react-awesome-reveal';

interface NotificationsProps {
    notification?: any;
    children: React.ReactNode;
}

function getAnimation(type: string) {
    switch (type) {
        case 'AttentionSeeker':
            return AttentionSeeker;
        case 'Bounce':
            return Bounce;
        case 'Fade':
            return Fade;
        case 'Flip':
            return Flip;
        case 'Hinge':
            return Hinge;
        case 'JackInTheBox':
            return JackInTheBox;
        case 'Rotate':
            return Rotate;
        case 'Slide':
            return Slide;
        case 'Zoom':
            return Zoom;
        default:
            return Slide;
    }
}

interface NotificationsProps {
    notification?: any;
    children: React.ReactNode;
}
const Notifications = (props: NotificationsProps) => {
    const AlertMessage = ({ appearance, children, transitionDuration, transitionState, onDismiss }: ToastProps) => {
        const Ani = getAnimation(props.notification.animation.type);
        const direction = props.notification.animation.direction;
        return (
            <Ani direction={direction} triggerOnce>
                <Alert variant={appearance} dismissible onClose={onDismiss}>
                    {children}
                </Alert>
            </Ani>
        );
    };
    return (
        <ToastProvider components={{ Toast: AlertMessage }} placement={props.notification.placement}>
            <ToastConsumer>
                {({ add }) => {
                    return (
                        <span
                            onClick={() =>
                                add(props.notification.message, {
                                    appearance: props.notification.variant,
                                    autoDismiss: props.notification.autoDismiss
                                })
                            }
                        >
                            {props.children}
                        </span>
                    );
                }}
            </ToastConsumer>
        </ToastProvider>
    );
};

export default Notifications;
