import { FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/types/index'
import useGetItemsByCategory from '@/hooks/items/useGetItemsByCategory'
import { DataTableItem } from '../common/DataTableItem'
import { DataTableEditButton } from '../common/DataTableEditButton'

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
            default:
                return 'Desconhecido'
        }
    }

    return (
        <>
            <DataTable.Header>
                <DataTableItem
                    text={getWhatIsItemColumn()}
                    header={true}
                />
                <DataTableItem
                    text={`Valor ${isProductCategory ? '(un)' : ''}`}
                    header={true}
                />
                <DataTableItem
                    text='#'
                    header={true}
                />
            </DataTable.Header>
            <FlatList
                data={items}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <DataTable.Row>
                        <DataTableItem
                            text={item._id}
                            header={false}
                        />
                        <DataTableItem
                            text={item.category !== 'budget' ? moneyFormat(item.value) : 'Orçamento'}
                            header={false}
                        />
                        <DataTableEditButton
                            onPress={() => showAboutItemCard(item)}
                        />
                    </DataTable.Row>
                )}
            />
        </>
    )

}