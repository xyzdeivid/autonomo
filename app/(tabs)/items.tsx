import { useContext, useEffect, useRef, useState } from 'react'

import { getCategoryOnDeletedItem, getCategoryOnTheFirstRun } from '@/utils/items'

import { DocsContext } from '@/context/DocsContext'

import AddItemButton from '@/components/common/AddItemButton'
import { AddItemForm } from '@/components/items/AddItemForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

import AboutItemCard from '@/components/items/AboutItemCard'
import { ItemsContent } from '@/components/items/ItemsContent'
import useDeleteItem from '@/hooks/items/useDeleteItem'
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

    const hasRun = useRef(false)

    // Malabarismo por que atualmente o id é o nome :)
    const itemForDeletion: Item = items.find(e => e._id === selectedItemForDeletion) || {} as Item

    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)

    const [newItemCategory, setNewItemCategory] = useState('')
    const [deletedItemCategory, setDeletedItemCategory] = useState('')

    const { deleteItem } = useDeleteItem()

    useEffect(() => {

        // set categoria padrão ao abrir app pela primeira vez
        if (hasRun.current === false) {
            setCategory(getCategoryOnTheFirstRun(items))
            hasRun.current = true
            return
        }

        // set categoria do último item deletado se possível
        if (deletedItemCategory) {
            setCategory(getCategoryOnDeletedItem(items, deletedItemCategory))
            setDeletedItemCategory('')
            return
        }

    }, [items, deletedItemCategory])

    const deleteService = async (id: string, category: string) => {

        setLoadingScreen(true)

        const result = await deleteItem(id)

        if (!result.success) showErrorAtSubmitData(result.error)

        setDeletedItemCategory(category)
        setShowAboutItemCard(false)
        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    items[0]
                        ? <>
                            <ItemsContent
                                category={category}
                                setCategory={setCategory}
                                setSelectedItemForDeletion={setSelectedItemForDeletion}
                                setShowAboutItemCard={setShowAboutItemCard}
                            />
                            <AddItemButton
                                iconColor={'#FFF'}
                                bgColor={colors.items.max}
                                onPress={() => setShowItemCategoryCard(true)}
                            />
                        </>
                        : <AnyInfoWarning
                            text='listamos todos os seus produtos ou serviços.'
                            titleBgColor={colors.items.max}
                            textBgColor={colors.items.min}
                            addDataButtonText='Adicionar Item'
                            onAddDataButtonPress={() => setShowItemCategoryCard(true)}
                        />
                }

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
                        setCategory={setCategory}
                    />
                }
                {
                    showAboutItemCard && (
                        <AboutItemCard
                            item={itemForDeletion}
                            deleteFunction={(id, category) => deleteService(id, category)}
                            setFormOff={setShowAboutItemCard}
                        />
                    )
                }
            </Container>
        </>
    )

}