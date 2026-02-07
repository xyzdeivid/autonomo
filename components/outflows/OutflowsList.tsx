import { Outflow } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { FlatList, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { colors } from '@/styles/appColors'
import useGetOutflowsToShowOnTheList from '@/hooks/outflows/useGetOutflowsToShowOnTheList'
import { Feather } from '@expo/vector-icons'

interface OutflowsListProps {
    setOutflowForDeletion: React.Dispatch<React.SetStateAction<string>>
    setDeleteOuflowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OutflowsList({ setOutflowForDeletion, setDeleteOuflowForm }: OutflowsListProps) {

    const outflows = useGetOutflowsToShowOnTheList()

    const deleteOuflow = (item: Outflow) => {
        setOutflowForDeletion(item._id)
        setDeleteOuflowForm(true)
    }

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const getitemName = (item: Outflow): string => {

        if (item.amount) return `Reposição de ${item.name}`

        return item.name

    }

    return (
        <>
            <ListInfoTitle
                text='despesas'
                color={colors.outflows.max}
            />
            <DataTable.Header>
                <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                <DataTable.Title style={styles.text}>Data</DataTable.Title>
                <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                <DataTable.Title style={styles.text}>#</DataTable.Title>
            </DataTable.Header>
            <FlatList
                data={outflows}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTable.Cell style={styles.text}>{getitemName(item)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{dateFormat(item.date)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{moneyFormat(item.value)}</DataTable.Cell>
                        <DataTable.Cell
                            style={styles.text}
                            onPress={() => deleteOuflow(item)}
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