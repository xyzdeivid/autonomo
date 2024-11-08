import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'

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
                        Sobre Itens
                    </Text>
                </View>
                <View>
                    <Text style={{ color: '#330066', marginBottom: 4 }}>
                        Nesta seção, você pode cadastrar todos os produtos e serviços que fazem parte do seu trabalho.
                    </Text>
                    <Text style={{ color: '#330066' }}>
                        Esses itens são fundamentais para o controle do seu fluxo de caixa, pois permitem registrar e
                        monitorar todas as entradas financeiras associadas.
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
        color: '#330066'
    }
})