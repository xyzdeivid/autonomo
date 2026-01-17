import { View, BackHandler, Alert } from 'react-native'
import { Item, Outflow } from '@/types'
import { useEffect, useState } from 'react'
import ActualValue from './ActualValue'
import ActualStock from './ActualStock'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import ActualName from './ActualName'
import useEditItemName from '@/hooks/useEditItemName'
import useEditItemValue from '@/hooks/useEditItemValue'
import useEditStockItem from '@/hooks/useEditStockItem'
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

interface AboutItemCardProps {
    item: Item
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutItemCard({ item, deleteFunction, setFormOff }: AboutItemCardProps) {

    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [name, setName] = useState('')

    const [showEditValueInput, setShowEditValueInput] = useState(false)
    const [value, setValue] = useState(0)

    const [showEditStockInput, setShowEditStockInput] = useState(false)
    const [stock, setStock] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)

    const [replenishForm, setReplenishForm] = useState(false)
    const [replenishDate, setReplenishDate] = useState('')
    const [replenishValue, setReplenishValue] = useState(0)
    const [replenishAmount, setReplenishAmount] = useState(0)
    const [replenishValueChoice, setReplenishValueChoice] = useState('total')

    const editItemName = useEditItemName().editItemName
    const editItemValue = useEditItemValue().editItemValue
    const editItemStock = useEditStockItem().editStockItem
    const addOutflow = useAddOutflow().addOutflow

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const closeForm = () => {

        setFormOff(false)
        setLoadingScreen(false)

    }

    const submitNameToEdit = async () => {

        if (name) {

            setLoadingScreen(true)

            await editItemName(name, item)

            setFormOff(false)
            setLoadingScreen(false)

        } else {

            setShowEditNameInput(false)

        }

    }

    const submitValueToEdit = async () => {

        // Apenas salvando se existir novo valor e ele for diferente do atual
        if (value && value !== item.value) {

            setLoadingScreen(true)

            await editItemValue(value, item)

            closeForm()

        } else {

            setShowEditValueInput(false)

        }

    }

    const submitStockToEdit = async () => {

        if (stock !== item.amount) {

            setLoadingScreen(true)

            await editItemStock(stock, item)

            closeForm()

        } else {

            setShowEditStockInput(false)

        }

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

        const newResaleAmount: number = (item.amount ?? 0) + replenishAmount

        await addOutflow(newReplenishOuflow, newResaleAmount, item)

        // Fechando card de reposição de estoque
        closeForm()

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <ListItemCardContainer
                bgColor={colors.items.min}
            >
                <ListItemCardHeader
                    text={`Informações do ${getAboutItemCardTitle(item.category)}`}
                    onCloseCardButton={() => setFormOff(false)}
                    bgColor={colors.items.max}
                />
                <ListItemCardBody>
                    <ActualName
                        item={item}
                        name={name}
                        setName={setName}
                        editName={submitNameToEdit}
                        showEditInput={showEditNameInput}
                        setShowEditInput={setShowEditNameInput}
                        isEditable={true}
                    />
                    {item.category !== 'budget' && (
                        <ActualValue
                            item={item}
                            showEditInput={showEditValueInput}
                            value={value}
                            setValue={setValue}
                            setShowEditInput={setShowEditValueInput}
                            editValue={submitValueToEdit}
                            isEditable={true}
                        />
                    )}
                    {
                        item.isThereAmount && (
                            <ActualStock
                                item={item}
                                showEditInput={showEditStockInput}
                                setShowEditInput={setShowEditStockInput}
                                setStock={setStock}
                                editStock={submitStockToEdit}
                                isEditable={true}
                            />
                        )
                    }
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