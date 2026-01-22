import { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

import { getItemsByCategory } from '@/utils/items'

import { DocsContext } from '@/context/DocsContext'

import AddItemButton from '@/components/common/AddItemButton'
import { AddItemForm } from '@/components/items/AddItemForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

import AboutItemCard from '@/components/items/AboutItemCard'
import { ItemsContent } from '@/components/items/ItemsContent'
import useDeleteItem from '@/hooks/useDeleteItem'
import { Item } from '@/types'
import { colors } from '@/styles/appColors'
import { showErrorAtSubmitData } from '@/utils/common'
import { ItemCategoryCard } from '@/components/items/ItemCategoryCard'

export default function Items() {

    const appDocs = useContext(DocsContext)
    const [items] = appDocs.items
    const [showItemCategoryCard, setShowItemCategoryCard] = useState(false)
    const [showaddItemForm, setShowAddItemForm] = useState(false)
    const [showAboutItemCard, setShowAboutItemCard] = useState(false)
    const [selectedItemForDeletion, setSelectedItemForDeletion] = useState('')

    // Malabarismo por que atualmente o id é o nome :)
    const itemForDeletion: Item = items.find(e => e._id === selectedItemForDeletion) || {} as Item

    const [currentPage] = appDocs.currentPage
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)

    const [newItemCategory, setNewItemCategory] = useState('')

    const deleteItem = useDeleteItem().deleteItem

    useEffect(() => {
        if (currentPage !== 'services') {
            setShowAddItemForm(false)
            setShowAboutItemCard(false)
        }
    }, [currentPage])

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', () => {
            setShowAddItemForm(false)
            return null
        })

        if (items.length > 0) {
            setCategory(items[0].category)
        }

    }, [items])

    const deleteService = async (id: string) => {

        setLoadingScreen(true)

        const result = await deleteItem(id)

        if (!result.success) showErrorAtSubmitData(result.error)

        setShowAboutItemCard(false)
        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    items[0]
                        ? <ItemsContent
                            category={category}
                            setCategory={setCategory}
                            items={getItemsByCategory(items, category)}
                            setSelectedItemForDeletion={setSelectedItemForDeletion}
                            setShowAboutItemCard={setShowAboutItemCard}
                        />
                        : <AnyInfoWarning
                            text='listamos todos os seus produtos ou serviços.'
                            titleBgColor={colors.items.max}
                            textBgColor={colors.items.min}
                        />
                }
                <AddItemButton
                    iconColor={colors.items.max}
                    bgColor={colors.items.min}
                    borderColor={colors.items.midMin}
                    onPress={() => setShowItemCategoryCard(true)}
                />
                {
                    showItemCategoryCard
                    && <ItemCategoryCard
                        setShowItemCategoryCard={setShowItemCategoryCard}
                        setCategory={setNewItemCategory}
                        setShowAddItemForm={setShowAddItemForm}
                    />
                }
                {
                    showaddItemForm
                    && <AddItemForm
                        categorySelected={newItemCategory}
                        setShowItemCategoryCard={setShowItemCategoryCard}
                        setShowAddItemForm={setShowAddItemForm}
                    />
                }
                {
                    showAboutItemCard && (
                        <AboutItemCard
                            item={itemForDeletion}
                            deleteFunction={deleteService}
                            setFormOff={setShowAboutItemCard}
                        />
                    )
                }
            </Container>
        </>
    )

}