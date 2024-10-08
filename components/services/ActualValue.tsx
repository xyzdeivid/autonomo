import { moneyFormat } from "@/functions/common";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface ActualValueProps {
    value: number
    setEditValueInput: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActualValue({ value, setEditValueInput }: ActualValueProps) {

    return (
        <View style={styles.container}>
            <Text>{moneyFormat(value)}</Text>
            <Pressable
                style={styles.editButton}
                onPress={() => setEditValueInput(true)}
            >
                <Text>Editar</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editButton: {
        backgroundColor: '#E0E0E0',
        borderColor: 'darkgray',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})