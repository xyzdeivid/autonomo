import { View, StyleSheet, Button } from 'react-native'

interface SubmitFormButtonsProps {
    submit: () => void
    submitButtonText: string
    submitButtonColor: string
}

export default function SubmitFormButtons({ submit, submitButtonText, submitButtonColor }: SubmitFormButtonsProps) {

    return (
        <View style={styles.buttonContainer}>
            <Button
                color={submitButtonColor}
                title={submitButtonText}
                onPress={() => {
                    submit()
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    buttonContainer: {
        marginTop: 20,
        alignSelf: 'flex-start'
    }

})