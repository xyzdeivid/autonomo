import { View, Text, StyleSheet } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { Service } from '@/context/DocsContext'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { moneyFormat } from '@/functions/common'
import { useContext, useEffect } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'

interface DeleteServiceFormProps {
    service: Service
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteServiceForm({ service, deleteFunction, setFormOff }: DeleteServiceFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Sobre Serviço' />
                <View>
                    <Text><Text style={styles.label}>Serviço:</Text> {service._id}</Text>
                    <Text><Text style={styles.label}>Valor:</Text>{moneyFormat(service.value)}</Text>
                </View>
                <SubmitFormButtons
                    submit={() => deleteFunction(service._id)}
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