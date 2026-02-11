import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { colors } from '@/styles/appColors'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface IntegrateStockButtonProps {
    setStockIntegrate: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IntegrateStockButton({ setStockIntegrate }: IntegrateStockButtonProps) {

    const theme = useGetTheme()

    const [active, setActive] = useState(false)

    return (
        <View style={{
            marginBottom: 20,
            padding: theme === 'dark' ? 8 : 0,
            backgroundColor: theme === 'dark' ? colors.outflows.midMin : 'transparent',
            borderRadius: 4
        }}>
            <View style={styles.container}>
                <Text style={{
                    ...styles.buttonText,
                    color: theme === 'dark' ? '#FFF' : colors.outflows.max
                }}>Reposição de Estoque</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        borderColor: theme === 'dark' ? '#FFF' : colors.outflows.max,
                        backgroundColor: active ? theme === 'dark' ? '#FFF' : colors.outflows.max : 'transparent'
                    }}
                    onPress={() => {
                        setActive(!active)
                        setStockIntegrate(stockIntegrate => !stockIntegrate)
                    }}
                />
            </View>
            <Text style={{
                ...styles.warningText,
                color: theme === 'dark' ? '#FFF' : colors.outflows.mid
            }}>Caso você esteja repondo o estoque de algum produto.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        width: 25,
        height: 25,
        borderWidth: 1,
        marginStart: 4,
        borderRadius: 5
    },
    buttonText: {
        fontWeight: 'bold'
    },
    warningText: {
        color: colors.outflows.mid,
        fontSize: 12,
        marginTop: 2
    }
})