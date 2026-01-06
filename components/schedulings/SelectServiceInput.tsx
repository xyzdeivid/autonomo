import { Item } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'

interface SelectServiceInputProps {
    service: Item
    setService: React.Dispatch<React.SetStateAction<Item>>
    services: Item[]
}

export default function SelectServiceInput({ service, setService, services }: SelectServiceInputProps) {

    return (
        <View>
            <Text style={styles.label}>Produto ou Serviço</Text>
            <Picker
                style={styles.inputContainer}
                selectedValue={service}
                onValueChange={(itemValue) => setService(itemValue)}
                dropdownIconColor='white'
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
        fontWeight: 'bold',
        fontSize: 16
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 102, 0, 0.75)', 
        borderRadius: 6,
        marginBottom: 20,
        color: 'white'
    }
})