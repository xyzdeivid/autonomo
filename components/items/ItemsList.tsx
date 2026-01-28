import { StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import { Item } from '@/types/index'
import MoreInfoWarning from '../common/MoreInfoWarning'
import ContainerHandler from '../common/ContainerHandler'
import { sortItems } from '@/utils/items'
import useGetItemsByCategory from '@/hooks/items/useGetItemsByCategory'

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
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.text}>{getWhatIsItemColumn()}</DataTable.Title>
                    <DataTable.Title style={styles.text}>
                        Valor
                        {isProductCategory ? ' (un)' : null}
                    </DataTable.Title>
                </DataTable.Header>
                <ContainerHandler>
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
                </ContainerHandler>
            </DataTable>
            <MoreInfoWarning />
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center'
    }
})