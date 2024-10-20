import { View, StyleSheet, Button } from 'react-native'

interface SubmitFormButtonsProps {
    submit: () => void
    submitButtonText: string
    submitButtonColor?: string
}

export default function SubmitFormButtons({ submit, submitButtonText, submitButtonColor }: SubmitFormButtonsProps) {

    return (
        <View style={styles.button}>
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
    button: {
        alignSelf: 'center'
    }
})