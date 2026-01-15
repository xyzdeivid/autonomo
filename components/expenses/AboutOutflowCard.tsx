import { View, Text, StyleSheet, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Outflow } from '@/types'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useEffect, useState } from 'react'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualName from './ActualName'
import LoadingScreen from '../common/LoadingScreen'
import ActualValue from './ActualValue'
import useEditOutflowName from '@/hooks/useEditOutflowName'
import useEditOutflowValue from '@/hooks/useEditOutflowValue'
import { EditableProperty } from '../common/EditableProperty'
import { DeleteButton } from '../common/DeleteButton'
import { CloseFormButton } from '../common/CloseFormButton'


interface AboutOutflowCardProps {
    outflow: Outflow
    deleteFunction: (expense: Outflow) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutOutflowCard({ outflow, deleteFunction, setFormOff }: AboutOutflowCardProps) {

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditValueInput, setShowEditValueInput] = useState(false)
    const [newName, setNewName] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [newValue, setNewValue] = useState(0)
    const [showEditNameInput, setShowEditNameInput] = useState(false)

    const editOutflowName = useEditOutflowName().editOutflowName
    const editOutflowValue = useEditOutflowValue().editOutflowValue

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            return null
        })
    }, [setFormOff])

    const isEditable = () => {

        if (outflow.amount) return false
        return true

    }

    const submitNameToEdit = async () => {

        if (newName) {

            setLoadingScreen(true)

            await editOutflowName(outflow, newName)

            setLoadingScreen(false)
            setShowEditNameInput(false)
            setNewName('')

        }

    }

    const submitValueToEdit = async () => {

        if (newValue) {

            setLoadingScreen(true)

            await editOutflowValue(outflow, newValue)

            setLoadingScreen(false)
            setShowEditValueInput(false)

        } else {

            setShowEditValueInput(false)

        }

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle text='Informações de Despesa' textColor='#660000' />
                <View>
                    {
                        outflow.amount && (
                            <Text style={styles.replenishLabel}>Reposição de Estoque</Text>
                        )
                    }
                    <ActualName
                        outflow={outflow}
                        name={newName}
                        setName={setNewName}
                        editName={submitNameToEdit}
                        showEditInput={showEditNameInput}
                        setShowEditInput={setShowEditNameInput}
                        isEditable={isEditable()}
                    />
                    <EditableProperty
                        label='Data'
                        propertyName={dateFormat(outflow.date)}
                        isEditable={false}
                    />
                    <ActualValue
                        outflow={outflow}
                        showEditInput={showEditValueInput}
                        setShowEditInput={setShowEditValueInput}
                        value={newValue}
                        setValue={setNewValue}
                        editValue={submitValueToEdit}
                        isEditable={isEditable()}
                    />
                    {
                        outflow.amount && (
                            <EditableProperty
                                label='Valor (un)'
                                propertyName={moneyFormat(outflow.value / outflow.amount)}
                                isEditable={isEditable()}
                            />
                        )
                    }
                    {
                        outflow.amount && (
                            <EditableProperty
                                label='Quantidade'
                                propertyName={String(outflow.amount)}
                                isEditable={isEditable()}
                            />
                        )
                    }
                </View>
            </FormContainer>
            <DeleteButton onPress={() => setConfirmDelete(true)} />
            <CloseFormButton onPress={() => setFormOff(false)} />
            {
                confirmDelete &&
                <ConfirmDelete
                    name={outflow.name}
                    deleteFunction={() => {
                        deleteFunction(outflow)
                    }}
                    setConfirmDelete={setConfirmDelete}
                />
            }
        </>
    )

}

const styles = StyleSheet.create({

    replenishLabel: {
        fontSize: 16,
        color: '#660000',
        fontWeight: 'bold',
        marginBottom: 24
    },

    labelContainer: {
        marginBottom: 12,
        fontSize: 16
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16
    }

})