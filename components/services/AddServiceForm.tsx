import { StyleSheet, Alert } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DocsContext } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'
import { HideTabBarContext } from '@/context/HideTabBar'
import NameInput from '../common/NameInput'

import { orderServices } from '@/functions/services'
import FormInputs from '../common/FormInputs'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

    const [allInputsFilled, setAllInputsFilled] = useState(false)
    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [services, setServices] = useContext(DocsContext).services
    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        if (name && value) setAllInputsFilled(true)
    }, [name, value])

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    async function addService() {

        if (allInputsFilled) {

            // Criando novo serviço
            const service = {
                _id: name, value
            }

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

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Serviço' />
                <FormInputs>
                    <NameInput setName={setName} />
                    <NumberInput setValue={setValue} />
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