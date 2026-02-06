import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/types/index'
import MoreInfoWarning from '../common/MoreInfoWarning'
import { sortItems } from '@/utils/items'
import useGetItemsByCategory from '@/hooks/items/useGetItemsByCategory'
import { ListContainer } from '../common/ListContainer'

interface ItemsListProps {
    setSelectedItemForDeletion: React.Dispatch<React.SetStateAction<string>>
    setShowAboutItemCard: React.Dispatch<React.SetStateAction<boolean>>
    category: string
}

export function ItemsList({ setSelectedItemForDeletion, setShowAboutItemCard, category }: ItemsListProps) {

    const { items, isProductCategory } = useGetItemsByCategory(category)

    const showAboutItemCard = (item: Item) => {
        setSelectedItemForDeletion(item._id)
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
        <ListContainer>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                    <DataTable.Title style={styles.text}>
                        Valor
                        {isProductCategory ? ' (un)' : null}
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
            <MoreInfoWarning />
        </ListContainer>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})