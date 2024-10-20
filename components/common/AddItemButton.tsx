import { View, Button, StyleSheet } from 'react-native'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    bgColor?: string
}

export default function AddItemButton({ setForm, bgColor }: AddItemButtonProps) {

    return (
        <View style={styles.buttonContainer}>
            <Button
                onPress={() => setForm(true)}
                color={bgColor ? bgColor : '#08819B'}
                title='Cadastrar'
            />
        </View>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        marginTop: 16
    }
})