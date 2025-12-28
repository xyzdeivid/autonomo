import { Text, StyleSheet } from 'react-native'

import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'

interface ServiceCreationFormProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function ServiceCreationForm({ setName, setValue }: ServiceCreationFormProps) {
    return (
        <>
            <Text style={styles.title}>
                2. Preencha as informações finais do seu serviço:
            </Text>
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <NumberInput
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 16,
        color: '#330066'
    }
})