import { DocsContext } from '@/context/DocsContext'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { navigate } from 'expo-router/build/global-state/routing'
import { useContext } from 'react'
import { Modal, Text, View, StyleSheet, ScrollView, Pressable } from 'react-native'

export function FirstTimeCard() {

    const theme = useGetTheme()

    const [, setFirstTime] = useContext(DocsContext).firstTime

    return (
        <Modal
            animationType="fade"
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={{ ...styles.container, backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ ...styles.title, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Bem vindo ao App Autônomo!</Text>

                        <Text style={{ ...styles.description, color: theme === 'dark' ? colors.cardText.dark : '#666' }}>
                            Aqui será possível você organizar seu negócio de forma profissional.
                        </Text>

                        <View style={styles.section}>
                            <Text style={{ ...styles.sectionTitle, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>O uso consiste em passos simples:</Text>
                            <View style={{ ...styles.list, backgroundColor: theme === 'dark' ? '#1B1B1B' : '#EAEAEA' }}>
                                <Text style={{ ...styles.listItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>• Cadastrar itens (produtos/serviços)</Text>
                                <Text style={{ ...styles.listItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>• Lançar receitas e despesas</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={{ ...styles.sectionTitle, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>Funcionalidades principais:</Text>
                            <View style={styles.featureList}>
                                <Text style={{ ...styles.featureItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>- Balanço financeiro mensal</Text>
                                <Text style={{ ...styles.featureItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>- Receita diária</Text>
                                <Text style={{ ...styles.featureItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>- Faturamento por item</Text>
                                <Text style={{ ...styles.featureItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>- Faturamento por cliente</Text>
                                <Text style={{ ...styles.featureItem, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}>- Volume de vendas</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: colors.items.max },
                                pressed && styles.buttonPressed
                            ]}
                            onPress={() => {
                                setFirstTime(false)
                                navigate('/items')
                            }}
                        >
                            <Text style={styles.buttonText}>
                                Cadastrar Primeiro Item
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: colors.home.max },
                                pressed && styles.buttonPressed
                            ]}
                            onPress={() => {
                                setFirstTime(false)
                            }}
                        >
                            <Text style={styles.buttonText}>
                                Explorar Primeiro
                            </Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    container: {
        width: '100%',
        borderRadius: 20,
        padding: 24,
        maxHeight: '80%',
        elevation: 5
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12
    },

    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22
    },

    section: {
        marginBottom: 20
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8
    },

    list: {
        backgroundColor: '#F0F4F8',
        padding: 12,
        borderRadius: 10
    },

    listItem: {
        fontSize: 14,
        marginBottom: 4
    },

    featureList: {
        gap: 8
    },

    featureItem: {
        fontSize: 14,
        paddingVertical: 2
    },

    buttonsContainer: {
        marginTop: 20,
        gap: 8
    },

    button: {
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center'
    },

    buttonPressed: {
        opacity: 0.9
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    }

})