import { isStockEnough, newProductStockOnEditEntryAmount } from './entryRules'

describe('isStockEnough', () => {

    test('retorna false quando quantidade é maior que o estoque', () => {
        expect(isStockEnough(10, 11)).toBe(false)
    })

    test('retorna true quando quantidade é menor que o estoque', () => {
        expect(isStockEnough(10, 9)).toBe(true)
    })

    test('retorna true quando quantidade é igual o estoque', () => {
        expect(isStockEnough(10, 10)).toBe(true)
    })

    test('retorna false quando o estoque é zero', () => {
        expect(isStockEnough(0, 1)).toBe(false)
    })

})

describe('newProductStockOnEditEntryAmount', () => {

    test('editando com estoque zerado', () => {
        expect(newProductStockOnEditEntryAmount(9, 10, 0)).toBe(1)
    })

    test('zerando estoque ao editar', () => {
        expect(newProductStockOnEditEntryAmount(10, 9, 1)).toBe(0)
    })

})