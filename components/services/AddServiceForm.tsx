import { Alert, Text } from 'react-native'
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

import { checkServicesAmount, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function AddServiceForm({ setAddServiceForm, setCategory }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [services, setServices] = useContext(DocsContext).services
    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [choice, setChoice] = useState('product')

    const checkAllInputs = (): boolean => {

        switch (choice) {

            case 'product':
                if (name && value && amount) return true
                return false

            case 'service':
                if (name && value) return true
                return false

            case 'budget':
                if (name) return true
                return false

            default:
                return false

        }

    }

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    async function addService() {

        if (checkAllInputs()) {

            const service: Service = {} as Service

            // Criando serviço
            service.category = choice
            service._id = name
            service.value = value
            service.amount = amount

            // Configurando categoria para a lista de items
            if (!services[0]) {
                setCategory(choice)
            }

            if (checkServicesAmount(services, service)) {


                // Verificando se já existe um serviço com o nome igual
                const isThereAnotherService = services.filter(service => {
                    const serviceName = service._id.toLocaleLowerCase()
                    const nameToCompare = name.toLocaleLowerCase()
                    return serviceName === nameToCompare
                })

                if (isThereAnotherService[0]) {

                    setAddServiceForm(false)

                    setTimeout(() => {
                        Alert.alert('Item existente', 'Um item com este nome já existe')
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

            } else {

                setAddServiceForm(false)

                setTimeout(() => {
                    Alert.alert('Você só pode registrar 8 items por categoria')
                }, 500)

            }

            setHideTabBar(false)

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
            case 'budget':
                return 'Orçamentário'
        }
    }

    return (
        <FormContainer setFormOff={setAddServiceForm}>
            <FormBody>
                <FormTitle text={`Registrar ${checkTitle()}`} />
                <FormInputs>
                    <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
                    {choice === 'budget' && (
                        <Text style={{ marginBottom: 20, color: 'gray' }} >O valor será definido ao registrar entrada.</Text>
                    )}
                    <NameInput setName={setName} />
                    {choice !== 'budget' && (
                        <NumberInput setValue={setValue} />
                    )}
                    {choice === 'product' && (
                        <AmountInput
                            text='Estoque'
                            setAmount={setAmount}
                        />
                    )}
                </FormInputs>
                <SubmitFormButtons submit={addService} submitButtonText='Cadastrar' />
            </FormBody>
        </FormContainer>
    )

}