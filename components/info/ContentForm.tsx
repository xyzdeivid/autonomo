import { Button, StyleSheet, View } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { useContext, useEffect } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'

interface ContentFormProps {
    setContent: React.Dispatch<React.SetStateAction<string>>
    setContentForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContentForm({ setContent, setContentForm }: ContentFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const data = [
        ['financial', 'Financeiro'],
        ['services', 'Serviços']
    ]

    const setContentOnPage = (page: string) => {
        switch (page) {
            case 'financial':
                setContent(page)
                break
            case 'services':
                setContent(page)
                break
        }
        setContentForm(false)
        setHideTabBar(false)
    }

    return (
        <FormContainer>
            <FormBody>
                <FormTitle text='Qual conteúdo deseja mostrar?' />
                {data.map(current => {
                    return (
                        <View key={`${current[0]}-${current[1]}`} style={styles.button}>
                            <Button onPress={() => setContentOnPage(current[0])} title={current[1]} />
                        </View>
                    )
                })}
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    button: {
        marginBottom: 8
    }
})