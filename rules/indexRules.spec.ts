import { dailyRevenue, entries, onlyEntriesWithCustomer, onlyEntriesWithoutCustomer } from '@/mocks/entries'
import {
    calculateMonthlyIncome, calculateAverageRevenuePerWorkingDay,
    calculateItemsAndTheirValuesForTheMonth, getOnlyRevenuesWithCustomers,
    calculateCustomersAndTheirRevenueForTheMonth,
    calculateAmountPerItemPerMonth,
    getRevenuePerDayInTheMonth
} from './indexRules'

test('retornar valor total de receita no mês', () => {
    expect(calculateMonthlyIncome(entries)).toBe(2100)
})

test('retornar média de faturamento por dia trabalhado', () => {
    expect(calculateAverageRevenuePerWorkingDay(entries)).toBe(100)
})

test('retornar itens com seus valores no mês', () => {

    const expected = [
        { productName: 'Serviço 1', totalRevenue: 90 },
        { productName: 'Serviço 2', totalRevenue: 135 },
        { productName: 'Produto 1', totalRevenue: 340 },
        { productName: 'Produto 2', totalRevenue: 350 },
        { productName: 'Orçamentário', totalRevenue: 1185 }
    ]

    expect(calculateItemsAndTheirValuesForTheMonth(entries)).toEqual(expected)

})

test('retornar apenas receitas com clientes', () => {

    expect(getOnlyRevenuesWithCustomers(entries)).toEqual(onlyEntriesWithCustomer)

})

test('retornar clientes com suas receitas no mês', () => {

    const expected = [
        { customerName: 'Carlos', totalRevenue: 190 },
        { customerName: 'Pedro', totalRevenue: 25 },
        { customerName: 'Ana', totalRevenue: 25 },
        { customerName: 'Bruno', totalRevenue: 20 },
        { customerName: 'Mariana', totalRevenue: 70 },
        { customerName: 'Lucas', totalRevenue: 35 },
        { customerName: 'Fernanda', totalRevenue: 105 },
        { customerName: 'Rafael', totalRevenue: 50 },
        { customerName: 'Juliana', totalRevenue: 95 },
        { customerName: 'Camila', totalRevenue: 155 },
        { customerName: 'João', totalRevenue: 235 }
    ]

    expect(calculateCustomersAndTheirRevenueForTheMonth(entries)).toEqual(expected)

    // Caso em que todas as receitas não tem cliente
    expect(calculateCustomersAndTheirRevenueForTheMonth(onlyEntriesWithoutCustomer)).toEqual([])

})

test('retornar quantidade de produtos vendidos e serviços prestados', () => {

    const expected = [
        { itemName: 'Serviço 1', amount: 9 },
        { itemName: 'Serviço 2', amount: 9 },
        { itemName: 'Produto 1', amount: 17 },
        { itemName: 'Produto 2', amount: 14 },
        { itemName: 'Orçamentário', amount: 9 }
    ]

    expect(calculateAmountPerItemPerMonth(entries)).toEqual(expected)

})

test('retornar receita de cada dia no mês', () => {

    expect(getRevenuePerDayInTheMonth(entries)).toEqual(dailyRevenue)

})