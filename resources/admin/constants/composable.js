export  const totalProductsPrice =(items)=>{
    let totalPrice = 0
    if (items){
    items.map((item)=>{
        totalPrice += parseInt(item.product.prix)
    })
    }
    return totalPrice
}

export  const getTotalSold = (items)=>{
    let totalSold = 0
    if (items){
        items.map((item)=>{
            totalSold += item.product.solde
        })
    }
    return totalSold
}
export function truncateText(text) {
    if (text.length > 20) {
        return text.substring(0, 20) + '...';
    } else {
        return text;
    }
}
export const checkIfValid = (data)=>{
   return  Object.values(data).some(value => !value)
}
