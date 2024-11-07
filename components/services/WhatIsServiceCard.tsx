import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'
import { EvilIcons } from '@expo/vector-icons'

interface WhatIsServiceCardProps {
    setWhatIsServiceCard: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WhatIsServiceCard({ setWhatIsServiceCard, setButton }: WhatIsServiceCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    useEffect(() => {
        setButton(false)
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer
            setFormOff={setWhatIsServiceCard}
            bgColor='rgba(51, 0, 102, 0.1)'
            setButton={setButton}
        >
            <FormBody>
                <View>
                    <Text style={styles.titleText}>
                        Sobre os Itens
                    </Text>
                </View>
                <View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#330066' />
                        <Text style={{ color: '#330066' }}>
                            Na aba Itens, você pode cadastrar todos os produtos e serviços que compõem o seu trabalho.
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#330066' />
                        <Text style={{ color: '#330066' }}>
                            Esses itens serão usados para organizar e controlar o fluxo de caixa, permitindo que você registre e
                            acompanhe todas as entradas e saídas relacionadas a eles.
                        </Text>
                    </View>
                </View>
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        marginBottom: 20,
        color: '#330066'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginEnd: 20,
        marginBottom: 8
    }
})