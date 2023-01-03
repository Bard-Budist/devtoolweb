import * as React from 'react';
import { RouteObject } from './route'

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));

// Builds
const UploadBuildPage = React.lazy(() => import('./views/Builds/Upload'));
const DownloadCatalogPage = React.lazy(() => import('./views/Catalogo/Catalogo'));
// Exams
const TopicsPage = React.lazy(() => import('./views/Topics/Topic'));
const OptionsPage = React.lazy(() => import('./views/Exams/Options'));
// Assets bundles
const UploadBundlePage = React.lazy(() => import('./views/Bundles/Upload'));

const routes: RouteObject[] = [
    { path: '/', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/build/upload-dev', exact: true, name: 'Subir builds', component: UploadBuildPage },
    { path: '/bundles/interactions', exact: true, name: 'Subir bundles interacciones', component: UploadBundlePage },
    { path: '/catalog/download', exact: true, name: 'Descargar Catalogo', component: DownloadCatalogPage },
    { path: '/exams/topics', exact: true, name: 'Temas', component: TopicsPage },
    { path: '/exams/options', exact: true, name: 'Opciones', component: OptionsPage }
];
export default routes;
