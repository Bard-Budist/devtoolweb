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
}
const chartData: { items: MenuItemType[] } = {
    items: [
       /* {
            id: 'dev',
            title: 'Development',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'build-upload-dev',
                    title: 'Builds',
                    type: 'item',
                    url: '/build/upload-dev',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                }
                ]
        },*/
        /*{
            id: 'catalogo',
            title: 'catalogo',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'catalogo-download',
                    title: 'Descargar catalogo',
                    type: 'item',
                    url: '/catalog/download',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                }
            ]
        },*/
        // {
        //     id: 'exams',
        //     title: 'Examenes',
        //     type: 'group',
        //     icon: 'icon-award',
        //     children: [
        //         {
        //             id: 'exams-topic',
        //             title: 'Temas',
        //             type: 'item',
        //             url: '/exams/topics',
        //             classes: 'nav-item',
        //             icon: 'feather icon-award'
        //         },
        //         {
        //             id: 'exams-options',
        //             title: 'Optiones',
        //             type: 'item',
        //             url: '/exams/options',
        //             classes: 'nav-item',
        //             icon: 'feather icon-book'
        //         }
        //     ]
        // },
        {
            id: 'utils',
            title: 'Utilidades',
            type: 'group',
            icon: 'icon-award',
            children: [
                {
                    id: 'utils-checkpoint',
                    title: 'Actualizar checkpoint',
                    type: 'item',
                    url: '/dev/checkpoint',
                    classes: 'nav-item',
                    icon: 'feather icon-award'
                },
                {
                    id: 'utils-data-json',
                    title: 'Crear JSON data',
                    type: 'item',
                    url: '/dev/checkpoint',
                    classes: 'nav-item',
                    icon: 'feather icon-award'
                },
            ]
        },
        {
            id: 'bundles',
            title: 'Assets Bundles',
            type: 'group',
            icon: 'icon-award',
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
        }
    ]
    
};
export default chartData;
