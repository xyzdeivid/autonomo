import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import NameInput from '../common/NameInput'

interface AddCustomerButtonProps {
    setCustomer: React.Dispatch<React.SetStateAction<string>>
    customer: string
    addCustomer: () => Promise<void>
}

export default function AddCustomerButton({ setCustomer, customer, addCustomer }: AddCustomerButtonProps) {

    const [active, setActive] = useState(false)

    return (
        <View style={{
            marginBottom: !active ? 12 : null
        }}>
            {
                !active
                    ? <Pressable onPress={() => setActive(true)}>
                        <Text style={styles.text}>Registrar Cliente</Text>
                    </Pressable>
                    : 
                    <View>
                        <NameInput setName={setCustomer} />
                        <Pressable 
                        style={{ marginTop: -16 }}
                        onPress={() => {
                            if (!customer) {
                                setActive(false)
                            } else {
                                addCustomer()
                            }
                        }}
                        >
                            <Text style={{
                                ...styles.text,
                                marginBottom: 12
                                }}>
                                Confirmar
                            </Text>
                        </Pressable>
                    </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        color: '#006600',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})