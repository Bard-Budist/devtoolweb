import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card } from 'react-bootstrap';

import NavGroup from './NavGroup';
import DEMO from '../../../../../store/constant';
import * as actionTypes from '../../../../../store/actions';
import { useSelector } from '../../../../../store/reducer';
import { MenuItemType } from '../../../../../menu-items';
import { UserData } from '../../../../../interfaces/UserInterfaces';
interface NavContentProps {
    navigation: MenuItemType[];
    user?: UserData;
}
const NavContent = (props: NavContentProps) => {
    const dispatch = useDispatch();
    const layout = useSelector((state) => state.able.layout);
    const rtlLayout = useSelector((state) => state.able.rtlLayout);
    const onNavContentLeave = () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE });
    const [data, setData] = useState({
        scrollWidth: 0,
        prevDisable: true,
        nextDisable: false
    });

    const scrollPrevHandler = () => {
        const sidenavWrapper = document.getElementById('sidenav-wrapper');
        if (sidenavWrapper) {
            const wrapperWidth = sidenavWrapper.clientWidth;
            const scrollWidth = data.scrollWidth - wrapperWidth;
            if (scrollWidth < 0) {
                setData({ ...data, scrollWidth: 0, prevDisable: true, nextDisable: false });
            } else {
                setData({ ...data, scrollWidth: scrollWidth, prevDisable: false });
            }
        }
    };
    const scrollNextHandler = () => {
        const sidenavWrapper = document.getElementById('sidenav-wrapper');
        const sidenavHorizontal = document.getElementById('sidenav-horizontal');
        if (sidenavWrapper && sidenavHorizontal) {
            const wrapperWidth = sidenavWrapper.clientWidth;
            const contentWidth = sidenavHorizontal.clientWidth;
            let scrollWidth = data.scrollWidth + (wrapperWidth - 80);
            if (scrollWidth > contentWidth - wrapperWidth) {
                scrollWidth = contentWidth - wrapperWidth + 80;
                setData({ ...data, scrollWidth: scrollWidth, prevDisable: false, nextDisable: true });
            } else {
                setData({ ...data, scrollWidth: scrollWidth, prevDisable: false });
            }
        }
    };
    const navItems = props.navigation.map((item) => {
        console.log(props.user && item.roles?.includes(props.user.roles));
        if (item.type === 'group' && props.user && item.roles?.includes(props.user.roles)) {
            console.log(item);
            return <NavGroup key={item.id} group={item} />;
        } else {
            return false;
        }
    });
    let scrollStyle: { marginLeft?: string; marginRight?: string } = {
        marginLeft: '-' + data.scrollWidth + 'px'
    };
    if (layout === 'horizontal' && rtlLayout) {
        scrollStyle = {
            marginRight: '-' + data.scrollWidth + 'px'
        };
    }
    let mainContent: React.ReactNode;
    if (layout === 'horizontal') {
        let prevClass = ['sidenav-horizontal-prev'];
        if (data.prevDisable) {
            prevClass = [...prevClass, 'disabled'];
        }
        let nextClass = ['sidenav-horizontal-next'];
        if (data.nextDisable) {
            nextClass = [...nextClass, 'disabled'];
        }
        mainContent = (
            <div className="navbar-content sidenav-horizontal" id="layout-sidenav">
                <a href={DEMO.BLANK_LINK} className={prevClass.join(' ')} onClick={scrollPrevHandler}>
                    <span />
                </a>
                <div id="sidenav-wrapper" className="sidenav-horizontal-wrapper">
                    <ul
                        id="sidenav-horizontal"
                        className="nav pcoded-inner-navbar sidenav-inner"
                        onMouseLeave={onNavContentLeave}
                        style={scrollStyle}
                    >
                        {navItems}
                    </ul>
                </div>
                <a href={DEMO.BLANK_LINK} className={nextClass.join(' ')} onClick={scrollNextHandler}>
                    <span />
                </a>
            </div>
        );
    } else {
        mainContent = (
            <div className="navbar-content next-scroll">
                <PerfectScrollbar options={{ wheelSpeed: 2, swipeEasing: true }}>
                    <ul className="nav pcoded-inner-navbar" id="nav-ps-next">
                        {navItems}
                        {/* <li>
                            <Card className="text-center">
                                <Card.Body>
                                    <i className="feather icon-sunset f-40" />
                                    <h6 className="mt-3">Help?</h6>
                                    <p>Please contact us on our email for need any support</p>
                                    <a href={DEMO.BLANK_LINK} rel="noopener noreferrer" className="btn btn-primary btn-sm text-white m-0">
                                        Support
                                    </a>
                                </Card.Body>
                            </Card>
                        </li>*/}
                    </ul>
                </PerfectScrollbar>
            </div>
        );
    }
    return <>{mainContent}</>;
};

export default NavContent;
