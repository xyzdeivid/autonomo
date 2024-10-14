import { Alert, Text, View } from 'react-native'
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
import NoValueButton from './NoValueButton'
import InfoTitle from '../common/InfoTitle'

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
    const [choice, setChoice] = useState('product')
    const [noValue, setNoValue] = useState(false)

    useEffect(() => {
        if (name) setAllInputsFilled(true)
    }, [name])

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    useEffect(() => {
        noValue
            ? setChoice('budget')
            : setChoice('service')
    }, [noValue])

    async function addService() {

        if (allInputsFilled) {

            const service: Service = {} as Service

            service.category = choice
            service._id = name
            service.value = value
            service.amount = amount

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

            } else {

                setAddServiceForm(false)

                setTimeout(() => {
                    Alert.alert('Você só pode registrar 8 items por categoria')
                }, 500)

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
            case 'budget':
                return 'Serviço Orçamentário'
        }
    }

    return (
        <FormContainer setFormOff={setAddServiceForm}>
            <FormBody>
                <FormTitle text={`Registrar ${checkTitle()}`} />
                <FormInputs>
                    <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
                    {choice === 'budget' && (
                        <Text style={{ marginBottom: 20, color: 'darkgray' }} >O valor será definido ao registrar entrada.</Text>
                    )}
                    <NameInput setName={setName} />
                    {!noValue && (
                        <NumberInput setValue={setValue} />
                    )}
                    {choice === 'service' || choice === 'budget'
                        ? <NoValueButton
                            noValue={noValue}
                            setNoValue={setNoValue}
                            setChoice={setChoice}
                        />
                        : null
                    }
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