import { routes } from '@admin/routes';
import {
    InformationCircleIcon,
    CalendarDaysIcon,
    ClockIcon,
    ChatBubbleBottomCenterTextIcon,
    DocumentMagnifyingGlassIcon,
    IdentificationIcon,
    Squares2X2Icon,
    DocumentTextIcon,
} from '@heroicons/vue/20/solid';
import moment from 'moment-timezone';

export const listDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const breadcumb = [
    {
        name: 'Eleves',
        href: route(routes.users.eleve.list),
    },
    {
        name: 'Fiche perso',
    },
];
export const navigationButtons = [
    { title: 'Eleve info', id: 'info', icon: InformationCircleIcon },
    { title: 'Disponibilité', id: 'disponibility', icon: CalendarDaysIcon },
    { title: 'Calender', id: 'calender', icon: ClockIcon },
    { title: 'Activités', id: 'activite', icon: ChatBubbleBottomCenterTextIcon },
];
export const pagesBadges = (user = {}) =>
    [user.ville, user.postal].filter(Boolean)?.map((v) => ({ name: v, dark: true }));
export const pagesNavigation = (id) => [
    {
        icon: InformationCircleIcon,
        path: route(routes.users.eleve.general, id),
        pathname: '/general',
        title: 'Général',
        content: 'Lorem amet consectetur.',
        children: navigationButtons,
    },
    {
        icon: Squares2X2Icon,
        path: route(routes.users.eleve.withZones, id),
        pathname: '/zones',
        title: 'Solde / Zone',
        // content: 'Lorem amet consectetur.',
    },
    {
        icon: DocumentMagnifyingGlassIcon,
        path: route(routes.users.eleve.livret, id),
        pathname: '/livret',
        title: "Livret d'apprentissage",
        // content: 'Lorem amet consectetur.',
    },
    {
        icon: IdentificationIcon,
        path: route(routes.users.eleve.edit, id),
        pathname: 'info',
        title: 'Informations et Document',
        // content: 'Lorem amet consectetur.',
    },
    {
        icon: DocumentTextIcon,
        path: route(routes.users.eleve.cpf, id),
        pathname: 'cpf',
        title: 'CPF - Document',
    },
];

export const getDateWeekByIndex = (index = 0) => {
    const date = moment().add(index, 'week');
    return {
        start: date.startOf('isoWeek').format('YYYY-MM-DD'),
        end: date.endOf('isoWeek').format('YYYY-MM-DD'),
    };
};
export const getListMoniteurs = (list = []) =>
    list.reduce((acc, item) => {
        if (!acc.some((v) => v.id === item?.moniteur?.id)) {
            acc.push({ ...item?.moniteur, lieu: item.lieu });
        }
        return acc;
    }, []);
