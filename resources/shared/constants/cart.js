export const CartStatusEnum = {
    PENDING: {
        id: 1,
        name: 'En attente',
        style: 'bg-gradient-to-tl from-orange-100/10 to-orange-50 text-orange-600',
    },
    PAID: {
        id: 2,
        name: 'Payé',
        style: 'bg-gradient-to-tl from-green-100 to-green-50 text-green-600',
    },
    CANCELLED: {
        id: 3,
        name: 'Annulé',
        style: 'bg-gradient-to-tl from-red-100 to-red-50 text-red-600',
    },
    REFUNDED: {
        id: 4,
        name: 'Remboursé',
        style: 'bg-gradient-to-tl from-yellow-100 to-yellow-50 text-yellow-600',
    },
    ABANDONED: {
        id: 5,
        name: 'Abandonné',
        style: 'bg-gradient-to-tl from-violet-100 to-violet-50 text-violet-600',
    },
    EXPIRED: {
        id: 6,
        name: 'Expiré',
        style: 'bg-gradient-to-tl from-gray-100 to-gray-50 text-gray-600',
    },
};
