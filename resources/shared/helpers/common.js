import moment from 'moment/moment';

// url is active
export function isActive(url = null, directPath = null) {
    // Vérifie si on est côté client
    if (typeof window === "undefined") {
        return false;  // Évite d'exécuter la fonction en SSR
    }

    if (!url || url === '#') {
        return window.location.pathname.includes(directPath); // Utilise `window.location` côté client
    }

    const { pathname } = new URL(url);
    return window.location.pathname === pathname;  // Utilise `window.location` côté client
}

// strip the numbers
export function strip(number = 0, toPrecision = 2) {
    return Number(number.toFixed(toPrecision));
}

// Formating date
// copy to clipboard
export async function copy(text = '') {
    try {
        if (!navigator.clipboard) {
            throw text;
        }
        await navigator.clipboard.writeText(text);
    } catch (error) {
        throw 'Failed to copy: ' + error;
    }
}

export const moneyFormat = (value, symbol = ' €') => {
    return new Intl.NumberFormat('fr', { symbol: '€', currency: 'EUR' }).format(value) + symbol;
};

export const getSummary = (value) => {
    const listSummary = [];
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    const h1Elements = tempElement.querySelectorAll('h1');
    const h2Elements = tempElement.querySelectorAll('h2');
    for (let i = 0; i < Math.max(h1Elements.length, h2Elements.length); i++) {
        if (i < h1Elements.length) {
            listSummary.push({
                type: 'h1',
                text: h1Elements[i]?.textContent,
                id: i,
            });
        }
        if (i < h2Elements.length) {
            listSummary.push({
                type: 'h2',
                text: h2Elements[i]?.textContent,
                id: 'sub' + i,
            });
        }
    }
    return listSummary;
};
export const scrollToView = (item) => {
    const elements = document.querySelectorAll(`${item.type}`);
    elements[1].scrollIntoView({ behavior: 'smooth' });
    elements.forEach((el, i) => {
        if (el.textContent === item.text) {
            elements[i].scrollIntoView({ behavior: 'smooth' });
        }
    });
};
export const getInitials = (name, number = 2) => {
    if (name) {
        const nameParts = name.split(' ');
        const initials = nameParts.map((name) => name.charAt(0).toUpperCase());
        return initials.slice(0, number).join('');
    }
    return '';
};

export const getName = (user = {}) => {
    if (user) {
        if (!user?.first_name && user.name) {
            const [fn, ln] = user.name.split(' ');
            return `${fn}.${ln?.slice(0, 1).toUpperCase()}`;
        }
        return `${user?.first_name}.${user?.last_name?.slice(0, 1).toUpperCase()}`;
    }
    return '';
};

export const getMediaUrl = (item = {}, isMedia = false) => {
    if (isMedia) {
        return item?.media?.storage_media?.thumb || item?.media?.storage_media?.path || '';
    }
    return item.media || item.profile_photo_url;
};
export const checkPassword = (form) => {
    if (form.password && form.password !== form.password_confirmation) {
        form.errors.password_confirmation = "le mot de passe n'est pas identique";
    } else {
        form.errors.password_confirmation = '';
    }
};
/**
 * Generates a URL-friendly slug from a given text.
 * Converts the text to lowercase, trims whitespace, replaces spaces and underscores with hyphens,
 * removes non-alphanumeric characters (except hyphens), and collapses multiple hyphens into one.
 *
 * @param {string} text - The text to be converted into a slug.
 * @returns {string} - The generated slug.
 */
export const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[_\s]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/[^\w-]+/g, '') // Remove all non-word characters except hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+/, '') // Trim hyphens from the start
        .replace(/-+$/, ''); // Trim hyphens from the end
};
