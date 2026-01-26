import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'

export default function useGetCategoriesAmount() {

    const [items] = useContext(DocsContext).items

    let categories: string[] = []

    items.forEach(current => {

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