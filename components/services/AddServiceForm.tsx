import { StyleSheet, Alert } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DocsContext, Service } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { HideTabBarContext } from '@/context/HideTabBar'
import NameInput from '../common/NameInput'

import { orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

    const [allInputsFilled, setAllInputsFilled] = useState(false)
    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [services, setServices] = useContext(DocsContext).services
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [choice, setChoice] = useState('service')

    useEffect(() => {
        if (name && value) setAllInputsFilled(true)
    }, [name, value])

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    async function addService() {

        if (allInputsFilled) {

            if (services.length === 10) {

                setAddServiceForm(false)

                setTimeout(() => {
                    Alert.alert('Você só pode registrar 10 serviços')
                }, 500)

            }
            else {

                const service: Service = { } as Service

                service.category = choice
                service._id = name
                service.value = value
                service.amount = amount


                // Verificando se já existe um serviço com o nome igual
                const isThereAnotherService = services.filter(service => {
                    return service._id == name
                })

                if (isThereAnotherService[0]) {

                    setAddServiceForm(false)

                    setTimeout(() => {
                        Alert.alert('Serviço existente', 'Um serviço com este nome já existe')
                    }, 500)

                } else {

                    try {

                        await AsyncStorage.setItem('services', JSON.stringify([...services, service]))

                        setServices(orderServices([...services, service]))

                        setAddServiceForm(false)

                    } catch (e) {

                        Alert.alert('Erro ao salvar no banco de dados!')

                    }

                }
            }

        } else {

            setAddServiceForm(false)
            setHideTabBar(false)
            setTimeout(() => {
                Alert.alert(
                    'Preencha todos os campos',
                    'Todos os campos do formulário precisam ser preenchidos'
                )
            }, 500)

        }

    }

    const checkTitle = () => {
        switch (choice) {
            case 'service':
                return 'Serviço'
            case 'product':
                return 'Produto'
        }
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text={`Registrar ${checkTitle()}`} />
                <FormInputs>
                    <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
                    <NameInput setName={setName} />
                    <NumberInput setValue={setValue} />
                    {choice === 'product' && (
                        <AmountInput
                            text='Estoque'
                            setAmount={setAmount}
                        />
                    )}
                </FormInputs>
                <SubmitFormButtons submit={addService} setFormOff={setAddServiceForm} submitButtonText='Cadastrar' />
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    input: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E4E4',
        color: 'black',
        padding: 0,
        margin: 0
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        color: 'black',
        padding: 4
    }
})