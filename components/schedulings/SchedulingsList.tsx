import { Scheduling } from '@/context/DocsContext'
import { AntDesign } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'
import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import ContainerHandler from '../common/ContainerHandler'

interface SchedulingsListProps {
    filteredSchedulings: Scheduling[]
    setSchedulingForDeletion: React.Dispatch<React.SetStateAction<string>>
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

    const deleteScheduling = (id: string) => {
        setSchedulingForDeletion(id)
        setDeleteSchedulingForm(true)
    }

    return (
        <ContainerHandler filteredTargets={filteredSchedulings}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.text}>Serviço</DataTable.Title>
                    <DataTable.Title style={styles.text}>Data</DataTable.Title>
                    <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                    <DataTable.Title style={styles.text}>{''}</DataTable.Title>
                </DataTable.Header>
                {filteredSchedulings.map(scheduling => {
                    return (
                        <DataTable.Row key={scheduling._id}>
                            <DataTable.Cell style={styles.text}>{scheduling.service._id}</DataTable.Cell>
                            <DataTable.Cell style={styles.text}>{dateFormat(scheduling.date)}</DataTable.Cell>
                            <DataTable.Cell style={styles.text}>{moneyFormat(scheduling.service.value)}</DataTable.Cell>
                            <DataTable.Cell>
                                <AntDesign onPress={() => deleteScheduling(scheduling._id)} name='close' size={18} color='darkred' />
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
            </DataTable>
        </ContainerHandler>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})