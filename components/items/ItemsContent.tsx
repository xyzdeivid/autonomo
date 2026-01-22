import { View } from 'react-native'
import { SelectCategoryButton } from './SelectCategoryButton'
import { ItemsList } from './ItemsList'

import { DocsContext } from '@/context/DocsContext'
import { Item } from '@/types'
import { useContext } from 'react'

interface ItemsContentProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    items: Item[]
    setSelectedItemForDeletion: React.Dispatch<React.SetStateAction<string>>
    setShowAboutItemCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function ItemsContent({ category, setCategory,
    items, setSelectedItemForDeletion, setShowAboutItemCard }: ItemsContentProps) {

    const [allItems] = useContext(DocsContext).items

    const categoriesAmount = () => {

        let categories: string[] = []

        allItems.forEach(current => {

            if (!categories.find(category => category === current.category)) {
                categories.push(current.category)
            }

        })

        categories = categories.map(current => {
            if (current === 'budget') return 'service'
            return current
        })

        categories = [...new Set(categories)]

        return categories.length

    }

    return (
        <View>
            {categoriesAmount() > 1 && (
                <SelectCategoryButton
                    category={category}
                    setCategory={setCategory}
                />
            )}
            {items[0] && (
                <ItemsList
                    setSelectedItemForDeletion={setSelectedItemForDeletion}
                    setShowAboutItemCard={setShowAboutItemCard}
                    items={items}
                    category={category}
                />
            )}
        </View>
    )

}