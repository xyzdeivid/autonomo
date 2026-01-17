import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { FormDateField } from '../common/FormDateField'
import { FormValueField } from '../common/FormValueField'
import { FormAmountField } from '../common/FormAmountField'
import ValueOption from '../common/ValueOption'

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
                    style={styles.card}
                >
                    <View>
                        <Text style={styles.cardTitle}>Reposição de Estoque</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom: 24 }} />
                    </View>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }} >Produto:</Text> {resaleProductName}</Text>
                    <FormDateField setTargetDate={setReplenishDate} />
                    <FormValueField label={valueLabelChoice()} setValue={setReplenishValue} />
                    <ValueOption
                        choice={replenishValueChoice}
                        setChoice={setReplenishValueChoice}
                        buttonColors={['black', 'rgba(0,0,0,0.6)']}
                    />
                    <FormAmountField text='Quantidade' setAmount={setReplenishAmount} />
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            style={{ backgroundColor: 'lightgray', padding: 10, borderRadius: 10 }}
                            onPress={() => setReplenishForm(false)}
                        >
                            <Text>Cancelar</Text>
                        </Pressable>
                        <Button title='Confirmar' color='gray' onPress={() => submitReplenishStock()} />
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
        backgroundColor: 'white',
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