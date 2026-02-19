import { Entry } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { colors } from '@/styles/appColors'
import useGetEntriesToShowOnTheList from '@/hooks/entries/useGetMonthEntries'
import { DataTableItem } from '../common/DataTableItem'
import { DataTableEditButton } from '../common/DataTableEditButton'

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
                <DataTableItem
                    text='Cliente'
                    header={true}
                />
                <DataTableItem
                    text='Item'
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
                data={entries}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTableItem
                            text={item.customer ? item.customer : '*'}
                            header={false}
                        />
                        <DataTableItem
                            text={item.serviceId}
                            header={false}
                        />
                        <DataTableItem
                            text={dateFormat(item.date)}
                            header={false}
                        />
                        <DataTableItem
                            text={moneyFormat(item.serviceValue)}
                            header={false}
                        />
                        <DataTableEditButton
                            onPress={() => deleteScheduling(item)}
                        />
                    </DataTable.Row>
                )}
            />
        </>
    )

}