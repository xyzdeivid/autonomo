import { View, BackHandler, Alert } from 'react-native'
import { Item, Outflow } from '@/types'
import { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import useEditItemName from '@/hooks/useEditItemName'
import useEditItemValue from '@/hooks/useEditItemValue'
import useEditItemStock from '@/hooks/useEditItemStock'
import { getAboutItemCardTitle } from '@/functions/getAboutItemCardTitle'
import ReplenishResaleStock from './ReplenishResaleStock'
import { createNewOutflow } from '@/functions/createNewOutflow'
import useAddOutflow from '@/hooks/useAddOutflow'
import { DeleteListItemButton } from '../common/DeleteListItemButton'
import { colors } from '@/constants/appColors'
import { ListItemCardContainer } from '../common/ListItemCardContainer'
import { ListItemCardHeader } from '../common/ListItemCardHeader'
import { ListItemCardBody } from '../common/ListItemCardBody'
import { StockWarningForResale } from './StockWarningForResale'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { getErrorMessage, moneyFormat } from '@/functions/common'
import { EditNameCard } from '../common/EditNameCard'
import { EditValueCard } from '../common/EditValueCard'
import { EditAmountCard } from '../common/EditAmountCard'

interface AboutItemCardProps {
    item: Item
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutItemCard({ item, deleteFunction, setFormOff }: AboutItemCardProps) {
    
    const [showEditNameCard, setShowEditNameCard] = useState(false)
    const [name, setName] = useState('')

    const [showEditValueCard, setShowEditValueCard] = useState(false)
    const [value, setValue] = useState(0)

    const [showEditStockCard, setShowEditStockCard] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)

    const [replenishForm, setReplenishForm] = useState(false)
    const [replenishDate, setReplenishDate] = useState('')
    const [replenishValue, setReplenishValue] = useState(0)
    const [replenishAmount, setReplenishAmount] = useState(0)
    const [replenishValueChoice, setReplenishValueChoice] = useState('total')

    const editItemName = useEditItemName().editItemName
    const editItemValue = useEditItemValue().editItemValue
    const editItemStock = useEditItemStock().editItemStock
    const addOutflow = useAddOutflow().addOutflow

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const submitNameToEdit = async () => {

        setLoadingScreen(true)

        const result = await editItemName(name, item._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setFormOff(false)
        setLoadingScreen(false)

    }

    const submitValueToEdit = async () => {

        setLoadingScreen(true)

        const result = await editItemValue(value, item._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setShowEditValueCard(false)
        setLoadingScreen(false)

    }

    const submitStockToEdit = async (newStock: number) => {

        setLoadingScreen(true)

        const result = await editItemStock(newStock, item._id)

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setShowEditStockCard(false)
        setLoadingScreen(false)

    }

    const submitReplenishStock = async () => {

        if (!replenishAmount || !replenishValue) {

            Alert.alert('Preencha todos os campos')

            return

        }

        setLoadingScreen(true)

        const newReplenishOuflow: Outflow = createNewOutflow(
            replenishValueChoice, replenishValue,
            replenishAmount, item._id,
            replenishDate
        )

        const result = await addOutflow(newReplenishOuflow, item)

        if(!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        // Fechando card de reposição de estoque
        setLoadingScreen(false)
        setReplenishForm(false)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <ListItemCardContainer
                bgColor={colors.items.min}
            >
                <ListItemCardHeader
                    text={`Detalhes do ${getAboutItemCardTitle(item.category)}`}
                    onCloseCardButton={() => setFormOff(false)}
                    bgColor={colors.items.max}
                />
                <ListItemCardBody>
                    <ListItemCardProperty
                        label='Nome'
                        text={item._id}
                        bgColor={colors.items.min}
                        onEditButtonPress={() => setShowEditNameCard(true)}
                    />
                    {showEditNameCard && (
                        <EditNameCard
                            visible={showEditNameCard}
                            currentName={item._id}
                            setNewName={setName}
                            onConfirmButtonPress={() => {
                                if (name && name !== item._id) {
                                    submitNameToEdit()
                                }
                                setShowEditNameCard(false)
                            }}
                            onCancelButtonPress={() => setShowEditNameCard(false)}
                        />
                    )}
                    {item.category !== 'budget' && (
                        <ListItemCardProperty
                            label='Valor'
                            text={moneyFormat(item.value)}
                            bgColor={colors.items.min}
                            onEditButtonPress={() => setShowEditValueCard(true)}
                        />
                    )}
                    {showEditValueCard && (
                        <EditValueCard
                            visible={showEditValueCard}
                            setNewValue={setValue}
                            onSuccessButtonPress={() => {
                                if (value > 0 && value !== item.value) {
                                    submitValueToEdit()
                                }
                                setShowEditValueCard(false)
                            }}
                            onCancelButtonPress={() => setShowEditValueCard(false)}
                        />
                    )}
                    {
                        item.isThereAmount && (
                            <ListItemCardProperty
                                label='Estoque'
                                text={String(item.amount)}
                                bgColor={colors.items.min}
                                onEditButtonPress={() => setShowEditStockCard(true)}
                            />
                        )
                    }
                    {showEditStockCard ? (
                        <EditAmountCard
                            visible={showEditStockCard}
                            currentValue={item.amount || 0}
                            onSuccessButtonPress={newStock => {
                                if (newStock.trim() === '') {
                                    setShowEditStockCard(false)
                                    return
                                }
                                const parsed = Number(newStock)
                                if (!Number.isNaN(parsed) && parsed !== item.amount) {
                                    submitStockToEdit(parsed)
                                }
                                setShowEditStockCard(false)
                            }}
                            onCancelButtonPress={() => setShowEditStockCard(false)}
                        />
                    ) : null}
                    {
                        item.resale && (
                            <StockWarningForResale onRestockButtonPress={() => setReplenishForm(true)} />
                        )
                    }
                    <View style={{ marginTop: item.resale ? 16 : 0 }}>
                        <DeleteListItemButton onPress={() => setConfirmDelete(true)} />
                    </View>
                </ListItemCardBody>
                {
                    replenishForm && (
                        <ReplenishResaleStock
                            resaleProductName={item._id}
                            setReplenishDate={setReplenishDate}
                            setReplenishValue={setReplenishValue}
                            setReplenishAmount={setReplenishAmount}
                            setReplenishForm={setReplenishForm}
                            replenishValueChoice={replenishValueChoice}
                            setReplenishValueChoice={setReplenishValueChoice}
                            submitReplenishStock={submitReplenishStock}
                        />
                    )
                }
            </ListItemCardContainer>
            {
                confirmDelete && (
                    <ConfirmDelete
                        name={item._id}
                        deleteFunction={() => {
                            deleteFunction(item._id)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
                )
            }
        </>
    )

}