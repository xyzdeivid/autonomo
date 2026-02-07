import { Entry } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { FlatList, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { colors } from '@/styles/appColors'
import useGetEntriesToShowOnTheList from '@/hooks/entries/useGetMonthEntries'
import Feather from '@expo/vector-icons/Feather'

interface SchedulingsListProps {
    setSelectedEntryForDeletion: React.Dispatch<React.SetStateAction<string>>
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SchedulingsList({ setSelectedEntryForDeletion, setDeleteSchedulingForm }: SchedulingsListProps) {

    const entries = useGetEntriesToShowOnTheList()

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const deleteScheduling = (scheduling: Entry) => {
        setSelectedEntryForDeletion(scheduling._id)
        setDeleteSchedulingForm(true)
    }

    return (
        <>
            <ListInfoTitle
                text='receitas'
                color={colors.entries.max}
            />
            <DataTable.Header>
                <DataTable.Title style={styles.text}>Cliente</DataTable.Title>
                <DataTable.Title style={styles.text}>Item</DataTable.Title>
                <DataTable.Title style={styles.text}>Data</DataTable.Title>
                <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                <DataTable.Title style={styles.text}>#</DataTable.Title>
            </DataTable.Header>
            <FlatList
                data={entries}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTable.Cell style={styles.text}>
                            {
                                item.customer
                                    ? item.customer
                                    : '*'
                            }
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{item.serviceId}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{dateFormat(item.date)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{moneyFormat(item.serviceValue)}</DataTable.Cell>
                        <DataTable.Cell
                            style={styles.text}
                            onPress={() => deleteScheduling(item)}
                        >
                            <Feather name='edit' size={16} color='black' />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            />
        </>
    )

}

const styles = StyleSheet.create({

    text: {
        justifyContent: 'center'
    }

})