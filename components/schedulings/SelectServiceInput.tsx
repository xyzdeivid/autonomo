import { Service } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'

interface SelectServiceInputProps {
    service: Service
    setService: React.Dispatch<React.SetStateAction<Service>>
    services: Service[]
}

export default function SelectServiceInput({ service, setService, services }: SelectServiceInputProps) {

    return (
        <View>
            <Text style={styles.label}>Produto / Serviço / Orçamentário:</Text>
            <Picker
                style={styles.inputContainer}
                selectedValue={service}
                onValueChange={(itemValue) => setService(itemValue)}
            >
                {services.map(current => {
                    return (
                        <Picker.Item key={current._id} label={current._id} value={current} />
                    )
                })}
            </Picker>
        </View>
    )

}

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        color: '#006600',
        fontWeight: 'bold'
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 102, 0, 0.1)', 
        borderRadius: 6,
        marginBottom: 20
    }
})