import { DocsContext } from '@/context/DocsContext'
import { Item } from '@/types'
import { sortItems } from '@/utils/items'
import { useContext } from 'react'

export default function useGetItemsByCategory(category: string) {

    const [items] = useContext(DocsContext).items

    function getItemsByCategory(): Item[] {

        switch (category) {
            case 'product':
                return items.filter(current =>
                    current.category === 'product'
                )
            case 'service':
                return items.filter(current =>
                    current.category !== 'product'
                )
            case 'budget':
                return items.filter(current =>
                    current.category !== 'product'
                )
            default:
                return []
        }

    }

    function isProductCategory(): boolean {
        return category === 'product'
    }

    return {
        items: sortItems(getItemsByCategory()),
        isProductCategory: isProductCategory()
    }

}