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

interface DeleteSchedulingFormProps {
    scheduling: Scheduling
    deleteFunction: (scheduling: Scheduling) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteSchedulingForm({ scheduling, deleteFunction, setFormOff, setButton }: DeleteSchedulingFormProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        setHideTabBar(true)
        setButton(false)
    }, [])

    const checkValueText = () => {
        if (scheduling.service.category === 'product') {
            return 'Valor Total'
        }
        return 'Valor'
    }

    return (
        <FormContainer
            setFormOff={setFormOff}
            bgColor='rgba(0, 102, 0, 0.1)'
            setButton={setButton}
        >
            <FormBody>
                <FormTitle text={scheduling.service._id} textColor='#006600'>
                    <Entypo name='info' size={18} color='rgba(0, 102, 0, 0.2)' />
                </FormTitle>
                <View>
                    {
                        scheduling.service.category === 'product'
                            ? <View>
                                <Text style={styles.labelContainer}><Text style={styles.label}>Valor (un):</Text>{moneyFormat(scheduling.service.value / scheduling.service.amount)}</Text>
                                <Text style={styles.labelContainer}>
                                    <Text style={styles.label}>Quantidade: </Text>
                                    {scheduling.service.amount}
                                </Text>
                            </View>
                            : null
                    }
                    <Text style={styles.labelContainer}><Text style={styles.label}>{checkValueText()}:</Text>{moneyFormat(scheduling.service.value)}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Data:</Text> {dateFormat(scheduling.date)}</Text>

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
        marginBottom: 4
    },
    label: {
        fontWeight: 'bold'
    }
})