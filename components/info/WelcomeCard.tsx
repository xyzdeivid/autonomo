import { MainDisplaysContext } from '@/context/MainDisplays'
import { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'

interface WelcomeCardProps {
    setWelcomeCard: React.Dispatch<React.SetStateAction<boolean>>
    openFirstItem: () => void
}

export default function WelcomeCard({ setWelcomeCard, openFirstItem }: WelcomeCardProps) {

    const [, setShowHeader] = useContext(MainDisplaysContext).header
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    useEffect(() => {
        setHideTabBar(true)
        setShowHeader(false)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Seja bem vindo!
                    </Text>
                    <EvilIcons name='spinner-2' size={24} color='#112935' />
                </View>
                <Text style={{ marginBottom: 24, fontSize: 18 }}>
                    Nossa principal missão é ajudar você a administrar seu empreendimento!
                </Text>
                <Text style={styles.aboutText}>
                    O aplicativo consiste em basicamente três etapas, são elas:
                </Text>
                <View style={styles.infoContainer}>
                    <EvilIcons name='sc-instagram' size={24} color='#112935' />
                    <Text>
                        Cadastrar um ou mais itens de trabalho, sejam eles produtos ou serviços.
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <EvilIcons name='sc-instagram' size={24} color='#112935' />
                    <Text>
                        Registrar saídas de capital, sejam elas despesas cotidianas ou reposições de estoque.
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <EvilIcons name='sc-instagram' size={24} color='#112935' />
                    <Text>
                        Registrar entradas de capital, sejam elas a prestação de algum serviço ou venda de algum produto.
                    </Text>
                </View>
                <View style={{ marginTop: 32 }}>
                <Button
                    title='Entendi'
                    color='#112935'
                    onPress={() => {
                        setHideTabBar(false)
                        setShowHeader(true)
                        setWelcomeCard(false)
                        openFirstItem()
                    }}
                />
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        zIndex: 1
    },
    card: {
        maxWidth: '90%',
        padding: 20,
        borderRadius: 10
    },
    titleContainer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 28,
        marginBottom: 10
    },
    aboutText: {
        fontSize: 16,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
        padding: 8,
        borderRadius: 4
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginEnd: 20,
        marginBottom: 4
    }
})