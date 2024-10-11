import { StyleSheet, View } from 'react-native'
import { useContext } from 'react'
import { DataTable } from 'react-native-paper'
import { DocsContext, Service } from '@/context/DocsContext'
import MoreInfoWarning from '../common/MoreInfoWarning'

interface ServicesListProps {
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    services: Service[]
}

export default function ServicesList({ setServiceForDeletion, setDeleteServiceForm, services }: ServicesListProps) {

    const deleteService = (service: Service) => {
        setServiceForDeletion(service)
        setDeleteServiceForm(true)
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.text}>Nome</DataTable.Title>
                    <DataTable.Title style={styles.text}>Valor</DataTable.Title>
                </DataTable.Header>
                {services.map(service => {
                    return (
                        <DataTable.Row onPress={() => deleteService(service)} key={service._id}>
                            <DataTable.Cell style={styles.text}>{service._id}</DataTable.Cell>
                            <DataTable.Cell style={styles.text}>{moneyFormat(service.value)}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
            </DataTable>
            <MoreInfoWarning text='Para mais informações sobre o produto/serviço, basta clicar em cima!' />
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})