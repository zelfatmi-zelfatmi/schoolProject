import moment from 'moment-timezone';

export const HEUR_EVAL = {
    id: 1,
    name: "Heure d'éval",
    short: 'HE',
    color: 'bg-orange-200 text-orange-600',
};
export const ATTEND_NEPH = {
    id: 2,
    name: 'Attente NEPH - Acces code - 1H bilan MAX',
    short: 'A-NEPH',
    color: 'bg-red-200 text-red-600',
};
export const HEUR_EVAL_FORAIS = {
    id: 3,
    name: "Heure d'éval Forfait",
    short: 'HEF',
    color: 'bg-green-200 text-green-600',
};
export const ACCES_CODE = {
    id: 4,
    name: 'Accès code',
    short: 'AC',
    color: 'bg-green-200 text-green-600',
};
export const NEPH = {
    id: 5,
    name: 'NEPH €',
    short: 'NEPH',
    color: 'bg-sky-200 text-sky-600',
};
export const examenStatusForfais = {
    [HEUR_EVAL.id]: HEUR_EVAL,
    [ATTEND_NEPH.id]: ATTEND_NEPH,
    [HEUR_EVAL_FORAIS.id]: HEUR_EVAL_FORAIS,
    [ACCES_CODE.id]: ACCES_CODE,
    [NEPH.id]: NEPH,
};

export const monthsList = moment.months().map((month, idx) => ({
    name: month,
    id: idx,
}));
export const examPeriodsList = [
    {
        name: 'Début',
        id: 'd',
    },
    {
        name: 'Fin',
        id: 'f',
    },
];
