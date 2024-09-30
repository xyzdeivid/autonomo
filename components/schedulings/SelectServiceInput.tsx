import { DocsContext, Service } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

interface SelectServiceInputProps {
    service: Service
    setService: React.Dispatch<React.SetStateAction<Service>>
}

export default function SelectServiceInput({ service, setService }: SelectServiceInputProps) {

    const [services] = useContext(DocsContext).services

    return (
        <View>
            <Picker
                style={styles.container}
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
    container: {
        backgroundColor: '#E0E0E0', 
        borderRadius: 6,
        marginBottom: 20
    }
})