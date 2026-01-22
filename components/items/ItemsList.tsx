import { StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/types/index'
import MoreInfoWarning from '../common/MoreInfoWarning'
import ContainerHandler from '../common/ContainerHandler'
import { sortItems } from '@/utils/items'

interface ItemsListProps {
    setSelectedItemForDeletion: React.Dispatch<React.SetStateAction<string>>
    setShowAboutItemCard: React.Dispatch<React.SetStateAction<boolean>>
    items: Item[]
}

export function ItemsList({ setSelectedItemForDeletion, setShowAboutItemCard, items }: ItemsListProps) {

    const deleteService = (service: Item) => {
        setSelectedItemForDeletion(service._id)
        setShowAboutItemCard(true)
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    const getWhatIsItemColumn = () => {
        switch (items[0].category) {
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
            <ContainerHandler filteredTargets={items}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                        {items[0].category !== 'budget' && (
                            <DataTable.Title style={styles.text}>
                                Valor
                                {items[0].category === 'product' ? ' (un)' : null}
                            </DataTable.Title>
                        )}
                    </DataTable.Header>
                    {sortItems(items).map(current => {
                        return (
                            <DataTable.Row onPress={() => deleteService(current)} key={current._id}>
                                <DataTable.Cell style={styles.text}>{current._id}</DataTable.Cell>
                                {current.category !== 'budget' && (
                                    <DataTable.Cell style={styles.text}>{moneyFormat(current.value)}</DataTable.Cell>
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