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

    const deleteScheduling = (scheduling: Scheduling) => {
        setSchedulingForDeletion(scheduling)
        setDeleteSchedulingForm(true)
    }

    return (
        <View>
            <ContainerHandler filteredTargets={filteredSchedulings}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Entrada</DataTable.Title>
                    </DataTable.Header>
                    {filteredSchedulings.map(scheduling => {
                        return (
                            <DataTable.Row onPress={() => deleteScheduling(scheduling)} key={scheduling._id}>
                                <DataTable.Cell style={styles.text}>{scheduling.service._id} ({dateFormat(scheduling.date)})</DataTable.Cell>
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