// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'

// custom functions
import { getServicesByCategory, getCategoryAndSet } from '@/utils/services'

// context
import { DocsContext } from '@/context/DocsContext'

// common components
import AddItemButton from '@/components/common/AddItemButton'
import AddServiceForm from '@/components/items/AddItemForm'
import Container from '@/components/common/Container'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// service components
import AboutServiceCard from '@/components/items/AboutItemCard'
import ServicesContent from '@/components/items/ServicesContent'
import useDeleteItem from '@/hooks/useDeleteItem'
import { Item } from '@/types'
import { colors } from '@/constants/appColors'
import { getErrorMessage } from '@/utils/common'

export default function Services() {

    const appDocs = useContext(DocsContext)
    const [items] = appDocs.items
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [aboutServiceCard, setAboutServiceCard] = useState(false)
    const [selectedItemForDeletion, setSelectedItemForDeletion] = useState('')

    // Malabarismo por que atualmente o id é o nome :)
    const itemForDeletion: Item = items.find(e => e._id === selectedItemForDeletion) || {} as Item

    const [currentPage] = appDocs.currentPage
    const [category, setCategory] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)

    const deleteItem = useDeleteItem().deleteItem

    useEffect(() => {
        getCategoryAndSet(items, setCategory)
    }, [items])

    useEffect(() => {
        if (currentPage !== 'services') {
            setAddServiceForm(false)
            setAboutServiceCard(false)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddServiceForm(false)
            return null
        })
    }, [])

    const deleteService = async (id: string) => {

        setLoadingScreen(true)

        const result = await deleteItem(id)

        if (!result.success && result.error) {
            Alert.alert('Erro', getErrorMessage(result.error))
        }

        setAboutServiceCard(false)
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
                            setDeleteServiceForm={setAboutServiceCard}
                        />
                        : <AnyInfoWarning
                            text='listamos todos os seus produtos ou serviços.'
                            titleBgColor={colors.items.max}
                            textBgColor={colors.items.min}
                        />
                }

                <AddItemButton
                    setForm={setAddServiceForm}
                    text='Registrar Produto/Serviço'
                    mainColor={colors.items.max}
                    bgColor={colors.items.min}
                />
                {
                    addServiceForm
                    && <AddServiceForm
                        setAddServiceForm={setAddServiceForm}
                    />
                }
                {
                    aboutServiceCard && (
                        <AboutServiceCard
                            item={itemForDeletion}
                            deleteFunction={deleteService}
                            setFormOff={setAboutServiceCard}
                        />
                    )
                }
            </Container>
        </>
    )

}