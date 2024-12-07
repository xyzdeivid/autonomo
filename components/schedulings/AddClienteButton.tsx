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
                        <Text style={{
                            ...styles.text,
                            borderWidth: 1,
                            borderColor: '#006600',
                            color: '#006600',
                        }}>Registrar Cliente</Text>
                    </Pressable>
                    : 
                    <View>
                        <NameInput setName={setCustomer} />
                        <Pressable 
                        style={{ marginTop: -12 }}
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
                                marginBottom: 12,
                                backgroundColor: '#006600',
        color: 'white',
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
        alignSelf: 'flex-start',
        padding: 4,
        borderRadius: 4
    }
})