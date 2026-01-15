import { View, Text, StyleSheet, BackHandler, Pressable, Alert } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Item, Outflow } from '@/types'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { useEffect, useState } from 'react'
import EditValueInput from './EditValueInput'
import ActualValue from './ActualValue'
import ActualStock from './ActualStock'
import EditStockInput from './EditStockInput'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import ActualName from './ActualName'
import { moneyFormat } from '@/functions/common'
import useEditItemName from '@/hooks/useEditItemName'
import useEditItemValue from '@/hooks/useEditItemValue'
import useEditStockItem from '@/hooks/useEditStockItem'
import { getAboutItemCardTitle } from '@/functions/getAboutItemCardTitle'
import ReplenishResaleStock from './ReplenishResaleStock'
import { createNewOutflow } from '@/functions/createNewOutflow'
import useAddOutflow from '@/hooks/useAddOutflow'

interface AboutItemCardProps {
    item: Item
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutItemCard({ item, deleteFunction, setFormOff }: AboutItemCardProps) {

    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [name, setName] = useState('')

    const [editValueInput, setEditValueInput] = useState(false)
    const [value, setValue] = useState(0)

    const [editStockInput, setEditStockInput] = useState(false)
    const [stock, setStock] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [changedValue, setChangedValue] = useState(false)

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

            setEditValueInput(false)

        }

    }

    const submitStockToEdit = async () => {

        if (changedValue && stock !== item.amount) {

            setLoadingScreen(true)

            await editItemStock(stock, item)

            closeForm()

        } else {

            setEditStockInput(false)

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
            <FormContainer
            >
                <FormTitle
                    text={`Informações do ${getAboutItemCardTitle(item.category)}`}
                    textColor='#330066'
                />
                <View>
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
                        <View style={styles.inputContainer}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Valor:</Text>
                                {
                                    editValueInput
                                        ? <>
                                            <EditValueInput
                                                setValue={setValue}
                                                editValue={submitValueToEdit}
                                            />
                                        </>
                                        : <ActualValue
                                            value={value || item.value}
                                            setEditValueInput={setEditValueInput}
                                        />
                                }
                            </View>
                            {
                                editValueInput &&
                                <Text style={styles.currentValueText}>
                                    Valor atual: {moneyFormat(item.value)}
                                </Text>
                            }
                        </View>
                    )}
                    {
                        item.isThereAmount && (
                            <View style={styles.inputContainer}>
                                <View style={styles.infoContainer}>
                                    {
                                        editStockInput
                                            ? <EditStockInput
                                                setStock={setStock}
                                                editStock={submitStockToEdit}
                                                setChangedValue={setChangedValue}
                                                currentStock={item.amount}
                                            />
                                            : <ActualStock stock={stock || item.amount || 0} setEditStockInput={setEditStockInput} />
                                    }
                                </View>
                            </View>
                        )
                    }
                    {
                        item.resale && (
                            <View style={{ marginTop: 12 }}>
                                <View
                                    style={styles.resaleWarningCard}
                                >
                                    <View><Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>Evite erros no seu saldo!</Text></View>
                                    <Text style={{ textAlign: 'justify' }}>Para produtos que são revendidos, não recomendamos editar estoque manualmente. Ao clicar em <Text style={{ fontWeight: 'bold' }}>Repor Estoque</Text>,
                                        você atualiza o estoque e registra a despesa da compra do produto de uma só vez.</Text>
                                </View>
                                <Pressable
                                    style={styles.resaleButton}
                                    onPress={() => setReplenishForm(true)}
                                >
                                    <Text style={{ color: 'white' }}>Repor Estoque</Text>
                                </Pressable>
                            </View>
                        )
                    }
                </View>
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
            </FormContainer>
            {
                !confirmDelete
                    ? <SubmitFormButtons
                        cancel={() => {
                            setFormOff(false)
                        }}
                        submit={() => setConfirmDelete(true)}
                        submitButtonText='Excluir'
                        submitButtonColor='darkred'
                    />
                    : <ConfirmDelete
                        name={item._id}
                        deleteFunction={() => {
                            deleteFunction(item._id)
                        }}
                        setConfirmDelete={setConfirmDelete}
                    />
            }
        </>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    },
    currentValueText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2
    },
    resaleWarningCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0.5,
        borderColor: 'black',
        padding: 16,
        borderRadius: 4,
        marginTop: 12
    },
    resaleButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(51, 0, 102, 0.75)',
        borderWidth: 1,
        borderColor: '#330066',
        alignSelf: 'center',
        marginTop: 8
    }
})