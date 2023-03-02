import * as React from 'react';
import { RouteObject } from './route';

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));

// Builds
const UploadBuildPage = React.lazy(() => import('./views/Builds/Upload'));
const DownloadCatalogPage = React.lazy(() => import('./views/Catalogo/Catalogo'));
// Utilities
const UpdateCheckpoint = React.lazy(() => import('./views/Utilities/UpdateCheckpoint'));
const CreateJson = React.lazy(() => import('./views/Utilities/JsonCreateData'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));
// Assets bundles
const UploadBundlePageDev = React.lazy(() => import('./views/Bundles/UploadDev'));
const UploadBundlePageProd = React.lazy(() => import('./views/Bundles/UploadProd'));
// Users
const LoadUsers = React.lazy(() => import('./views/Users/Load'));

const routes: RouteObject[] = [
    // redirect
    { path: '/home', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/build/upload-dev', exact: true, name: 'Subir builds', component: UploadBuildPage },
    { path: '/bundles/upload-prod', exact: true, name: 'Subir bundles Produccion', component: UploadBundlePageProd },
    { path: '/bundles/upload-dev', exact: true, name: 'Subir bundles Desarrollo', component: UploadBundlePageDev },
    { path: '/catalog/download', exact: true, name: 'Descargar Catalogo', component: DownloadCatalogPage },
    { path: '/utilities/updatecheckpoint', exact: true, name: 'Actualizar Checkpoint', component: UpdateCheckpoint },
    { path: '/utilities/createjson', exact: true, name: 'Crear Json data', component: CreateJson },
    { path: '/user/profile', exact: true, name: 'Perfil', component: Profile },
    { path: '/user/load', exact: true, name: 'Carga usuarios', component: LoadUsers }
];
export default routes;
