import { routes } from "@blogs/routes"

export const statusTransformer = ({status })=> {
    switch (status) {
        case 'published':
            return [{
                    title: 'Publié',
                    success: true
                }]
        case 'draft':
            return [{
                    title: 'Brouillon',
                    secondary:true
                }]
        case 'planning':
            return [{
                    title: 'Planifié',
                    info: true
                }]
        default:
            return []
    }
}

export const getEditorRelatedPageData=(data)=> {
    if (!data && !data.category) {
        return {
            url: '',
            title: '',
        }
    }
    // const url
    return {
        url:  data.related_article_main ? route(routes.front.articleShow, {
            article: data.related_article_main.slug,
            category: data.category.slug,
        }) : route(routes.front.categoriesShow, data.category.slug) ,
        title:  data.related_article_main ? data.related_article_main.title : data.category.name,
    }
}
