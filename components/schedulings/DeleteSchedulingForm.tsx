import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Scheduling } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { dateFormat, moneyFormat } from '@/functions/common'
import { useContext, useEffect } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'

interface DeleteSchedulingFormProps {
    scheduling: Scheduling
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteSchedulingForm({ scheduling, deleteFunction, setFormOff }: DeleteSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Sobre Agendamento' />
                <View>
                    <Text><Text style={styles.label}>Serviço:</Text> {scheduling.service._id}</Text>
                    <Text><Text style={styles.label}>Valor:</Text>{moneyFormat(scheduling.service.value)}</Text>
                    <Text><Text style={styles.label}>Data:</Text> {dateFormat(scheduling.date)}</Text>
                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(scheduling._id)}
                    setFormOff={setFormOff}
                    submitButtonText='Excluir'
                    submitButtonColor='darkred'
                />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    }
})