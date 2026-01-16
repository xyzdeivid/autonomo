import { Item } from '@/types/index'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, View, Text } from 'react-native'
import { Label } from '../common/Label'
import { FormFieldContainer } from '../common/FormFieldContainer'

interface SelectServiceInputProps {
    service: Item
    setService: React.Dispatch<React.SetStateAction<Item>>
    services: Item[]
    amount?: number
}

export default function SelectServiceInput({ service, setService, services, amount }: SelectServiceInputProps) {

    return (
        <FormFieldContainer borderBottomColor='#0066001a'>
            <View style={{ flex: 1 }}>
                <Label text='Produto ou Serviço:' color='#006600' />
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
                {
                    amount && (
                        <Text style={{ color: '#006600', marginTop: 4 }}>Estoque: {amount}</Text>
                    )
                }
            </View>
        </FormFieldContainer>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'rgba(0, 102, 0, 0.75)',
        borderRadius: 6,
        color: 'white'
    }
})