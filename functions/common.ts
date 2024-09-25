export const moneyFormat = (value: number) => {
    const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(Number(value)).replace('R$', '')
    return formatedData
}