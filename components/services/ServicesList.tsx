import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import { DataTable } from 'react-native-paper'
import { DocsContext } from '@/context/DocsContext'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function ServicesList() {

    const [services] = useContext(DocsContext).services

    return (
        <DataTable style={styles.container}>
            <DataTable.Header>
                <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                <DataTable.Title style={styles.text}>{''}</DataTable.Title>
            </DataTable.Header>
            {services.map(service => {
                return (
                    <DataTable.Row>
                        <DataTable.Cell style={styles.text}>{service._id}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{service.value}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}><AntDesign name='close' size={20} color='black' /></DataTable.Cell>
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