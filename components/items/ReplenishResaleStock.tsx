import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { FormDateField } from '../common/FormDateField'
import { FormValueField } from '../common/FormValueField'
import { FormAmountField } from '../common/FormAmountField'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'

interface ReplenishResaleStockProps {
    resaleProductName: string
    setReplenishDate: React.Dispatch<React.SetStateAction<string>>
    setReplenishValue: React.Dispatch<React.SetStateAction<number>>
    setReplenishAmount: React.Dispatch<React.SetStateAction<number>>
    setReplenishForm: React.Dispatch<React.SetStateAction<boolean>>
    replenishValueChoice: string
    setReplenishValueChoice: React.Dispatch<React.SetStateAction<string>>
    submitReplenishStock: () => void
}

const ReplenishResaleStock = ({ resaleProductName, setReplenishDate,
    setReplenishValue, setReplenishAmount,
    setReplenishForm, replenishValueChoice, setReplenishValueChoice, submitReplenishStock }: ReplenishResaleStockProps) => {

        const theme = useGetTheme()

        const labelBgColor = theme === 'dark' ? '#868686' : '#000'
        const inputBgColor = theme === 'dark' ? '#505050' : 'lightgray'

    const valueLabelChoice = () => {

        switch (replenishValueChoice) {

            case 'total':
                return 'Valor de Compra (total)'

            case 'un':
                return 'Valor de Compra (un)'

            default:
                return 'Valor de Compra (total)'

        }

    }

    return (
        <Modal
            transparent={true}
        >
            <View
                style={styles.container}
            >
                <View
                    style={{
                        ...styles.card,
                        backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
                    }}
                >
                    <View>
                        <Text 
                        style={{
                            ...styles.cardTitle,
                            color: theme === 'dark' ? '#FFF' : '#000'
                         }}
                        >
                        Reposição de {resaleProductName}
                        </Text>
                    </View>
                    <FormDateField
                        setTargetDate={setReplenishDate}
                        label='Data'
                        labelBgColor={labelBgColor}
                        buttonBgColor={inputBgColor}
                    />
                    <FormValueField
                        setValue={setReplenishValue}
                        label={valueLabelChoice()}
                        labelBgColor={labelBgColor}
                        inputBgColor={inputBgColor}
                        valueChoice={replenishValueChoice}
                        setValueChoice={setReplenishValueChoice}
                        valueChoiceButtonColors={[labelBgColor, 'rgba(0,0,0,0.6)']}
                    />
                    <FormAmountField
                        label='Quantidade'
                        setAmount={setReplenishAmount}
                        labelBgColor={labelBgColor}
                        inputBgColor={inputBgColor}
                    />
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            style={{ backgroundColor: 'lightgray', padding: 10, borderRadius: 10 }}
                            onPress={() => setReplenishForm(false)}
                        >
                            <Text>Cancelar</Text>
                        </Pressable>
                        <Button title='Confirmar' color='blue' onPress={() => submitReplenishStock()} />
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    card: {
        padding: 20,
        borderRadius: 20,
        width: '80%'
    },

    cardTitle: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center'
    },

    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 24
    }

})

export default ReplenishResaleStock