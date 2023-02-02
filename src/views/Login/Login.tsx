import * as React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/style.scss';
import { api } from '../../utils/api';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import authLogo from '../../assets/images/auth/auth-logo.png';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyConfirm';
import 'pnotify/dist/es/PNotifyCallbacks';

declare global {
    interface Window {
        stackTopLeft: any;
        stackBottomLeft: any;
        stackBottomRight: any;
        stackCustomLeft: any;
        stackCustomBottom: any;
        stackBarTop: any;
        stackBarBottom: any;
    }
}

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // login
    const login = async () => {
        api.post('/auth', {
            username,
            password
        }).then(
            (res) => {
                // save in local storage
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location.href = '/home';
            },
            (err) => {
                window.stackBottomLeft = {
                    dir1: 'right',
                    dir2: 'up',
                    firstpos1: 25,
                    firstpos2: 25,
                    push: 'top'
                };
                PNotify.error({
                    title: 'Usuario y/o contraseña incorrecta',
                    text: 'Por favor, verifique sus credenciales',
                    stack: window.stackBottomLeft
                });
            }
        );
    };

    return (
        <>
            <Breadcrumb />

            <div className="auth-wrapper align-items-stretch aut-bg-img">
                <div className="flex-grow-1">
                    <div className="auth-side-form">
                        <div className=" auth-content">
                            <img src={authLogo} alt="" className="img-fluid mb-4 d-block d-xl-none d-lg-none" />
                            <h3 className="mb-4 f-w-400">Inicia sesion</h3>
                            <div className="form-group fill">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group fill mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-block btn-primary mb-0" onClick={login}>
                                Iniciar sesion
                            </button>
                            <div className="text-center">
                                <div className="saprator my-4">
                                    <span>O</span>
                                </div>
                                <p className="mb-0 text-muted">
                                    No tienes cuenta?{' '}
                                    <NavLink to="/signup" className="f-w-400">
                                        Registrate
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
