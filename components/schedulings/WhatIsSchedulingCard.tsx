import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'

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
            bgColor='transparent'
            setButton={setButton}
        >
            <FormBody bgColor='#006600'>
                <View>
                    <Text style={styles.titleText}>
                        Sobre Entradas
                    </Text>
                </View>
                <View>
                    <Text style={{ color: '#FFFFFF' }}>
                        Nesta seção, você pode registrar todas as receitas do seu negócio, incluindo valores recebidos
                        pela venda de produtos e pela prestação de serviços.
                    </Text>
                </View>
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FFFFFF'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginEnd: 20,
        marginBottom: 8
    }
})