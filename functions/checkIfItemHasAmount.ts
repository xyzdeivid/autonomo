export const checkIfItemHasAmount = (category: string, resale: boolean, stock: boolean) => {

    if (category === 'product') {

        if (resale || stock) return true

    }

    return false

}