import { View, Text, StyleSheet } from 'react-native'
import FormContainer from '../common/FormContainer'
import { useContext, useEffect } from 'react'
import { MainDisplaysContext } from '@/context/MainDisplays'
import FormBody from '../common/FormBody'

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
            bgColor='transparent'
            setButton={setButton}
        >
            <FormBody bgColor='#660000'>
                <View>
                    <Text style={styles.titleText}>
                        Sobre Saídas
                    </Text>
                </View>
                <View>
                    <Text style={{ color: '#FFFFFF' }}>
                        Nesta seção, você pode registrar todas as despesas do seu negócio, incluindo contas fixas,
                        custos operacionais e reposições de estoque para produtos destinados à venda.
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
    }
})