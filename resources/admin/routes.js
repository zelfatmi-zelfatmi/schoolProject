const shop = {
    products: {
        list: 'admin.products.index',
        create: 'admin.products.create',
        // show: 'admin.products.store',
        store: 'admin.products.store',
        edit: 'admin.products.edit',
        update: 'admin.products.update',
        updateStatus: 'admin.products.updateStatus',
        delete: 'admin.products.destroy',
    },
    cart: {
        list: 'admin.carts.index',
        listWithMonitor: 'admin.carts.index',
        show: 'admin.carts.show',
        edit: 'admin.carts.edit',
        delete: 'admin.carts.destroy',
        updateReminder: 'admin.carts.updateReminder'
    },
    orders: {
        list: 'admin.orders.index',
        show: 'admin.orders.show',
        delete: 'admin.orders.destroy',
        create: 'admin.orders.create',
        store: 'admin.orders.store',
        update: 'admin.orders.update',
        edit: 'admin.orders.edit',
        refund: 'api.admin.order.refund',
    },
};
const users = {
    admin: {
        list: 'admin.users.admin.getAllAdmins',
        create: 'admin.users.admin.createAdmin',
        store: 'admin.users.admin.storeAdmin',
        edit: 'admin.users.admin.editAdmin',
        update: 'admin.users.admin.updateAdmin',
        delete: 'admin.users.admin.destroyAdmin',
    },
    secretary: {
        list: 'admin.users.secretary.getAllSecretarys',
        create: 'admin.users.secretary.createSecretary',
        store: 'admin.users.secretary.storeSecretary',
        edit: 'admin.users.secretary.editSecretary',
        update: 'admin.users.secretary.update',
        // delete: 'admin.users.secretary.destroySecretary',
    },
    moniteur: {
        list: 'admin.users.moniteur.getAllMoniteurs',
        invoices: 'admin.users.moniteur.invoices',
        create: 'admin.users.moniteur.createMoniteur',
        store: 'admin.users.moniteur.storeMoniteur',
        edit: 'admin.users.moniteur.editMoniteur',
        update: 'admin.users.moniteur.updateMoniteur',
        delete: 'admin.users.moniteur.destroyMoniteur',
        fich: {
            documents: 'admin.users.moniteur.documents',
            documentsUpdate: 'admin.users.moniteur.documents.update',

            coordonneesBancaire: 'admin.users.moniteur.coordonneesBancaire',
            coordonneesBancaireSave: 'admin.users.moniteur.coordonneesBancaireSave',
        },
    },
    eleve: {
        list: 'admin.users.eleve.getAllEleves',
        withZones: 'admin.users.eleve.getSoldAndZones',
        general: 'admin.users.eleve.getGeneraleInfo',
        cpf: 'admin.users.eleve.getCpf',
        livret: 'admin.users.eleve.getEleveLivret',
        create: 'admin.users.eleve.createEleve',
        store: 'admin.users.eleve.storeEleve',
        edit: 'admin.users.eleve.editEleve',
        update: 'admin.users.eleve.updateEleve',
        delete: 'admin.users.eleve.destroyEleve',
    },
};
const plannings = {
    main: {
        list: 'admin.plannings.index',
        create: 'admin.plannings.create',
        store: 'admin.plannings.store',
        edit: 'admin.plannings.edit',
        update: 'admin.plannings.update',
        delete: 'admin.plannings.destroy',
        show: 'admin.plannings.show'
    },
    sessions: {
        list: 'admin.sessions.index',
        create: 'admin.sessions.create',
        store: 'admin.sessions.store',
        edit: 'admin.sessions.edit',
        update: 'admin.sessions.update',
        delete: 'admin.sessions.destroy',
        addComment: 'admin.session.updateCommentaire',
        testComment: 'admin.session.testCommentaire'
    },
};
const pages = {
    promo: {
        index: 'admin.pages.promo.index',
        create: 'admin.pages.promo.create',
        store: 'admin.pages.promo.store',
        edit: 'admin.pages.promo.edit',
        update: 'admin.pages.promo.update',
        delete: 'admin.pages.promo.delete',
    },
    home: {
        index: 'admin.pages.home.index',
        update: 'admin.pages.home.update',
    },
    dashboardSuperAdmin: 'admin.pages.dashboard'
};
const annulationTardive = {
    index: 'admin.annulation-tardive.index',
    update: 'admin.annulation-tardive.update',
};

