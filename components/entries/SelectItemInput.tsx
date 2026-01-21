import { Item } from '@/types/index'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text } from 'react-native'
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
        <FormFieldContainer>
                <Text>Produto ou Serviço</Text>
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
                    amount ? (
                        <Text style={{ color: colors.entries.max, marginTop: 4 }}>Estoque: {amount}</Text>
                    ) : null
                }
        </FormFieldContainer>
    )

}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.entries.max,
        borderRadius: 6,
        color: 'white'
    }
})