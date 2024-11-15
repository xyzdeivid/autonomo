import { View, StyleSheet, Button } from 'react-native'

interface SubmitFormButtonsProps {
    submit: () => void
    submitButtonText: string
    submitButtonColor: string
}

export default function SubmitFormButtons({ submit, submitButtonText, submitButtonColor }: SubmitFormButtonsProps) {

    return (
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
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