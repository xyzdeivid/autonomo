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
                color={bgColor ? bgColor : '#004AAD'}
                title='Cadastrar'
            />
        </View>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '50%',
        marginHorizontal: 'auto',
        marginTop: 16
    }
})