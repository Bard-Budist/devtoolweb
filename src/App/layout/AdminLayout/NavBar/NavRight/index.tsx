import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import DEMO from '../../../../../store/constant';
import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
interface NavRightProps {
    rtlLayout: boolean;
}

// Signout
const signOut = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = '/';
};

const NavRight = (props: NavRightProps) => {
    return (
        <>
            <ul className="navbar-nav ml-auto">
                <li>
                    <Dropdown drop={!props.rtlLayout ? 'left' : 'right'} className="dropdown" alignRight={!props.rtlLayout}>
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="feather icon-bell icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="notification">
                            <div className="noti-head bg-dark">
                                <h6 className="d-inline-block m-b-0">Notifications</h6>
                                <div className="float-right">
                                    <a href={DEMO.BLANK_LINK} className="m-r-10">
                                        Marcar como leido
                                    </a>
                                    <a href={DEMO.BLANK_LINK} onClick={signOut}>
                                        Cerrar sesion
                                    </a>
                                </div>
                            </div>
                            <div style={{ height: '300px' }}>
                                <PerfectScrollbar>
                                    <ul className="noti-body">
                                        <li className="n-title">
                                            <p className="m-b-0">Nuevos</p>
                                        </li>
                                        <li className="notification">
                                            <div className="media">
                                                <img className="img-radius" src={Avatar1} alt="Generic placeholder" />
                                                <div className="media-body">
                                                    <p>Primer deploy</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </PerfectScrollbar>
                            </div>
                            <div className="noti-footer">
                                <a href={DEMO.BLANK_LINK}>Mostrar todo</a>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown drop={!props.rtlLayout ? 'left' : 'right'} className="dropdown" alignRight={!props.rtlLayout}>
                        {/*<Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="icon feather icon-user" />
                        </Dropdown.Toggle>*/}
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head bg-dark">
                                <img src={Avatar1} className="img-radius" alt="User Profile" />
                                <span>John Doe</span>
                                <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                    <i className="feather icon-log-out" />
                                </a>
                            </div>
                            <ul className="pro-body">
                                <li>
                                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                                        <i className="feather icon-settings" /> Settings
                                    </a>
                                </li>
                                <li>
                                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                                        <i className="feather icon-user" /> Profile
                                    </a>
                                </li>
                                <li>
                                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                                        <i className="feather icon-mail" /> My Messages
                                    </a>
                                </li>
                                <li>
                                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                                        <i className="feather icon-lock" /> Lock Screen
                                    </a>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </>
    );
};
export default NavRight;
