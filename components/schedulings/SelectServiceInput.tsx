import { Item } from '@/types/index'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, View, Text } from 'react-native'
import { Label } from '../common/Label'
import { FormFieldContainer } from '../common/FormFieldContainer'
import { colors } from '@/constants/appColors'

interface SelectServiceInputProps {
    service: Item
    setService: React.Dispatch<React.SetStateAction<Item>>
    services: Item[]
    amount?: number
}

export default function SelectServiceInput({ service, setService, services, amount }: SelectServiceInputProps) {

    return (
        <FormFieldContainer borderBottomColor={colors.entries.min}>
            <View style={{ flex: 1 }}>
                <Label text='Produto ou Serviço:' color={colors.entries.max} />
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
                        <Text style={{ color: colors.entries.max, marginTop: 4 }}>Estoque: {amount}</Text>
                    )
                }
            </View>
        </FormFieldContainer>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.entries.mid,
        borderRadius: 6,
        color: 'white'
    }
})