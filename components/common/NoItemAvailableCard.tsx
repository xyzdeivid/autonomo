import { colors } from '@/styles/appColors'
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native'
import { navigate } from 'expo-router/build/global-state/routing'
import { useGetTheme } from '@/hooks/common/useGetTheme'

export function NoItemAvailableCard({ setShowFirstTimeCard }: { setShowFirstTimeCard: React.Dispatch<React.SetStateAction<boolean>> }) {

    const theme = useGetTheme()

    return (
        <Modal
            animationType='fade'
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={{
                    ...styles.card,
                    backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
                }}>
                    <View style={styles.header}>
                        <Text style={{
                            ...styles.title,
                            color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                        }}>
                            Receitas Financeiras
                        </Text>
                        <Text style={{
                            color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                        }}>
                            Aqui é onde você registra suas receitas do dia a dia, como vendas de produtos ou prestações de serviços.
                        </Text>
                    </View>

                    <View style={styles.body}>
                        <Text style={{
                            ...styles.description,
                            color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
                        }}>
                            Antes de você começar a registrar suas receitas,
                            precisamos saber seus itens de trabalho, isto é, os produtos ou serviços que você trabalha.
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed
                            ]}
                            onPress={() => {
                                setShowFirstTimeCard(false)
                                navigate('/items')
                            }}
                        >
                            <Text style={styles.buttonText}>Adicionar Item</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },

    header: {
        marginBottom: 16
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8
    },

    body: {
        marginBottom: 24
    },

    description: {
        lineHeight: 22,
        fontStyle: 'italic'
    },

    footer: {
        alignItems: 'center'
    },

    button: {
        backgroundColor: colors.entries.max,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%'
    },

    buttonPressed: {
        opacity: 0.9
    },

    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '600',
        textAlign: 'center'
    }

})