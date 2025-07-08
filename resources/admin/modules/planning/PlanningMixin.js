import { routes } from '@admin/routes';
import { usePlanningSession } from '@admin/stores';
import { useParams, useQuery } from '@shared/hooks';
import moment from 'moment-timezone';

export const checkSessionDate = (count, format = 'YYYY-MM-DD') => {
    const session = usePlanningSession();
    return moment(session.start).add(count, 'days').format(format);
};

export const getMonitorCountPerDay = (data) => {
    return Object.values(data).reduce((max, items) => {
        if (items.length > max) {
            max = items.length;
        }
        return max;
    }, 0);
};

export const getDefaultPlanningsDate = (view = 'week') => {
    const params = useParams();
    const session = {
        disp: params.disp,
    };
    if (params?.start && params?.end) {
        session.start = moment(params?.start);
        session.end = moment(params?.end);
    } else if (view === 'month') {
        session.start = moment().subtract(1, 'months').endOf('month').startOf('isoWeek');
        session.end = moment().add(1, 'months').startOf('month').endOf('isoWeek');
    } else if (view === 'week') {
        session.start = moment().startOf('isoWeek');
        session.end = moment().endOf('isoWeek');
    }
    return session;
};

export const usePlanningsMixinFilters = (props) => {
    const monitorsQuery = useQuery({
        url: route(routes.api.moniteurs.all),
        init: props.monitors,
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.moniteur })),
    });

    const elevesQuery = useQuery({
        url: route(routes.api.eleves.all),
        init: props.students,
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.eleve })),
    });
    const productQuery = useQuery({
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.product, real_solde: item.solde })),
    });
    const zonesQuery = useQuery({
        url: route(routes.api.zones.list),
        key: 'zones',
    });

    const lieuxQuery = useQuery({
        transformable: true,
        callback: (data = []) => data.map((item) => ({ ...item, ...item.data })),
    });

    return {
        monitorsQuery,
        elevesQuery,
        productQuery,
        lieuxQuery,
        zonesQuery,
    };
};
