import { View, Text, StyleSheet, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Item } from '@/types'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { useEffect, useState } from 'react'
import EditValueInput from './EditValueInput'
import ActualValue from './ActualValue'
import ActualStock from './ActualStock'
import EditStockInput from './EditStockInput'
import ConfirmDelete from '../common/ConfirmDelete'
import LoadingScreen from '../common/LoadingScreen'
import ActualName from './ActualName'
import EditNameInput from './EditNameInput'
import { moneyFormat } from '@/functions/common'
import useEditItemName from '@/hooks/useEditItemName'
import useEditItemValue from '@/hooks/useEditItemValue'
import useEditStockItem from '@/hooks/useEditStockItem'
import { getAboutItemCardTitle } from '@/functions/getAboutItemCardTitle'

interface AboutItemCardProps {
    service: Item
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutItemCard({ service, deleteFunction, setFormOff, setButton }: AboutItemCardProps) {

    const [editNameInput, setEditNameInput] = useState(false)
    const [name, setName] = useState('')

    const [editValueInput, setEditValueInput] = useState(false)
    const [value, setValue] = useState(0)

    const [editStockInput, setEditStockInput] = useState(false)
    const [stock, setStock] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [changedValue, setChangedValue] = useState(false)

    const editItemName = useEditItemName().editItemName
    const editItemValue = useEditItemValue().editItemValue
    const editItemStock = useEditStockItem().editStockItem

    useEffect(() => {
        setButton(false)
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            setButton(true)
            return null
        })
    }, [setButton, setFormOff])

    const closeForm = () => {

        setFormOff(false)
        setButton(true)
        setLoadingScreen(false)

    }

    const submitNameToEdit = async () => {

        if (name) {

            setLoadingScreen(true)

            await editItemName(name, service)

            closeForm()

        } else {

            setEditNameInput(false)

        }

    }

    const submitValueToEdit = async () => {

        // Apenas salvando se existir novo valor e ele for diferente do atual
        if (value && value !== service.value) {

            setLoadingScreen(true)

            await editItemValue(value, service)

            closeForm()

        } else {

            setEditValueInput(false)

        }

    }

    const submitStockToEdit = async () => {

        if (changedValue && stock !== service.amount) {

            setLoadingScreen(true)

            await editItemStock(stock, service)

            closeForm()

        } else {

            setEditStockInput(false)

        }

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle text={`Informações do ${getAboutItemCardTitle(service.category)}`} textColor='#330066' />
                <View>
                    {
                        editNameInput
                            ? <EditNameInput setName={setName} editName={submitNameToEdit} actualName={service._id} />
                            : <ActualName name={name || service._id} setEditNameInput={setEditNameInput} />
                    }
                    {service.category !== 'budget' && (
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
                                            value={value || service.value}
                                            setEditValueInput={setEditValueInput}
                                        />
                                }
                            </View>
                            {
                                editValueInput &&
                                <Text style={styles.currentValueText}>
                                    Valor atual: {moneyFormat(service.value)}
                                </Text>
                            }
                        </View>
                    )}
                    {
                        service.isThereAmount && (
                            <View style={styles.inputContainer}>
                                <View style={styles.infoContainer}>
                                    {
                                        editStockInput
                                            ? <EditStockInput
                                                setStock={setStock}
                                                editStock={submitStockToEdit}
                                                setChangedValue={setChangedValue}
                                                currentStock={service.amount}
                                            />
                                            : <ActualStock stock={stock || service.amount || 0} setEditStockInput={setEditStockInput} />
                                    }
                                </View>
                            </View>
                        )
                    }
                </View>
            </FormContainer>
            {
                !confirmDelete
                    ? <SubmitFormButtons
                        cancel={() => {
                            setFormOff(false)
                            setButton(true)
                        }}
                        submit={() => setConfirmDelete(true)}
                        submitButtonText='Excluir'
                        submitButtonColor='darkred'
                    />
                    : <ConfirmDelete
                        name={service._id}
                        deleteFunction={() => {
                            deleteFunction(service._id)
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
    }
})