const invoices = {
    index: 'admin.invoices.index',
    admin: 'admin.invoices.admin',
    view: 'admin.invoices.view',
    download: 'admin.invoices.downloadInvoice',
    updateOrCreatePaymentDate: 'admin.invoices.updateOrCreatePaymentDate',
    update: 'admin.invoices.update',
};
const contact = {
    index: 'admin.contact.index',
    update: 'admin.contact.update',
};
const cpf = {
    index: 'admin.cpf.index',
    store: 'admin.cpf.store',
    update: 'admin.cpf.update',
    destroy: 'admin.cpf.destroy',
    history: 'admin.cpf.signatureHistory'
};
const impersonate = {
    start: 'impersonate.start',
    stop: 'impersonate.stop',
};
const propositions = {
    index: 'admin.proposition-session.index',
    update: 'admin.proposition-session.update',
};
const configuration = {
    liverApprentissage: {
        groups: {
            index: 'admin.livret-apprentissage.groups.index',
            store: 'admin.livret-apprentissage.groups.store',
            // create: 'admin.livret-apprentissage.groups.create',
            // edit: 'admin.livret-apprentissage.groups.edit',
            update: 'admin.livret-apprentissage.groups.update',
            destroy: 'admin.livret-apprentissage.groups.destroy',
        },
        skills: {
            index: 'admin.livret-apprentissage.skills.index',
            store: 'admin.livret-apprentissage.skills.store',
            // create: 'admin.livret-apprentissage.skills.create',
            // edit: 'admin.livret-apprentissage.skills.edit',
            update: 'admin.livret-apprentissage.skills.update',
            destroy: 'admin.livret-apprentissage.skills.destroy',
        },
    },
    zones: {
        list: 'admin.zones.index',
        store: 'admin.zones.store',
        create: 'admin.zones.create',
        edit: 'admin.zones.edit',
        update: 'admin.zones.update',
        destroy: 'admin.zones.destroy',
        attach: 'admin.zones.attachZoneToEleve',
        detach: 'admin.zones.detachZoneToEleve',
        zip: {
            index: 'admin.zips.index',
            store: 'admin.zips.store',
            update: 'admin.zips.update',
            destroy: 'admin.zips.destroy',
        },
        lieux: {
            index: 'admin.lieux.index',
            store: 'admin.lieux.store',
            update: 'admin.lieux.update',
            destroy: 'admin.lieux.destroy',
        },
    },
};

const exams = {
    waitingList: {
        index: 'admin.exams.waiting-list.index',
        update: 'admin.exams.waiting-list.update',
        edit: 'admin.exams.waiting-list.edit',
    },
    preList: {
        index: 'admin.exams.pre-list.index',
        update: 'admin.exams.pre-list.update',
        declare: 'admin.exams.pre-list.declare',
        edit: 'admin.exams.pre-list.edit',
    },
    passage: {
        index: 'admin.exams.passage.index',
        update: 'admin.exams.passage.update',
        edit: 'admin.exams.passage.edit',
    },
    archived: {
        index: 'admin.exams.archived.index',
        update: 'admin.exams.archived.update',
    },
};
const codeRoute = {

    theme: 'admin.themes.index',
    addTheme: 'admin.themes.create',
    storeTheme: 'admin.themes.store',
    toggleTheme: 'admin.themes.toggle',
    editTheme: 'admin.themes.edit',
    updateTheme: 'admin.themes.update',
    question: 'admin.questions.index',
    addQuestion: 'admin.questions.create',
    editQuestion: 'admin.questions.edit',
    storeQuestion: 'admin.questions.store',
    updateQuestion: 'admin.questions.update'
}
const rdvExamen = {

    list: 'admin.rdvExamen.list',
}
const api = {
    plannings: {
        list: 'api.admin.plannings.index',
        update: 'api.admin.plannings.update',
        store: 'api.admin.plannings.store',
        annulation: 'api.admin.plannings.annulation.session',
        destroy: 'api.admin.plannings.destroy',
    },
    reservation: {
        update: 'api.admin.plannings.reservation.update',
        store: 'api.admin.plannings.reservation.store',
    },
    availableSession: {
        index: 'api.admin.available-session.all',
        eleveReservation: 'api.admin.available-session.getAllPlanningsEleveGroupByWeek',
        store: 'api.admin.available-session.store',
        destroy: 'api.admin.available-session.destroy',
    },
    calls: {
        index: 'api.admin.available-calls.index',
        store: 'api.admin.available-calls.store',
        destroy: 'api.admin.available-calls.destroy',
    },
    soldes: {
        getSoldesByEleve: 'api.admin.soldes.eleve.getSoldesByEleve',
        incOrDecSoldeEleve: 'api.admin.soldes.eleve.incOrDecSoldeEleve',
    },
    products: {
        list: 'api.admin.products.getAllProducts',
        listbox: 'api.admin.products.productsForListBox',
    },
    cart: {
        getCart: 'api.admin.cart.getCart',
        addProductsToCart: 'api.admin.cart.storeOrUpdateMany',
    },
    user: {
        archive: 'api.admin.user.archiveUser',
        zones: 'api.admin.zones.getAllZones',
    },
    eleves: {
        all: 'api.admin.eleves.all',
    },
    operators: {
        all: 'api.admin.operators.all',
    },
    moniteurs: {
        all: 'api.admin.moniteurs.all',
        factures: {
            resumeHours: 'api.admin.moniteurs.factures.resumes',
        },
    },
    zones: {
        list: 'api.admin.zones.getAllZones',
        zips: {
            list: 'api.admin.zones.getAllZips',
        },
        lieux: {
            list: 'api.admin.zones.getAllLieux',
        },
    },
    comments: {
        list: 'api.admin.comments.index',
        store: 'api.admin.comments.store',
        update: 'api.admin.comments.update',
        delete: 'api.admin.comments.destroy',
    },
    skills: {
        list: 'api.admin.skills.index',
    },
    resumeHours: {
        index: 'api.admin.resume-hours.index',
    },

};
export const routes = {
    shop,
    users,
    plannings,
    annulationTardive,
    configuration,
    impersonate,
    propositions,
    invoices,
    cpf,
    contact,
    pages,
    exams,
    api,
    codeRoute,
    rdvExamen
};
