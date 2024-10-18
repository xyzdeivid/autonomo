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

    const checkValueText = () => {
        if (scheduling.service.category === 'product') {
            return 'Valor Total'
        }
        return 'Valor'
    }

    return (
        <FormContainer setFormOff={setFormOff}>
            <FormBody>
                <FormTitle text={scheduling.service._id} />
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
                <SubmitFormButtons
                    submit={() => deleteFunction(scheduling)}
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