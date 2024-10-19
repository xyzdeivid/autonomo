import { Button, StyleSheet, View } from 'react-native'
import FormBody from '../common/FormBody'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { useContext, useEffect } from 'react'
import { HideTabBarContext } from '@/context/HideTabBar'
import { DocsContext } from '@/context/DocsContext'
import { thereIsBudget, thereIsProduct, thereIsService } from '@/functions/info'

interface ContentFormProps {
    setContent: React.Dispatch<React.SetStateAction<string>>
    setContentForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContentForm({ setContent, setContentForm }: ContentFormProps) {

    const [, setHideTabBar] = useContext(HideTabBarContext)
    const [schedulings] = useContext(DocsContext).schedulings

    useEffect(() => {
        setHideTabBar(true)
    }, [])

    const setContentOnPage = (page: string) => {
        setContent(page)
        setContentForm(false)
        setHideTabBar(false)
    }

    return (
        <FormContainer setFormOff={setContentForm}>
            <FormBody>
                <FormTitle text='Qual conteúdo deseja mostrar?' />
                <View style={styles.button}>
                    <Button onPress={() => setContentOnPage('financial')} title='Finanças Gerais' />
                </View>
                {
                    thereIsProduct(schedulings) && (
                        <View style={styles.button}>
                            <Button onPress={() => setContentOnPage('products')} title='Produtos' />
                        </View>
                    )
                }
                {
                    thereIsService(schedulings) && (
                        <View style={styles.button}>
                            <Button onPress={() => setContentOnPage('services')} title='Serviços' />
                        </View>
                    )
                }
                {
                    thereIsBudget(schedulings) && (
                        <Button onPress={() => setContentOnPage('budgets')} title='Orçamentários' />
                    )
                }
            </FormBody>
        </FormContainer>
    )

}

const styles = StyleSheet.create({
    button: {
        marginBottom: 8
    }
})