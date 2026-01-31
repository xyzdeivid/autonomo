import { entries, onlyEntriesWithCustomer, onlyEntriesWithoutCustomer } from '@/mocks/entries'
import {
    calculateMonthlyIncome, calculateAverageRevenuePerWorkingDay,
    calculateItemsAndTheirValuesForTheMonth, getOnlyRevenuesWithCustomers,
    calculateCustomersAndTheirRevenueForTheMonth,
    calculateAmountPerItemPerMonth
} from './indexRules'

test('retornar valor total de receita no mês', () => {
    expect(calculateMonthlyIncome(entries)).toBe(2590)
})

test('retornar média de faturamento por dia trabalhado', () => {
    expect(calculateAverageRevenuePerWorkingDay(entries)).toBe(103.6)
})

test('retornar itens com seus valores no mês', () => {

    const expected = [
        { productName: 'Serviço 1', totalRevenue: 100 },
        { productName: 'Serviço 2', totalRevenue: 150 },
        { productName: 'Produto 1', totalRevenue: 460 },
        { productName: 'Produto 2', totalRevenue: 575 },
        { productName: 'Orçamentário', totalRevenue: 1305 }
    ]

    expect(calculateItemsAndTheirValuesForTheMonth(entries)).toEqual(expected)

})

test('retornar apenas receitas com clientes', () => {

    expect(getOnlyRevenuesWithCustomers(entries)).toEqual(onlyEntriesWithCustomer)

})

test('retornar clientes com suas receitas no mês', () => {

    const expected = [
        { customerName: 'Carlos', totalRevenue: 190 },
        { customerName: 'Ana', totalRevenue: 145 },
        { customerName: 'Bruno', totalRevenue: 35 },
        { customerName: 'Mariana', totalRevenue: 70 },
        { customerName: 'Lucas', totalRevenue: 60 },
        { customerName: 'Fernanda', totalRevenue: 205 },
        { customerName: 'Rafael', totalRevenue: 60 },
        { customerName: 'Juliana', totalRevenue: 95 },
        { customerName: 'Pedro', totalRevenue: 85 },
        { customerName: 'Camila', totalRevenue: 195 },
        { customerName: 'João', totalRevenue: 235 }
    ]

    expect(calculateCustomersAndTheirRevenueForTheMonth(entries)).toEqual(expected)

    // Caso em que todas as receitas não tem cliente
    expect(calculateCustomersAndTheirRevenueForTheMonth(onlyEntriesWithoutCustomer)).toEqual([])

})

test('retornar quantidade de produtos vendidos e serviços prestados', () => {

    const expected = [
        { itemName: 'Serviço 1', amount: 10 },
        { itemName: 'Serviço 2', amount: 10 },
        { itemName: 'Produto 1', amount: 23 },
        { itemName: 'Produto 2', amount: 23 },
        { itemName: 'Orçamentário', amount: 10 }
    ]

    expect(calculateAmountPerItemPerMonth(entries)).toEqual(expected)

})