import { Pressable, StyleSheet, Text } from 'react-native'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    bgColor: string
    text: string
}

export default function AddItemButton({ setForm, bgColor, text }: AddItemButtonProps) {

    return (
        <Pressable 
        style={{
            ...styles.buttonContainer,
        backgroundColor: bgColor
        }}
        onPress={() => setForm(true)}
        >
            <Text style={{ color: 'white' }}>{text}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        margin: 20,
        padding: 10,
        borderRadius: 10
    }
})