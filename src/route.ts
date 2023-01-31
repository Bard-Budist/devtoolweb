import * as React from 'react';
export interface RouteObject {
    path: string;
    exact?: boolean;
    name?: string;
    component: any;
}

const Login = React.lazy(() => import('./views/Login/Login'));

const route: RouteObject[] = [
    { path: '/login', exact: true, name: 'login', component: Login },
];

export default route;
