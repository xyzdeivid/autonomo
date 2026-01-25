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
    category: string
}

export function ItemsList({ setSelectedItemForDeletion, setShowAboutItemCard, items, category }: ItemsListProps) {

    const showAboutItemCard = (service: Item) => {
        setSelectedItemForDeletion(service._id)
        setShowAboutItemCard(true)
    }

    const moneyFormat = (value: number) => {
        const formatedData = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(Number(value)).replace('R$', '')
        return formatedData
    }

    const getWhatIsItemColumn = () => {
        switch (category) {
            case 'product':
                return 'Produto'
            case 'service':
                return 'Serviço'
            case 'budget':
                return 'Serviço'
        }
    }

    return (
        <View>
            <ContainerHandler>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                        <DataTable.Title style={styles.text}>
                            Valor
                            {items[0].category === 'product' ? ' (un)' : null}
                        </DataTable.Title>
                    </DataTable.Header>
                    {sortItems(items).map(current => {
                        return (
                            <DataTable.Row onPress={() => showAboutItemCard(current)} key={current._id}>
                                <DataTable.Cell style={styles.text}>{current._id}</DataTable.Cell>
                                <DataTable.Cell style={styles.text}>
                                    {current.category !== 'budget'
                                        ? moneyFormat(current.value)
                                        : 'Orçamento'}
                                </DataTable.Cell>
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