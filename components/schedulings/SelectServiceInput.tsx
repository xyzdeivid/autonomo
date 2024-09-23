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
                selectedValue={JSON.stringify(services[0])}
                onValueChange={(itemValue) => setService(JSON.parse(itemValue))}
            >
                {services.map(service => {
                    return (
                        <Picker.Item label={service._id} value={JSON.stringify(service)} />
                    )
                })}
            </Picker>
        </View>
    )

}