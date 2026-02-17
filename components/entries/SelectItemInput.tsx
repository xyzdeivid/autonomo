import { Item } from '@/types/index'
import { Picker } from '@react-native-picker/picker'
import { Text, View } from 'react-native'
import { FormFieldContainer } from '../common/FormFieldContainer'
import { colors } from '@/styles/appColors'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface SelectServiceInputProps {
    service: Item
    setService: React.Dispatch<React.SetStateAction<Item>>
    services: Item[]
    amount?: number
}

export default function SelectServiceInput({ service, setService, services, amount }: SelectServiceInputProps) {

    const theme = useGetTheme()

    return (
        <FormFieldContainer>
            <View style={{ borderRadius: 6, overflow: 'hidden' }}>
                <Picker
                    style={{
                        backgroundColor: colors.entries.max,
                        color: 'white'
                    }}
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
            {
                amount ? (
                    <Text style={{
                        color: theme === 'dark' ? '#FFF' : colors.entries.max,
                        marginTop: 4
                    }}>Estoque: {amount}</Text>
                ) : null
            }
        </FormFieldContainer>
    )

}