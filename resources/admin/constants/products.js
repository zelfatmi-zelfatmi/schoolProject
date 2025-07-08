const FORFAIT_BOITE_MANUAL = '1';
const FORFAIT_CODE = '2';
const FORFAIT_BOITE_AUTO = '3';
const FORFAIT_EXAMEN = '4';
const FORFAIT_NEPH_OR_PERMIS = '5';

export const hoursColors = {
    [FORFAIT_BOITE_MANUAL]: 'bg-blue-500',
    [FORFAIT_BOITE_AUTO]: 'bg-violet-500',
    [FORFAIT_EXAMEN]: 'bg-yellow-500 !text-gray-900',
    // [FORFAIT_PREPA_EXAMEN]: 'bg-orange-500',
    [FORFAIT_CODE]: 'bg-slate-500',
    [FORFAIT_NEPH_OR_PERMIS]: 'bg-indigo-500',
    //  "Boite manuelle": 'BLEU',
    //  "Boite automatique": 'VIOLET',
    //  "EXAMEN ": 'JAUNE',
    //  "Prepa Examen": 'ORANGE',
};
export const categoryNameById = {
    [FORFAIT_BOITE_MANUAL]: 'Forfait Code',
    [FORFAIT_BOITE_AUTO]: 'Forfait Boite Manuelle',
    [FORFAIT_EXAMEN]: 'Forfait Boite Auto',
    // [FORFAIT_PREPA_EXAMEN]: 'Forfait Examen',
    [FORFAIT_CODE]: 'Forfait Preparation Examen',
    [FORFAIT_NEPH_OR_PERMIS]: 'Forfait inscription NEPH/Creation Permis',

    //  "Boite manuelle": 'BLEU',
    //  "Boite automatique": 'VIOLET',
    //  "EXAMEN ": 'JAUNE',
    //  "Prepa Examen": 'ORANGE',
};
export const INDIFINI = 'Indéfini';
