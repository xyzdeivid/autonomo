import { StyleSheet } from 'react-native'
import { useContext } from 'react'
import { DataTable } from 'react-native-paper'
import { DocsContext, Service } from '@/context/DocsContext'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface ServicesListProps {
    setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setServiceForEdition: React.Dispatch<React.SetStateAction<string>>
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ServicesList({ setEditServiceForm, setServiceForEdition, setServiceForDeletion, setDeleteServiceForm }: ServicesListProps) {

    const [services] = useContext(DocsContext).services

    const deleteService = (service: Service) => {
        setServiceForDeletion(service)
        setDeleteServiceForm(true)
    }

    const editService = (id: string) => {
        setServiceForEdition(id)
        setEditServiceForm(true)
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
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
                    <DataTable.Row onPress={() => deleteService(service)} key={service._id}>
                        <DataTable.Cell style={styles.text}>{service._id}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>{moneyFormat(service.value)}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>
                            <FontAwesome6 onPress={() => editService(service._id)} name='edit' size={18} color='black' />
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