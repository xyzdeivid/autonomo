import { useContext, useState, useEffect } from 'react'
import { View } from 'react-native'

import { filterSchedulings } from '@/functions/common'
import { colors } from '@/constants/chartColors'

import { MonthContext } from '@/context/Month'
import { Scheduling } from '@/context/DocsContext'
import InfoTitle from '../common/InfoTitle'
import AnyItemWarning from '../common/AnyItemWarning'
import BudgetsChart from './BudgetsChart'
import BudgetsList from './BudgetsList'

type budgetsT = {
    service: string
    amount: number
    color: string
}[]

interface BudgetsProps {
    schedulings: Scheduling[]
}

export default function Budgets({ schedulings }: BudgetsProps) {

    const [selectedMonth] = useContext(MonthContext)
    const [budgets, setBudgets] = useState<budgetsT>([] as budgetsT)

    const getMostOfferedBudgets = () => {
        let colorIndex = 0
        const budgetsArrays = filterSchedulings(schedulings, selectedMonth).map(scheduling => {
            return scheduling.service._id
        }).flat()
        const budgets: [string, number][] = Array.from(new Set(budgetsArrays))
            .map(service => [service, 0])
        budgetsArrays.forEach(current => {
            for (const service of budgets) {
                if (current === service[0]) {
                    service[1] += 1
                }
            }
        })
        const chartFormat = budgets.map(current => {
            colorIndex++
            return {
                service: current[0],
                amount: current[1],
                color: colors[colorIndex - 1]
            }
        }).sort((a, b) => b.amount - a.amount)
        return chartFormat
    }

    useEffect(() => {
        setBudgets(getMostOfferedBudgets())
    }, [schedulings, selectedMonth])

    return (
        <View style={{ zIndex: -1 }}>
            {budgets[0] && (<View>
                <InfoTitle text='Orçamentários mais prestados' />
                <BudgetsChart budgets={budgets} />
                <BudgetsList budgets={budgets} />
            </View>)}
        </View>
    )

}