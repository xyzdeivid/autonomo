import { View } from 'react-native'
import { SelectCategoryButton } from './SelectCategoryButton'
import { ItemsList } from './ItemsList'

import useGetCategoriesAmount from '@/hooks/items/useGetCategoriesAmount'

interface ItemsContentProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setSelectedItemForDeletion: React.Dispatch<React.SetStateAction<string>>
    setShowAboutItemCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function ItemsContent({ category, setCategory,
    setSelectedItemForDeletion, setShowAboutItemCard }: ItemsContentProps) {

        const categoriesAmount = useGetCategoriesAmount()

    return (
        <View style={{ flex: 1 }}>
            {categoriesAmount > 1 && (
                <SelectCategoryButton
                    category={category}
                    setCategory={setCategory}
                />
            )}
            <ItemsList
                setSelectedItemForDeletion={setSelectedItemForDeletion}
                setShowAboutItemCard={setShowAboutItemCard}
                category={category}
            />
        </View>
    )

}