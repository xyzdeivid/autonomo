import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

interface IntegrateStockButtonProps {
    setStockIntegrate: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IntegrateStockButton({ setStockIntegrate }: IntegrateStockButtonProps) {

    const [active, setActive] = useState(false)

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={styles.container}>
                <Text style={styles.buttonText}>Reposição de Estoque</Text>
                <Pressable
                    style={{
                        ...styles.box,
                        backgroundColor: active ? '#660000' : 'transparent'
                    }}
                    onPress={() => {
                        setActive(!active)
                        setStockIntegrate(stockIntegrate => !stockIntegrate)
                    }}
                />
            </View>
            <Text style={styles.warningText}>Preencha se a saída for a reposição do estoque de algum produto.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    box: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#660000',
        marginStart: 4,
        borderRadius: 5
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#660000'
    },
    warningText: {
        color: 'rgba(139, 0, 0, 0.5)',
        fontSize: 12,
        marginTop: 2
    }
})