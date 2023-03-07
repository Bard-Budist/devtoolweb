import * as React from 'react';
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
export interface RouteObject {
    path: string;
    exact?: boolean;
    name?: string;
    component: any;
}

const Login = React.lazy(() => import('./views/Login/Login'));

const route: RouteObject[] = [{ path: '/', exact: true, name: 'Default', component: Login }];

export default route;
