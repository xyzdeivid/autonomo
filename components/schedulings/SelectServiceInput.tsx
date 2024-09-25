import { DocsContext, Service } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'
import { View } from 'react-native'

interface SelectServiceInputProps {
    service: Service
    setService: React.Dispatch<React.SetStateAction<Service>>
}

export default function SelectServiceInput({ service, setService }: SelectServiceInputProps) {

    const [services] = useContext(DocsContext).services

    return (
        <View>
            <Picker
                selectedValue={service}
                onValueChange={(itemValue) => setService(itemValue)}
            >
                {services.map(current => {
                    return (
                        <Picker.Item label={current._id} value={current} />
                    )
                })}
            </Picker>
        </View>
    )

}