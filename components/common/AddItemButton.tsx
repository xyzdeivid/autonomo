import { Pressable, StyleSheet, Text, View } from 'react-native'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    mainColor: string
    bgColor: string
    text: string
}

export default function AddItemButton({ setForm, mainColor, bgColor, text }: AddItemButtonProps) {

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    ...styles.button,
                    borderColor: mainColor,
                    backgroundColor: bgColor
                }}
                onPress={() => {
                    setForm(true)
                }}
            >
                <Text style={{ color: mainColor }}>{text}</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        marginBottom: 16
    },
    aboutButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 3
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5
    }
})