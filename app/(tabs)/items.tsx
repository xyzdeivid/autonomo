// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'

// custom functions
import { getServicesByCategory, getCategoryAndSet } from '@/utils/services'

// context
import { DocsContext } from '@/context/DocsContext'

// common components
import AddItemButton from '@/components/common/AddItemButton'
import { AddItemForm } from '@/components/items/AddItemForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// service components
import AboutItemCard from '@/components/items/AboutItemCard'
import ServicesContent from '@/components/items/ServicesContent'
import useDeleteItem from '@/hooks/useDeleteItem'
import { Item } from '@/types'
import { colors } from '@/constants/appColors'
import { getErrorMessage } from '@/utils/common'
import { ItemCategoryCard } from '@/components/items/ItemCategoryCard'

export default function Services() {

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
        getCategoryAndSet(items, setCategory)
    }, [items])

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
    }, [])

    const deleteService = async (id: string) => {

        setLoadingScreen(true)

        const result = await deleteItem(id)

        if (!result.success && result.error) {
            Alert.alert('Erro', getErrorMessage(result.error))
        }

        setShowAboutItemCard(false)
        setLoadingScreen(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    items[0]
                        ? <ServicesContent
                            category={category}
                            setCategory={setCategory}
                            services={getServicesByCategory(items, category)}
                            setSelectedItemForDeletion={setSelectedItemForDeletion}
                            setDeleteServiceForm={setShowAboutItemCard}
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