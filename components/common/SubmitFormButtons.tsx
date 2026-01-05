import { View, StyleSheet, Button } from 'react-native'

interface SubmitFormButtonsProps {
    cancel: () => void
    submit: () => void
    submitButtonText: string
    submitButtonColor: string
}

export default function SubmitFormButtons({ cancel, submit, submitButtonText, submitButtonColor }: SubmitFormButtonsProps) {

    return (
        <View style={styles.buttonContainer}>
            <Button 
                color="gray"
                title="Cancelar"
                onPress={() => {
                    cancel()
                }}
            />
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})