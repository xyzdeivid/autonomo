import { Entry } from '@/types/index'
import { format, parseISO } from 'date-fns'
import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import ContainerHandler from '../common/ContainerHandler'
import MoreInfoWarning from '../common/MoreInfoWarning'
import { moneyFormat } from '@/utils/common'
import ListInfoTitle from '../common/ListInfoTitle'
import { orderSchedulings } from '@/utils/schedulings'
import { colors } from '@/constants/appColors'

interface SchedulingsListProps {
    filteredSchedulings: Entry[]
    setSelectedEntryForDeletion: React.Dispatch<React.SetStateAction<string>>
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SchedulingsList({ filteredSchedulings, setSelectedEntryForDeletion, setDeleteSchedulingForm }: SchedulingsListProps) {

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }

    const deleteScheduling = (scheduling: Entry) => {
        setSelectedEntryForDeletion(scheduling._id)
        setDeleteSchedulingForm(true)
    }

    return (
        <View>
            <ListInfoTitle
                text='receitas'
                color={colors.entries.max}
            />
            <ContainerHandler filteredTargets={filteredSchedulings}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Cliente</DataTable.Title>
                        <DataTable.Title style={styles.text}>Item</DataTable.Title>
                        <DataTable.Title style={styles.text}>Data</DataTable.Title>
                        <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                    </DataTable.Header>
                    {orderSchedulings(filteredSchedulings).map(scheduling => {
                        return (
                            <DataTable.Row onPress={() => deleteScheduling(scheduling)} key={scheduling._id}>
                                <DataTable.Cell style={styles.text}>
                                    {
                                        scheduling.customer
                                            ? scheduling.customer
                                            : '*'
                                    }
                                </DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{scheduling.serviceId}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{dateFormat(scheduling.date)}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>{moneyFormat(scheduling.serviceValue)}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </ContainerHandler>
            <MoreInfoWarning />
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})