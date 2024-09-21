import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useContext, useState } from 'react'

import { DocsContext } from '@/context/DocsContext'
import FormBody from '../common/FormBody'
import NumberInput from '../common/NumberInput'
import FormContainer from '../common/FormContainer'
import SubmitFormButtons from '../common/SubmitFormButtons'
import FormTitle from '../common/FormTitle'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [, setServices] = useContext(DocsContext).services

    function addService() {

        const service = {
            _id: name, value
        }

        setServices(services => [...services, service])

        setAddServiceForm(false)

    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Registrar Serviço' />
                <View style={styles.inputContainer}>
                    <Text style={{ color: 'black' }}>Nome:</Text>
                    <TextInput style={styles.input} onChangeText={text => setName(text)} />
                </View>
                <NumberInput setValue={setValue} />
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