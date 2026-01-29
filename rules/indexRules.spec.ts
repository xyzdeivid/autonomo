import { entries } from '@/mocks/entries'
import { calculateMonthlyIncome, calculateAverageRevenuePerWorkingDay } from './indexRules'

test('retornar valor total de receita no mês', () => {
    expect(calculateMonthlyIncome(entries)).toBe(2590)
})

test('retornar média de faturamento por dia trabalhado', () => {
    expect(calculateAverageRevenuePerWorkingDay(entries)).toBe(103.6)
})