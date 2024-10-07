import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import FormBody from '../common/FormBody'
import { useContext, useEffect, useState } from 'react'
import { DocsContext, Service } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { HideTabBarContext } from '@/context/HideTabBar'
import { checkTitle, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface EditServiceFormProps {
    service: Service
    setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditServiceForm({ service, setEditServiceForm }: EditServiceFormProps) {

    const [services, setServices] = useContext(DocsContext).services
    const [value, setValue] = useState(service.value)
    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const editService = async () => {

        // Separando os serviços que não serão editados
        const otherServices = services.filter(current => {
            return current._id !== service._id
        })

        const editedService = {} as Service

        editedService.category = service.category
        editedService._id = service._id
        editedService.value = value
        editedService.amount = service.amount

        try {

            await AsyncStorage.setItem('services', JSON.stringify([...otherServices, editedService]))

            setServices(orderServices([...otherServices, editedService]))

            setEditServiceForm(false)

        } catch (error) {

            Alert.alert('Erro ao salvar no banco de dados')

        }



    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Editar ${checkTitle(service)}`} />
                <FormInputs>
                    <Text style={styles.serviceName}>{service._id}</Text>
                    <NumberInput setValue={setValue} />
                    {service.category === 'product' && (
                        <View style={styles.inputContainer}>
                            <Text>Estoque: </Text>
                            <TextInput style={styles.input} keyboardType='numeric' />
                        </View>
                    )}
                </FormInputs>
                <SubmitFormButtons submit={editService} setFormOff={setEditServiceForm} submitButtonText='Editar' />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    serviceName: {
        fontSize: 20,
        marginBottom: 20
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        width: '25%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3
    }
})