import { entries } from '@/mocks/entries'
import { calculateAverageRevenuePerWorkingDay } from './indexRules'


test('', () => {
    expect(calculateAverageRevenuePerWorkingDay(entries)).toBe(80)
})