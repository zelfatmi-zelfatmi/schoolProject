const api = {
    cart: {
        get: 'api.eleve.carts.getCart',
        delete: 'api.eleve.carts.destroy',
        addCartOrItem: 'api.eleve.carts.storeOrUpdate',
        addCartOrManyItem: 'api.eleve.carts.storeOrUpdateMany',
    },
    order: {
        strip: {
            submitPayment: 'api.eleve.order.store',
        },
    },
    eleve: {
        paypal: {
            process: 'api.paypal.transaction.process',
            success: 'api.paypal.transaction.success',
            cancel: 'api.paypal.transaction.cancel',
        },
    },
    auth: {
        login: 'api.auth.login',
    },
    pages: {
        home: 'api.pages.home',
    },
};
const register = {
        parent:{
 register:'register',
    },
    moniteur: {
        create: 'moniteur.inscription.create',
        store: 'moniteur.inscription.store',
    },
    eleve: {
        create: 'eleve.inscription.create',
        store: 'eleve.inscription.store',
        StoreHowKnow: 'eleve.inscription.storeConnu',
        storeNextStep: 'eleve.inscription.storeNextStep',

    },
};
const contact = {
    index: 'contact.index',
    send: 'contact.send',
    sendLead: 'contact.sendLead'
};
export const routes = {
    frontHome: 'accueil.index',
    permis: 'permis.index',
    codeRoute: 'code-route.index',
    tarifs: 'nos-tarifs.index',
    CPF: 'cpf.index',
    frontDevenirMoniteur: 'devenir-moniteur.index',
    frontBlog: 'blog.front.index',
    frontPanel: 'panel.index',
    cart: 'panel.index',
    mentionLegales: 'mention-legales.index',
    conditionGeneral: 'condition-general.index',
    // cart: 'eleve.shop.index',
    login: 'login',
    api,
    register,
    contact,
};
