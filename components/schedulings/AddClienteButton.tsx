import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/constants/appColors'
import { EditNameCard } from '../common/EditNameCard'

interface AddCustomerButtonProps {
    setCustomer: React.Dispatch<React.SetStateAction<string>>
    addCustomer: () => Promise<void>
}

export default function AddCustomerButton({ setCustomer, addCustomer }: AddCustomerButtonProps) {

    const [active, setActive] = useState(false)

    return (
        <View style={{
            marginBottom: !active ? 24 : null
        }}>
            {
                !active
                    ? <Pressable onPress={() => setActive(true)}>
                        <Text style={{
                            ...styles.text,
                            borderWidth: 1,
                            borderColor: colors.entries.max,
                            color: colors.entries.max,
                            fontSize: 16
                        }}>Registrar Cliente</Text>
                    </Pressable>
                    :
                    <EditNameCard
                        visible={active}
                        currentName=''
                        setNewName={setCustomer}
                        onConfirmButtonPress={addCustomer}
                        onCancelButtonPress={() => setActive(false)}
                    />
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