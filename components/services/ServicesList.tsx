import { StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { DataTable } from 'react-native-paper'
import { DocsContext } from '@/context/DocsContext'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function ServicesList() {

    const [services, setServices] = useContext(DocsContext).services

    const deleteService = (id: string) => {
        const remainingServices = services.filter(service => {
            return service._id !== id
        })
        setServices(remainingServices)
    }

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
                        <DataTable.Cell style={styles.text}><AntDesign onPress={() => deleteService(service._id)} name='close' size={20} color='black' /></DataTable.Cell>
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