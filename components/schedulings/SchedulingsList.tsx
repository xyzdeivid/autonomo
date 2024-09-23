import { DocsContext } from '@/context/DocsContext'
import { AntDesign } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'

interface SchedulingsListProps {
    setSchedulingForDeletion: React.Dispatch<React.SetStateAction<string>>
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SchedulingsList({ setSchedulingForDeletion, setDeleteSchedulingForm }: SchedulingsListProps) {

    const [schedulings] = useContext(DocsContext).schedulings

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
        <DataTable style={styles.container}>
            <DataTable.Header>
                <DataTable.Title style={styles.text}>Serviço</DataTable.Title>
                <DataTable.Title style={styles.text}>Data</DataTable.Title>
                <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                <DataTable.Title style={styles.text}>{''}</DataTable.Title>
            </DataTable.Header>
            {schedulings.map(scheduling => {
                return (
                    <DataTable.Row key={scheduling._id}>
                        <DataTable.Cell style={styles.text}>{scheduling.service._id}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{dateFormat(scheduling.date)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{moneyFormat(scheduling.service.value)}</DataTable.Cell>
                        <DataTable.Cell>
                            <AntDesign onPress={() => deleteScheduling(scheduling._id)} name='close' size={18} color='black' />
                        </DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14
    },
    text: {
        justifyContent: 'center'
    }
})