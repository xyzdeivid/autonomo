import { View, Text, StyleSheet, BackHandler } from 'react-native'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Outflow } from '@/types'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import ActualName from './ActualName'
import EditNameInput from './EditNameInput'
import LoadingScreen from '../common/LoadingScreen'
import ActualValue from './ActualValue'
import EditValueInput from './EditValueInput'
import useEditOutflowName from '@/hooks/useEditOutflowName'
import useEditOutflowValue from '@/hooks/useEditOutflowValue'


interface AboutOutflowCardProps {
    outflow: Outflow
    deleteFunction: (expense: Outflow) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutOutflowCard({ outflow, deleteFunction, setFormOff, setButton }: AboutOutflowCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [showEditValueInput, setShowEditValueInput] = useState(false)
    const [newName, setNewName] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [newValue, setNewValue] = useState(0)

    const editOutflowName = useEditOutflowName().editOutflowName
    const editOutflowValue = useEditOutflowValue().editOutflowValue

    useEffect(() => {
        setButton(false)
        BackHandler.addEventListener('hardwareBackPress', () => {
            setFormOff(false)
            setButton(true)
            return null
        })
    }, [setButton, setFormOff])

    const submitNameToEdit = async () => {

        if (newName) {

            setLoadingScreen(true)

            await editOutflowName(outflow, newName)

            setLoadingScreen(false)
            setHideTabBar(false)
            setButton(true)
            setFormOff(false)

        } else {

            setShowEditNameInput(false)

        }

    }

    const submitValueToEdit = async () => {

        if (newValue) {

            setLoadingScreen(true)

            await editOutflowValue(outflow, newValue)

            setLoadingScreen(false)
            setHideTabBar(false)
            setButton(true)
            setFormOff(false)

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
                        showEditNameInput
                            ? <EditNameInput actualName={outflow.name} setName={setNewName} editName={submitNameToEdit} />
                            : <ActualName name={outflow.name} setShowEditNameInput={setShowEditNameInput} />
                    }
                    <Text style={styles.labelContainer}>
                        <Text style={styles.label}>Data:</Text> {dateFormat(outflow.date)}
                    </Text>
                    {
                        showEditValueInput
                            ? <EditValueInput
                                setValue={setNewValue}
                                editValue={submitValueToEdit}
                                actualValue={outflow.value}
                            />
                            : <ActualValue
                                name={outflow.name}
                                value={outflow.value}
                                setShowEditValueInput={setShowEditValueInput}
                            />
                    }
                    {
                        outflow.amount && (
                            <Text style={styles.labelContainer}><Text style={styles.label}>Valor (un):</Text>{moneyFormat(outflow.value / outflow.amount)}</Text>
                        )
                    }
                    {
                        outflow.amount && (
                            <Text style={styles.labelContainer}><Text style={styles.label}>Quantidade:</Text> {outflow.amount}</Text>
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
    labelContainer: {
        marginBottom: 12,
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    }
})