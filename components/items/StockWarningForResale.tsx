import { colors } from '@/styles/appColors'
import { Pressable, View, Text, StyleSheet } from 'react-native'

interface StockWarningForResaleProps {
    onRestockButtonPress: () => void
}

export function StockWarningForResale({ onRestockButtonPress }: StockWarningForResaleProps) {

    return (
        <View>
            <View>
                <View>
                    <Text style={styles.warning}>Evite erros no seu saldo!</Text>
                </View>
                <Text>
                    Para produtos que são revendidos, não recomendamos editar estoque manualmente. Ao clicar em <Text style={{ fontWeight: 'bold' }}>Repor Estoque</Text>,
                    você atualiza o estoque e registra a despesa da compra do produto de uma só vez.
                </Text>
            </View>
            <Pressable
                style={styles.resaleButton}
                onPress={onRestockButtonPress}
            >
                <Text style={{ color: 'white' }}>Repor Estoque</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

    warning: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4
    },

    resaleButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: colors.items.mid,
        alignSelf: 'flex-start',
        marginTop: 8
    }

})