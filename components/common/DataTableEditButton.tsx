import { useGetTheme } from '@/hooks/common/useGetTheme'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper'

export function DataTableEditButton({ onPress }: { onPress: () => void }) {

    const theme = useGetTheme()

    return (
        <DataTable.Cell
            style={styles.button}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <Text
                    style={{
                        ...styles.text,
                        color: theme === 'dark' ? '#89D4EF' : '#066C9180',
                        textDecorationColor: theme === 'dark' ? '#89D4EF' : '#066C9180'
                    }}
                >
                    Editar
                </Text>
            </TouchableOpacity>
        </DataTable.Cell>
    )

}

const styles = StyleSheet.create({

    button: {
        justifyContent: 'center'

    },

    text: {
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    }

})