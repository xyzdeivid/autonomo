import { Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    bgColor: string
    text: string
    setButton: React.Dispatch<React.SetStateAction<boolean>>
    infoButtonColor: string
}

export default function AddItemButton({ setForm, bgColor, text, setButton, infoButtonColor }: AddItemButtonProps) {

    return (
        <View style={styles.container}>
            <AntDesign name='infocirlce' size={20} color={infoButtonColor} />
            <Pressable
            style={{
                ...styles.button,
                backgroundColor: bgColor
            }}
            onPress={() => {
                setForm(true)
                setButton(false)
            }}
        >
            <Text style={{ color: 'white' }}>{text}</Text>
        </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        padding: 10,
        borderRadius: 5
    }
})