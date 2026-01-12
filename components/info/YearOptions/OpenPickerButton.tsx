import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ClosePickerButtonProps {
    availableYears: string[]
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ClosePickerButton({ availableYears, setShowPicker }: ClosePickerButtonProps) {

    return (
        <Pressable
            onPress={() => {
                if (availableYears.length > 1)
                    setShowPicker(true)
            }}
            style={styles.container}
        >
            <View style={styles.currentYear}>
                <Text style={{ color: '#08819B' }}>
                    Alterar Ano
                </Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    currentYear: {
        padding: 4,
        borderWidth: 1,
        borderColor: '#08819B',
        borderRadius: 4,
        marginEnd: 2,
        backgroundColor: 'rgba(8, 129, 155, 0.1)'
    }
})