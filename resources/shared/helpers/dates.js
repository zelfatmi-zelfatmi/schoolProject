import moment from 'moment-timezone';

export function dateFormat(d = '', type = 'fr') {
    if (!d) {
        return null;
    }
    switch (type) {
        case 'full':
            return moment(String(d)).format('ddd DD MMMM YYYY');
        case 'fulltime':
            return moment(String(d)).format('DD MMM YYYY HH:mm');
        case 'letter':
        case 'lettre':
            return moment(String(d)).format('DD MMM YYYY');
        case 'time':
            return moment(String(d)).format('HH:mm:ss');
        case 'shortTimeConvert':
            return moment(d).format('HH:mm');
        case 'shortTime':
            return moment(String(d)).format('HH:mm');
        case 'iso':
            return moment(String(d)).format('yyyy-MM-DD');
        case 'fulliso':
            return moment(String(d)).format('yyyy-MM-DD HH:mm');
        case 'fr':
            return d ? moment(String(d)).format('DD/MM/YYYY') : '';
        case 'fromNow':
            return d ? moment(String(d)).fromNow() : '';
        case 'old':
            return moment().diff(d, 'years', false);
        case 'monthly':
            return moment(String(d)).format('MMMM Y');
        // case 'time':
        //     return d ? moment(`${moment().format('YYYY-MM-DD')} ${d}`).format('HH:mm') : '';
        default:
            return '';
    }
}

export const isOutdated = (item) => {
    const date = dateFormat(item.date, 'iso');
    return moment().isAfter(date + ' ' + item.end_at);
};
