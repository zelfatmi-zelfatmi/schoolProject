export const formatPrice = (value) => {
    return new Intl.NumberFormat('fr', {symbol: "€", currency: 'EUR'}).format(value) + ' €'
}
