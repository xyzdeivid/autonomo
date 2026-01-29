import { entries, getOnlyServicesAndBudgetsEntriesMock } from '@/mocks/entries'
import { calculateMonthlyIncome, calculateAverageRevenuePerWorkingDay, getOnlyServicesAndBudgetsEntries, calculateItemsAndTheirValuesForTheMonth } from './indexRules'

test('retornar valor total de receita no mês', () => {
    expect(calculateMonthlyIncome(entries)).toBe(2590)
})

test('retornar média de faturamento por dia trabalhado', () => {
    expect(calculateAverageRevenuePerWorkingDay(entries)).toBe(103.6)
})

test('retornar apenas serviços e orçamentários', () => {

    const expected = [
        { _id: '1', date: '2026-01-01', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
        { _id: '2', date: '2026-01-02', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
        { _id: '6', date: '2026-01-06', serviceId: 'Serviço 1', serviceCategory: 'service', serviceValue: 10, serviceIsThereAmount: false },
        { _id: '7', date: '2026-01-07', serviceId: 'Orçamentário', serviceCategory: 'budget', serviceValue: 55, serviceIsThereAmount: false },
        { _id: '9', date: '2026-01-09', serviceId: 'Serviço 2', serviceCategory: 'service', serviceValue: 15, serviceIsThereAmount: false },
    ]

    expect(getOnlyServicesAndBudgetsEntries(getOnlyServicesAndBudgetsEntriesMock)).toEqual(expected)

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