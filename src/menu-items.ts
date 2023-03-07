interface Badge {
    title: string;
    type: string;
}
export interface MenuItemType {
    id: string;
    title: string;
    type: string;
    icon?: string;
    children?: MenuItemType[];
    breadcrumbs?: boolean;
    url?: string;
    badge?: Badge;
    target?: boolean;
    classes?: string;
    external?: boolean;
    roles?: string[];
}
const chartData: { items: MenuItemType[] } = {
    items: [
        {
            id: 'user',
            title: 'Usuario',
            type: 'group',
            icon: 'icon-award',
            roles: ['Admin', 'Development'],
            children: [
                {
                    id: 'user-profile',
                    title: 'Perfil',
                    type: 'item',
                    url: '/user/profile',
                    classes: 'nav-item',
                    icon: 'feather icon-user',
                    roles: ['Admin', 'Development']
                }
            ]
        },
        {
            id: 'utils',
            title: 'Utilidades',
            type: 'group',
            icon: 'icon-award',
            roles: ['Development'],
            children: [
                {
                    id: 'utils-checkpoint',
                    title: 'Actualizar checkpoint',
                    type: 'item',
                    url: '/utilities/updatecheckpoint',
                    classes: 'nav-item',
                    icon: 'feather icon-award'
                },
                {
                    id: 'utils-data-json',
                    title: 'Crear JSON data',
                    type: 'item',
                    url: '/utilities/createJson',
                    classes: 'nav-item',
                    icon: 'feather icon-award'
                }
            ]
        },
        {
            id: 'bundles',
            title: 'Assets Bundles',
            type: 'group',
            icon: 'icon-award',
            roles: ['Development'],
            children: [
                {
                    id: 'dev-bundles-prod',
                    title: 'Bundles Prod',
                    type: 'item',
                    url: '/bundles/upload-prod',
                    classes: 'nav-item',
                    icon: 'feather icon-book'
                },
                {
                    id: 'dev-bundles-dev',
                    title: 'Bundles Dev',
                    type: 'item',
                    url: '/bundles/upload-dev',
                    classes: 'nav-item',
                    icon: 'feather icon-book'
                }
            ]
        },
        {
            id: 'users',
            title: 'Usuarios',
            type: 'group',
            icon: 'icon-award',
            roles: ['Admin'],
            children: [
                {
                    id: 'users-create-list',
                    title: 'Carga de usuarios',
                    type: 'item',
                    url: '/user/load',
                    classes: 'nav-item',
                    icon: 'feather icon-user'
                }
            ]
        }
    ]
};
export default chartData;
