import { routes } from '@admin/routes';
import { routes as blogRoutes } from '@blogs/routes';
import { usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

import {
    BuildingStorefrontIcon,
    CalendarDaysIcon,
    Cog6ToothIcon,
    Squares2X2Icon,
    LightBulbIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ExclamationCircleIcon,
    CurrencyEuroIcon,
    AcademicCapIcon,
    ChatBubbleBottomCenterTextIcon,
    PencilSquareIcon,
    BookOpenIcon,
} from '@heroicons/vue/20/solid';

const tableOfMangement = [
    {
        name: 'Tableau de gestion',
        divider: true,
    },
    {
        name: 'Propositions des sessions',
        shortName: 'Propositions',
        href: route(routes.propositions.index),
        mobile: true,
        icon: LightBulbIcon,
    },
    {
        name: 'Annulations tardives',
        shortName: 'Annulations',
        href: route(routes.annulationTardive.index),
        mobile: true,
        icon: ExclamationCircleIcon,
    },
    {
        name: 'Message client',
        shortName: 'Messages',
        href: route(routes.contact.index),
        mobile: true,
        icon: ChatBubbleBottomCenterTextIcon,
    }
];

export function getNavigation() {
    const { props } = usePage();

    // ✅ Sécurise l'accès aux rôles
    const userRoles = Array.isArray(props?.auth?.roles) ? props.auth.roles : [];

    const navigation = [];

    // ✅ Ajout du bloc spécifique à Super Admin
    if (userRoles.includes('superAdmin')) {
        navigation.push({
            name: 'Tableau de bord',
            href: route(routes.pages.dashboardSuperAdmin), // 🔁 adapte le nom de la route si besoin
            icon: Squares2X2Icon,
            openByDefault: true,
        });
    }

    // ✅ Navigation classique pour admin/secretary/superAdmin
    navigation.push(
        {
            name: 'Boutique',
            openByDefault: true,
            icon: BuildingStorefrontIcon,
            children: [
                { name: 'Commandes', href: route(routes.shop.orders.list) },
                { name: 'Paniers', href: route(routes.shop.cart.list, { type: 'default' }) },
                { name: 'Paniers Moniteur', href: route(routes.shop.cart.list, { type: 'moniteur' }) },
            ],
        },
        {
            name: 'Examen',
            openByDefault: true,
            icon: AcademicCapIcon,
            children: [
                { name: "Liste d'attente", href: route(routes.exams.waitingList.index) },
                { name: 'Pre liste', href: route(routes.exams.preList.index) },
                { name: 'Passage', href: route(routes.exams.passage.index) },
                { name: 'Archive', href: route(routes.exams.archived.index) },
                { name: 'RDV Examen', href: route(routes.rdvExamen.list) },

            ],
        },
        {
            name: 'Planning',
            openByDefault: true,
            icon: CalendarDaysIcon,
            children: [{ name: 'Planning et sessions', href: route(routes.plannings.main.list) }],
        },
        ...(userRoles.includes('secretary') ? [
            {
                name: 'Utilisateurs',
                icon: UserGroupIcon,
                openByDefault: true,
                children: [
                    { name: 'Eleves', href: route(routes.users.eleve.list) },
                ],
            },
        ] : [
            {
                name: 'Suivi CPF',
                icon: Squares2X2Icon,
                href: route(routes.cpf.index),
            },
            {
                name: 'Historique signature CPF',
                icon: PencilSquareIcon,
                href: route(routes.cpf.history),
            },
            {
                name: 'Configuration',
                openByDefault: true,
                icon: Cog6ToothIcon,
                children: [
                    { name: 'Produits', href: route(routes.shop.products.list) },
                    { name: "Livret d'apprentissage", href: route(routes.configuration.liverApprentissage.groups.index) },
                    { name: 'Zone et code postaux', href: route(routes.configuration.zones.list) },
                ],
            },
            {
                name: 'Utilisateurs',
                icon: UserGroupIcon,
                openByDefault: true,
                children: [
                    { name: 'Administration', href: route(routes.users.admin.list) },
                    { name: 'Secrétaire', href: route(routes.users.secretary.list) },
                    { name: 'Moniteur', href: route(routes.users.moniteur.list) },
                    { name: 'Eleves', href: route(routes.users.eleve.list) },
                ],
            },
            {
                name: 'Code de la route',
                icon: BookOpenIcon,
                openByDefault: true,
                children: [
                    { name: 'Thème', href: route(routes.codeRoute.theme) },
                    { name: 'Questions', href: route(routes.codeRoute.question) },
                    { name: 'séries', href: '#' },
                    { name: 'Quiz', href: '#' },
                ],
            },
        ]),
        ...tableOfMangement,
        ...(userRoles.includes('secretary') ? [] : [
            {
                name: 'Facturation',
                href: route(routes.invoices.index),
                mobile: true,
                icon: CurrencyEuroIcon,
                openByDefault: true,
            },
            {
                name: 'Blog',
                icon: DocumentTextIcon,
                openByDefault: true,
                children: [
                    { name: 'Categories', href: route(blogRoutes.admin.categories.list), reload: true, external: false },
                    { name: 'Articles', href: route(blogRoutes.admin.articles.list), reload: true, external: false },
                    { name: 'Commentaires ', href: route(blogRoutes.admin.comments.list), reload: true, external: false },
                    { name: 'Popups', href: route(blogRoutes.admin.popups.all), reload: true, external: false },
                    { name: 'Leads', href: route(blogRoutes.admin.leads.all), reload: true, external: false },
                    { name: 'Script', href: route(blogRoutes.admin.script.all), reload: true, external: false },
                    { name: 'Redirection', href: route(blogRoutes.admin.redirections.all), reload: true, external: false },
                ],
            },
        ])
    );

    return navigation;
}

export const drawerNavigation = [...tableOfMangement];
export const headerNavigation = [{ name: 'Accueil personnaliser', href: route(routes.pages.home.index), sticky: true }];
