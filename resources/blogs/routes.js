const admin = {
    categories: {
        list: 'blog.admin.categories.all',
        create: 'blog.admin.categories.create',
        show: 'blog.admin.categories.show',
        store: 'blog.admin.categories.store',
        edit: 'blog.admin.categories.edit',
        update: 'blog.admin.categories.update',
        delete: 'blog.admin.categories.delete',
        articles: 'blog.admin.categories.article.get',
    },
    articles: {
        list: 'blog.admin.articles.index',
        listByCategory: 'blog.admin.articles.all',
        create: 'blog.admin.articles.create',
        store: 'blog.admin.articles.store',
        edit: 'blog.admin.articles.edit',
        update: 'blog.admin.articles.update',
        delete: 'blog.admin.articles.delete',
    },
    comments: {
        list: 'blog.admin.comments.index',
        create: 'blog.admin.comments.create',
        show: 'blog.admin.comments.all',
        store: 'blog.admin.comments.store',
        edit: 'blog.admin.comments.edit',
        update: 'blog.admin.comments.update',
        delete: 'blog.admin.comments.delete',
    },
    popups: {
        all: 'blog.admin.popups.all',
        create: 'blog.admin.popups.create',
        store: 'blog.admin.popups.store',
        edit: 'blog.admin.popups.edit',
        update: 'blog.admin.popups.update',
        delete: 'blog.admin.popups.delete',
    },
    leads: {
        all: 'blog.admin.leads.all',
        // create: 'blog.admin.leads.create',
        // store: 'blog.admin.leads.store',
        edit: 'blog.admin.leads.edit',
        update: 'blog.admin.leads.update',
        delete: 'blog.admin.leads.delete',
    },
    script: {
        all: 'blog.admin.script.all',
        store: 'blog.admin.script.store',
    },
    redirections: {
        all: 'blog.admin.redirections.all',
        store: 'blog.admin.redirections.store',
        update: 'blog.admin.redirections.update',
        delete: 'blog.admin.redirections.delete',
    },
    api: {
        articlesByCategory: 'api.blog.articles.show.by.category',
        articlesRelated: 'api.blog.articles.show.related',
        categories: 'api.blog.categories.show.all',
    },
}


const front = {
    landing : 'blog.front.index',
    // categories : 'front.categories.index',
    categoriesShow : 'blog.front.categories.show',
    articleShow : 'blog.front.articles.show',
    articlePreview : 'blog.front.articles.preview',
    article : 'blog.front.articles',
    leads: {
        store: 'blog.admin.leads.store',
    },
}

const api = {
    popup : {
        all:'api.blog.popups.show.list',
        byUrl:'api.blog.popups.show.by.url',
    },
}
export const routes = {
    admin,
    front,
    api,
}

