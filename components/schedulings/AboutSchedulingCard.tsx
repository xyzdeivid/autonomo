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
    deleteFunction: (scheduling: Scheduling) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteSchedulingForm({ scheduling, deleteFunction, setFormOff }: DeleteSchedulingFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const checkTitle = () => {
        if (scheduling.service.category === 'product') {
            return ['Venda', 'Produto']
        } else {
            return ['Agendamento', 'Serviço']
        }
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Sobre ${checkTitle()[0]}`} />
                <View>
                    <Text style={styles.labelContainer}><Text style={styles.label}>{checkTitle()[1]}:</Text> {scheduling.service._id}</Text>
                    {
                        scheduling.service.amount
                            ? <View>
                                <Text style={styles.labelContainer}><Text style={styles.label}>Preço:</Text>{moneyFormat(scheduling.service.value / scheduling.service.amount)}</Text>
                                <Text style={styles.labelContainer}>
                                    <Text style={styles.label}>Quantidade: </Text>
                                    {scheduling.service.amount}
                                </Text>
                            </View>
                            : null
                    }
                    <Text style={styles.labelContainer}><Text style={styles.label}>Valor de Venda:</Text>{moneyFormat(scheduling.service.value)}</Text>
                    <Text style={styles.labelContainer}><Text style={styles.label}>Data:</Text> {dateFormat(scheduling.date)}</Text>

                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(scheduling)}
                    setFormOff={setFormOff}
                    submitButtonText='Excluir'
                    submitButtonColor='darkred'
                />
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