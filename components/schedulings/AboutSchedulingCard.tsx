import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Scheduling } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect, useState } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import ConfirmDelete from '../common/ConfirmDelete'
import { Entypo } from '@expo/vector-icons'
import ActualAmount from './ActualAmount'

interface DeleteSchedulingFormProps {
    scheduling: Scheduling
    deleteFunction: (scheduling: Scheduling) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteSchedulingForm({ scheduling, deleteFunction, setFormOff, setButton }: DeleteSchedulingFormProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showEditAmountInput, setShowEditAmountInput] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
        setButton(false)
    }, [])

    return (
        <FormContainer
            setFormOff={setFormOff}
            bgColor='rgba(0, 102, 0, 0.1)'
            setButton={setButton}
        >
            <FormBody borderColor='rgba(0, 102, 0, 0.1)'>
                <FormTitle text='Informações de Entrada' textColor='#006600' />
                <View>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Nome:</Text> {scheduling.service._id}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Data:</Text> {dateFormat(scheduling.date)}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Valor:</Text>{moneyFormat(scheduling.service.value)}</Text>
                    {
                        scheduling.service.category === 'product'
                            ? <View>
                                <Text style={styles.labelContainer}>
                                    <Text style={styles.label}>
                                        Valor (un):
                                    </Text>
                                    {scheduling.service.amount
                                        ? moneyFormat(scheduling.service.value / scheduling.service.amount)
                                        : null}
                                </Text>
                                {
                                    scheduling.service.amount &&
                                    <ActualAmount
                                        amount={scheduling.service.amount}
                                        setShowEditAmountInput={setShowEditAmountInput}
                                    />
                                }
                            </View>
                            : null
                    }
                </View>
                {
                    !confirmDelete
                        ? <SubmitFormButtons
                            submit={() => setConfirmDelete(true)}
                            submitButtonText='Excluir'
                            submitButtonColor='darkred'
                        />
                        : <ConfirmDelete
                            deleteFunction={() => {
                                deleteFunction(scheduling)
                            }}
                            setConfirmDelete={setConfirmDelete}
                        />
                }
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    labelContainer: {
        marginBottom: 12
    },
    label: {
        fontWeight: 'bold'
    }
})