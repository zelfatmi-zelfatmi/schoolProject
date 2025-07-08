export const ProductTypeEnum = {
    CODE: {
        id: 1,
        name: 'CODE',
        style: 'bg-gradient-to-tl from-teal-200 to-teal-100 text-teal-800',
    },
    CONDUITE: {
        id: 2,
        name: 'CONDUITE',
        style: 'bg-gradient-to-tl from-blue-200 to-blue-100 text-blue-800',
    },
};

export const ProductOffreTypeEnum = {
    EVALUATION: {
        id: 1,
        name: 'Forfaits Boîte Manuelle',
        shortName: 'FBM',
        style: 'bg-gradient-to-tl from-blue-100 to-blue-50 text-blue-600',
    },
    EXAMEN: {
        id: 2,
        name: 'Forfait Code',
        shortName: 'FC',
        style: 'bg-gradient-to-tl from-green-100 to-green-50 text-green-600',
    },
    INSCRIPTION: {
        id: 3,
        name: 'Forfaits Boîte Automatique',
        shortName: 'FBA',
        style: 'bg-gradient-to-tl from-red-100 to-red-50 text-red-600',
    },
    CODE: {
        id: 4,
        name: 'Forfaits Examen',
        shortName: 'FE',
        style: 'bg-gradient-to-tl from-yellow-100 to-yellow-50 text-yellow-600',
    },
    SUPERVISES: {
        id: 5,
        name: 'Forfaits inscription NEPH/Création Permis',
        shortName: 'FINEPH/CP',
        style: 'bg-gradient-to-tl from-violet-100 to-violet-50 text-violet-600',
    },
};

export const isAutoEnum = {
    ACTIVE: {
        id: 1,
        name: 'Auto',
        style: 'bg-gradient-to-tl from-green-200 to-green-100 text-green-800',
    },
    INACTIVE: {
        id: 0,
        name: 'Manual',
        style: 'bg-gradient-to-tl from-yellow-200 to-yellow-100 text-yellow-800',
    },
};
