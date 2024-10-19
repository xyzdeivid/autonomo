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

import { checkAllInputs, checkIfThereIsAnotherService, checkServicesAmount, checkTitle, createNewService, orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'
import ServiceOrProductButtons from './ServiceOrProductButtons'
import AmountInput from '../common/AmountInput'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    async function addService() {

        if (checkAllInputs(choice, name, value, amount)) {

            // Criando serviço
            const service = createNewService(choice, name, value, amount)

            // Configurando categoria para a lista de items
            if (!services[0]) {
                setCategory(choice)
            }

            if (checkServicesAmount(services, service)) {

                // Verificando se já existe um serviço com o nome igual
                if (checkIfThereIsAnotherService(services, name)) {

                    setTimeout(() => {
                        Alert.alert('Item existente', 'Um item com este nome já existe')
                    }, 500)

                } else {

                    try {

                        await AsyncStorage.setItem('services', JSON.stringify([...services, service]))
                        setServices(orderServices([...services, service]))

                    } catch (e) {

                        Alert.alert('Erro ao salvar no banco de dados!')

                    }

                }

            } else {

                setTimeout(() => {
                    Alert.alert('Você só pode registrar 8 items por categoria')
                }, 500)

            }

        } else {

            setTimeout(() => {
                Alert.alert(
                    'Preencha todos os campos',
                    'Todos os campos do formulário precisam ser preenchidos'
                )
            }, 500)

        }

        setAddServiceForm(false)
        setHideTabBar(false)

    }

    return (
        <FormContainer setFormOff={setAddServiceForm}>
            <FormBody>
                <FormTitle text={`Novo ${checkTitle(choice)}`}>
                <MaterialCommunityIcons name='format-float-right' size={24} color='darkgray' />
                </FormTitle>
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