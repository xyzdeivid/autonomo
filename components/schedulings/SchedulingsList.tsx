import { Scheduling } from '@/context/DocsContext'
import { format, parseISO } from 'date-fns'
import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import ContainerHandler from '../common/ContainerHandler'
import MoreInfoWarning from '../common/MoreInfoWarning'

interface SchedulingsListProps {
    filteredSchedulings: Scheduling[]
    setSchedulingForDeletion: React.Dispatch<React.SetStateAction<Scheduling>>
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SchedulingsList({ filteredSchedulings, setSchedulingForDeletion, setDeleteSchedulingForm }: SchedulingsListProps) {

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    const deleteScheduling = (scheduling: Scheduling) => {
        setSchedulingForDeletion(scheduling)
        setDeleteSchedulingForm(true)
    }

    return (
        <View>
            <ContainerHandler filteredTargets={filteredSchedulings}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                        <DataTable.Title style={styles.text}>Data</DataTable.Title>
                    </DataTable.Header>
                    {filteredSchedulings.map(scheduling => {
                        return (
                            <DataTable.Row onPress={() => deleteScheduling(scheduling)} key={scheduling._id}>
                                <DataTable.Cell style={styles.text}>{scheduling.service._id}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{dateFormat(scheduling.date)}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </ContainerHandler>
            <MoreInfoWarning text='Para mais informações sobre a venda/agendamento, basta clicar em cima!' />
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})