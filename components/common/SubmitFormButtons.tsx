import { View, StyleSheet, Button } from 'react-native'

interface SubmitFormButtonsProps {
    submit: () => void
    submitButtonText: string
    submitButtonColor?: string
}

export default function SubmitFormButtons({ submit, submitButtonText, submitButtonColor }: SubmitFormButtonsProps) {

    return (
        <View style={styles.buttonsContainer}>
            <Button
                color={submitButtonColor ? submitButtonColor : '#08819B'}
                title={submitButtonText}
                onPress={() => {
                    submit()
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        padding: 8,
        borderRadius: 3
    }
})