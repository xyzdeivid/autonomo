import { StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/context/DocsContext'
import MoreInfoWarning from '../common/MoreInfoWarning'
import ContainerHandler from '../common/ContainerHandler'
import { orderServices } from '@/functions/services'

interface ServicesListProps {
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Item>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    services: Item[]
}

export default function ServicesList({ setServiceForDeletion, setDeleteServiceForm, services }: ServicesListProps) {

    const deleteService = (service: Item) => {
        setServiceForDeletion(service)
        setDeleteServiceForm(true)
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    const getWhatIsItemColumn = () => {
        switch (services[0].category) {
            case 'product':
                return 'Produto'
            case 'service':
                return 'Serviço'
            case 'budget':
                return 'Orçamentário'
        }
    }

    return (
        <View>
            <ContainerHandler filteredTargets={services}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                        {services[0].category !== 'budget' && (
                            <DataTable.Title style={styles.text}>
                                Valor 
                                {services[0].category === 'product' ? ' (un)': null}
                            </DataTable.Title>
                        )}
                    </DataTable.Header>
                    {orderServices(services).map(service => {
                        return (
                            <DataTable.Row onPress={() => deleteService(service)} key={service._id}>
                                <DataTable.Cell style={styles.text}>{service._id}</DataTable.Cell>
                                {service.category !== 'budget' && (
                                    <DataTable.Cell style={styles.text}>{moneyFormat(service.value)}</DataTable.Cell>
                                )}
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