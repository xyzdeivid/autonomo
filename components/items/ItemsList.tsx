import { FlatList, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/types/index'
import useGetItemsByCategory from '@/hooks/items/useGetItemsByCategory'
import { Feather } from '@expo/vector-icons'

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
        <>
            <DataTable.Header>
                <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                <DataTable.Title style={styles.text}>
                    Valor
                    {isProductCategory ? ' (un)' : null}
                </DataTable.Title>
                <DataTable.Title style={styles.text}>#</DataTable.Title>
            </DataTable.Header>
            <FlatList
                data={items}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTable.Cell style={styles.text}>{item._id}</DataTable.Cell>
                        <DataTable.Cell style={styles.text}>
                            {item.category !== 'budget'
                                ? moneyFormat(item.value)
                                : 'Orçamento'}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={styles.text}
                            onPress={() => showAboutItemCard(item)}
                        >
                            <Feather name='edit' size={16} color='black' />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            />
        </>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})