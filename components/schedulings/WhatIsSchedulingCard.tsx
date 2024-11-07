import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'
import { EvilIcons } from '@expo/vector-icons'

interface WhatIsSchedulingCardProps {
    setWhatIsSchedulingCard: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WhatIsSchedulingCard({ setWhatIsSchedulingCard, setButton }: WhatIsSchedulingCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    useEffect(() => {
        setButton(false)
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer
            setFormOff={setWhatIsSchedulingCard}
            bgColor='rgba(0, 102, 0, 0.1)'
            setButton={setButton}
        >
            <FormBody>
                <View>
                    <Text style={styles.titleText}>
                        Sobre as Entradas
                    </Text>
                </View>
                <View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#006600' />
                        <Text style={{ marginBottom: 8, color: '#006600' }}>
                            Na aba Entradas, você pode registrar todas as receitas geradas pelos produtos vendidos ou serviços oferecidos.
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#006600' />
                        <Text style={{ color: '#006600' }}>
                            Aqui, você pode registrar o agendamento de algum serviço, ou a venda de algum produto.
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
        color: '#006600'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginEnd: 20,
        marginBottom: 8
    }
})