import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Service } from '@/context/DocsContext'
import MoreInfoWarning from '../common/MoreInfoWarning'
import ContainerHandler from '../common/ContainerHandler'

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

    const checkIfIsBudget = (service: Service) => {
        return service.category === 'budget'
        ? ''
        : ` (${moneyFormat(service.value).replace(/\s+/g, '')})`
    }

    return (
        <>
            <ContainerHandler filteredTargets={services}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>Item</DataTable.Title>
                    </DataTable.Header>
                    {services.map(service => {
                        return (
                            <DataTable.Row onPress={() => deleteService(service)} key={service._id}>
                                <DataTable.Cell style={styles.text}>{service._id}{checkIfIsBudget(service)}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
            </ContainerHandler>
            <MoreInfoWarning />
        </>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})