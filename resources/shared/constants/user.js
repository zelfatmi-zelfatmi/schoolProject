export const UserStatusEnum = {
    ACTIVE: {
        id: '1',
        name: 'Actif',
        style: 'bg-gradient-to-tl from-green-100 to-green-50 text-green-600',
    },
    INACTIVE: {
        id: '2',
        name: 'Archiver',
        style: 'bg-gradient-to-tl from-gray-100 to-gray-50 text-black-600',
    },
    INPROGRESS: {
        id: '3',
        name: 'In Progress',
        style: 'bg-gradient-to-tl from-blue-100 to-blue-50 text-blue-600',
    },
};

export const EleveCpfEnum = {
    Yes: {
        id: 1,
        name: 'Oui',
        style: 'bg-gradient-to-tl from-green-100 to-green-50 text-green-600',
    },
    NO: {
        id: 0,
        name: 'Non',
        style: 'bg-gradient-to-tl from-red-200 to-red-100 !text-red-600',
    },
};
const BOIT_AUTO = 1;
const BOIT_MANUAL = 0;

export const EleveBoiteEnum = {
    AUTO: {
        id: BOIT_AUTO,
        name: 'Auto',
        shortName: 'BA',
        style: 'bg-gradient-to-tl from-violet-100 to-violet-50 text-violet-600',
    },
    MANUAL: {
        id: BOIT_MANUAL,
        name: 'Manual',
        shortName: 'BM',
        style: 'bg-gradient-to-tl from-blue-100 to-blue-50 !text-blue-600',
    },
};
export const boiteType = {
    [BOIT_AUTO]: EleveBoiteEnum.AUTO,
    [BOIT_MANUAL]: EleveBoiteEnum.MANUAL,
};
export const UserRolesEnum = {
    ADMIN: {
        id: 1,
        name: 'Admin',
    },
    ELEVE: {
        id: 2,
        name: 'Eleve',
    },
    MONITEUR: {
        id: 3,
        name: 'Moniteur',
    },
};
export const SoldeTypeEnum = {
    ACTIVE: {
        id: 1,
        name: 'Actif',
        style: 'bg-gradient-to-tl from-blue-100 to-blue-50 text-blue-600',
    },
    PENDING: {
        id: 2,
        name: 'Pending',
        style: 'bg-gradient-to-tl from-green-100 to-green-50 text-green-600',
    },
    INACTIVE: {
        id: 3,
        name: 'Inactive',
        style: 'bg-gradient-to-tl from-red-100 to-red-50 text-red-600',
    },
};
