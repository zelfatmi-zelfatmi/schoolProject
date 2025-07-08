import { routes } from '@admin/routes';
import { CurrencyEuroIcon, DocumentTextIcon, IdentificationIcon } from '@heroicons/vue/20/solid';
// import moment from 'moment-timezone';

export const pagesNavigation = (id) => [
    {
        icon: CurrencyEuroIcon,
        path: route(routes.users.moniteur.invoices, id),
        pathname: '/factures',
        title: 'Facturation',
        // content: 'Lorem amet consectetur.',
        // children: navigationButtons,
    },
    {
        icon: IdentificationIcon,
        path: route(routes.users.moniteur.edit, id),
        pathname: '/edit',
        title: 'Informations personnel',
        // content: 'Lorem amet consectetur.',
    },
    {
        icon: DocumentTextIcon,
        path: route(routes.users.moniteur.fich.documents, id),
        pathname: '/documents',
        title: 'Documents',
    },
    // {
    //     icon: DocumentTextIcon,
    //     path: route(routes.users.moniteur.fich.docsProfessional, id),
    //     pathname: '/docs-professional',
    //     title: 'Documents professionneles',
    // },
    {
        icon: DocumentTextIcon,
        path: route(routes.users.moniteur.fich.coordonneesBancaire, id),
        pathname: '/coordonnees-bancaire',
        title: 'Coordonnées bancaires',
    },
];

export const invoicesPage = {
    breadcumb: [
        {
            name: 'Moniteur',
            href: route(routes.users.moniteur.list),
        },
        {
            name: 'Facturation',
        },
    ],
    headings: [
        { name: 'Numéro facture' },
        { name: 'ETP B' },
        { name: 'Heure travaillé' },
        { name: 'Total', className: 'text-center' },
        { name: 'Date de paiement', className: 'text-center' },
        { name: 'Statut', className: 'text-center' },
        { name: 'Action', className: 'text-center sticky right-0 bg-gray-80 border-l' },
    ],
    tabs: [
        {
            name: 'Factures actif',
            id: '1',
            key: 'status'
        },
        {
            name: 'Factures archivées',
            id: '0',
            key: 'status'
        },
    ],
};
