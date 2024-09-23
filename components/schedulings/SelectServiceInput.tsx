import { DocsContext, Service } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'
import { View, Text } from 'react-native'

interface SelectServiceInputProps {
    setService: React.Dispatch<React.SetStateAction<Service>>
}

export default function SelectServiceInput({ setService }: SelectServiceInputProps) {

    const [services] = useContext(DocsContext).services

    return (
        <View>
            <Picker
                selectedValue={services[0]}
                onValueChange={(itemValue) => setService(itemValue)}
            >
                {services.map(service => {
                    return (
                        <Picker.Item label={service._id} value={service} />
                    )
                })}
            </Picker>
        </View>
    )

}