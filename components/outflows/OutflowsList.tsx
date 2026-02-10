import { Outflow } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { colors } from '@/styles/appColors'
import useGetOutflowsToShowOnTheList from '@/hooks/outflows/useGetOutflowsToShowOnTheList'
import { DataTableItem } from '../common/DataTableItem'

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
                <DataTableItem
                    text='Nome'
                    header={true}
                />
                <DataTableItem
                    text='Data'
                    header={true}
                />
                <DataTableItem
                    text='Valor'
                    header={true}
                />
                <DataTableItem
                    text='#'
                    header={true}
                />
            </DataTable.Header>
            <FlatList
                data={outflows}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTableItem
                            text={getitemName(item)}
                            header={false}
                        />
                        <DataTableItem
                            text={dateFormat(item.date)}
                            header={false}
                        />
                        <DataTableItem
                            text={moneyFormat(item.value)}
                            header={false}
                        />
                        <DataTableItem
                            text='Editar'
                            header={false}
                            onPress={() => deleteOuflow(item)}
                        />
                    </DataTable.Row>
                )}
            />
        </>
    )

}