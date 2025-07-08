import {examPeriodsList, monthsList} from '@admin/constants';
import {routes} from '@admin/routes';
import {boiteType} from '@shared/constants';
import {useQuery} from '@shared/hooks';

export const headings = [
    { name: 'Boite' },
    { name: 'Eleve' },
    { name: 'Etat' },
    { name: 'Code' },
    { name: 'Derniere heure' },
    { name: 'Estimation (H)' },
    { name: 'CROF' },
    { name: 'Commentaire' },
    { name: 'Date PP' },
    { name: 'AVAL Moniteur' },
    { name: 'Paiement du Forfait' },
    { name: 'Paiement du PPE' },
    { name: 'RDV permis' },
    { name: 'Opérateur' },
    // { name: 'Action', className: 'text-center sticky right-0 bg-gray-80 border-l' },
];

export const EXAM_LIST_ATTENTE = 1;
export const EXAM_PRE_LIST = 2;
export const EXAM_PASSAGE = 3;
export const EXAM_ARCHIVE = 4;

export const EXAM_RESULT_ADMIS = '1';
export const EXAM_RESULT_REFUS = '2';

export const EXAM_RSULTS = {
    [EXAM_RESULT_REFUS]: { id: EXAM_RESULT_REFUS, name: 'Refus', color: 'bg-red-500' },
    [EXAM_RESULT_ADMIS]: { id: EXAM_RESULT_ADMIS, name: 'Admis', color: 'bg-green-500' },
};
export const examStatus = {
    [EXAM_LIST_ATTENTE]: { id: EXAM_LIST_ATTENTE, name: "Liste d'attente", color: 'bg-yellow-400' },
    [EXAM_PRE_LIST]: { id: EXAM_PRE_LIST, name: 'Pré-liste', color: 'bg-green-400' },
    [EXAM_PASSAGE]: { id: EXAM_PASSAGE, name: 'Passage', color: 'bg-blue-400' },
    [EXAM_ARCHIVE]: { id: EXAM_ARCHIVE, name: 'Archive', color: 'bg-gray-400' },
};
export const getSession = (item) => {
    if (item.eleve?.sessions?.length) {
        return item.eleve?.sessions[0]?.planning;
    }
    return {};
};
export const getProduct = (item) => {
    if (item.eleve?.sessions?.length) {
        return item.eleve?.sessions[0]?.product;
    }
    return {};
};
export const getBoite = (item) => {
    return item.is_auto ? boiteType[1] : boiteType[0];
};
export const getExamPeriod = (value) => {
    if (!value) return '';
    const [month, prefix] = value.split('') || ['N/A', 'N/A'];
    const monthName = monthsList.find((p) => p.id == month);
    const period = examPeriodsList.find((p) => p.id === prefix);
    return `${monthName?.name} ${period?.name}`;
};

export const headingsPassage = [
    { name: "Jour de l'examen" },
    { name: 'Passage RDV PERMIS' },
    { name: 'Lieux' },
    { name: 'Moniteur' },
    // { name: 'Heure de passage' },
    { name: 'Opérateur' },
    { name: 'Eleve' },
    { name: 'Boite' },
    { name: 'toutes heurs placées' },
    { name: 'Paiement du forfait ?' },
    { name: 'Paiement du PPE ?' },
    { name: 'Commentaire' },
    { name: 'Passage prévu' },
    { name: 'RESULTAT PERMIS' },
];

export const headingsArchivee = [
    { name: "Jour de l'examen" },
    { name: 'Passage RDV PERMIS' },
    // { name: 'Heure de passage' },
    { name: 'Lieux' },
    { name: 'N° Inspecteur' },
    { name: 'Moniteur' },
    { name: 'Nom(S)' },
    { name: 'Paiement du forfait ?' },
    { name: 'Paiement du PPE ?' },
    { name: 'Commentaire secrétariat' },
];

export const useExams = ({ isMounted } = {}) => {
    const operatorsQuery = useQuery(
        {
            url: route(routes.api.operators.all),
        },
        isMounted
    );
    const monitorsQuery = useQuery(
        {
            url: route(routes.api.moniteurs.all),
            transformable: true,
            callback: (data = []) => data.map((item) => ({ ...item, ...item.moniteur })),
        },
        isMounted
    );
    const elevesQuery = useQuery(
        {
            url: route(routes.api.eleves.all),
            transformable: true,
            callback: (data = []) => data.map((item) => ({ ...item, ...item.eleve })),
        },
        isMounted
    );
    const onFetchOperators = (search = '', refetch = false, loadmore = false) => {
        if (operatorsQuery.data?.length && !refetch) {
            return;
        }
        operatorsQuery.fetch('', { search }, loadmore);
    };
    const onFetchMoniteur = (search = '', refetch = false, loadmore = false) => {
        if (monitorsQuery.data?.length && !refetch) {
            return;
        }
        monitorsQuery.fetch('', { search }, loadmore);
    };
    const onFetchEleve = (search = '', refetch = false, loadmore = false) => {
        if (elevesQuery.data?.length && !refetch) {
            return;
        }
        elevesQuery.fetch('', { search }, loadmore);
    };
    return { monitorsQuery, onFetchMoniteur, elevesQuery, onFetchEleve, operatorsQuery, onFetchOperators };
};
