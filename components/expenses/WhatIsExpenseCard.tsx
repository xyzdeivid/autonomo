import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'
import { EvilIcons } from '@expo/vector-icons'

interface WhatIsExpenseCardProps {
    setWhatIsExpenseCard: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WhatIsExpenseCard({ setWhatIsExpenseCard, setButton }: WhatIsExpenseCardProps) {

    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar

    useEffect(() => {
        setButton(false)
        setHideTabBar(true)
    }, [])

    return (
        <FormContainer
            setFormOff={setWhatIsExpenseCard}
            bgColor='rgba(139, 0, 0, 0.1)'
            setButton={setButton}
        >
            <FormBody>
                <View>
                    <Text style={styles.titleText}>
                        Sobre as Saídas
                    </Text>
                </View>
                <View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#660000' />
                        <Text style={{ marginBottom: 8, color: '#660000' }}>
                            Na aba Saídas, você pode registrar todas as despesas do seu negócio.
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <EvilIcons name='sc-instagram' size={24} color='#660000' />
                        <Text style={{ color: '#660000' }}>
                            Aqui, você controla desde os gastos cotidianos, como contas fixas e despesas operacionais,
                            até reposições de estoque para produtos que comercializa.
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
        color: '#660000'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginEnd: 20,
        marginBottom: 8
    }
})