import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Item, Outflow } from '@/context/DocsContext'
import NumberInput from '../common/NumberInput'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import AmountInput from '../common/AmountInput'
import LoadingScreen from '../common/LoadingScreen'
import ResaleButton from './ResaleButton'
import DateInput from '../common/DateInput'
import ValueOption from '../common/ValueOption'
import StockButton from './StockButton'
import ItemsCategoriesForm from './ItemsCategoriesForm'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import useAddItem from '@/hooks/useAddItem'
import createItem from '@/functions/createItem'
import createResaleOutflow from '@/functions/createResaleOutflow'

interface AddServiceFormProps {
    setAddServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddServiceForm({ setAddServiceForm, setButton }: AddServiceFormProps) {

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [valueOutflowChoice, setValueOutflowChoice] = useState('total')
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [resale, setResale] = useState(false)
    const [purchaseValue, setPurchaseValue] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [stock, setStock] = useState(false)
    const [step, setStep] = useState(0)

    const addItem = useAddItem().addItem

    const submitNewItem = async () => {

        setLoadingScreen(true)

        let resaleOutflow: Outflow | undefined = undefined

        // create resale outflow to submit if needed
        if (resale) {

            resaleOutflow = createResaleOutflow(
                purchaseValue,
                amount,
                purchaseDate,
                name,
                valueOutflowChoice
            )
            
        }

        // create item to submit
        const item: Item = createItem(category, name, value, amount, resale, stock)

        // add data to database and context
        await addItem(item, resaleOutflow)

        // close form
        setAddServiceForm(false)
        setButton(true)
        setLoadingScreen(false)

    }


    const getPurchaseValueText = () => {
        switch (valueOutflowChoice) {
            case 'total':
                return 'Valor de todas as unidades do produto somadas.'
            default:
                return 'Valor de cada unidade do produto.'
        }
    }

    const nextStep = () => {
        if (step === 0 && !category) {
            Alert.alert('Escolha uma categoria!')
            return
        }
        if (step === 1 && category === 'product' && resale) {
            if (!(amount && purchaseValue)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
        }
        if (step === 2 && category === 'product' && stock) {
            if (!amount) {
                Alert.alert('Preencha todos os campos!')
                return
            }
        }
        if (step === 1 && category === 'service') {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            submitNewItem()
        }
        if (step === 1 && category === 'budget') {
            if (!name) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            submitNewItem()
        }
        if (step === 2 && resale) {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            submitNewItem()
        }
        if (step === 3) {
            if (!(name && value)) {
                Alert.alert('Preencha todos os campos!')
                return
            }
            submitNewItem()
        }
        setStep(step + 1)
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer>
                {
                    step === 0 && <FormTitle
                        text='Novo Produto ou Serviço'
                        textColor='#330066'
                    />
                }
                {
                    step === 0 && (
                        <ItemsCategoriesForm category={category} setCategory={setCategory} />
                    )
                }
                {
                    step === 1 && category === 'service' && (
                        <ServiceCreationForm setName={setName} setValue={setValue} />
                    )
                }
                {
                    step === 1 && category === 'budget' && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            <Text style={{ marginBottom: 20, color: '#330066' }}>
                                O valor será definido ao registrar entrada.
                            </Text>
                        </>
                    )
                }
                {
                    step === 1 && category === 'product' && (
                        <ResaleButton
                            resale={resale}
                            setResale={setResale}
                        />
                    )
                }
                {step === 1 && resale && (
                    <>
                        <DateInput
                            setTargetDate={setPurchaseDate}
                            bgColor='#330066'
                            label='Data de Compra'
                            textColor='#330066'
                        />
                        <Text style={{
                            color: 'rgba(51, 0, 102, 0.5)',
                            fontSize: 12,
                            marginBottom: 20,
                            marginTop: -18
                        }}>
                            Data em que você comprou o produto.
                        </Text>
                        <AmountInput
                            text={resale ? 'Unidades' : 'Estoque Atual'}
                            setAmount={setAmount}
                            bgColor='rgba(51, 0, 102, 0.1)'
                            textColor='#330066'
                        />
                        <Text style={{
                            color: 'rgba(51, 0, 102, 0.5)',
                            fontSize: 12,
                            marginBottom: 20,
                            marginTop: -18
                        }}>
                            Quantas unidades do produto você comprou.
                        </Text>
                        <NumberInput
                            setValue={setPurchaseValue}
                            bgColor='rgba(51, 0, 102, 0.1)'
                            label={valueOutflowChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'}
                            textColor='#330066'
                        />
                        <ValueOption
                            choice={valueOutflowChoice}
                            setChoice={setValueOutflowChoice}
                            buttonColors={['#330066', '#6600CC']}
                        />
                        <Text style={{
                            color: 'rgba(51, 0, 102, 0.5)',
                            fontSize: 12,
                            marginBottom: 20,
                            marginTop: -18
                        }}>
                            {getPurchaseValueText()}
                        </Text>
                    </>
                )}
                {step === 2 && !resale && category === 'product' && (
                    <>
                        <StockButton
                            stock={stock}
                            setStock={setStock}
                        />
                        {
                            stock && (
                                <AmountInput
                                    text={resale ? 'Unidades' : 'Estoque Atual'}
                                    setAmount={setAmount}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                />
                            )
                        }
                    </>
                )}
                {
                    step === 2 && resale && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            {category !== 'budget' && (
                                <NumberInput
                                    setValue={setValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                    label={category === 'product' ? 'Valor de Venda (un)' : ''}
                                />
                            )}
                            <Text
                                style={{
                                    backgroundColor: 'rgba(51, 0, 102, 0.75)',
                                    color: 'white',
                                    padding: 8,
                                    borderRadius: 4
                                }}
                            >
                                Para atualizar o estoque futuramente, basta criar uma nova despesa e selecionar "Reposição de Estoque".
                            </Text>
                        </>
                    )
                }
                {
                    step === 3 && (
                        <>
                            <NameInput
                                setName={setName}
                                textColor='#330066'
                                bgColor='rgba(51, 0, 102, 0.1)'
                            />
                            {category !== 'budget' && (
                                <NumberInput
                                    setValue={setValue}
                                    bgColor='rgba(51, 0, 102, 0.1)'
                                    textColor='#330066'
                                    label={category === 'product' ? 'Valor de Venda (un)' : ''}
                                />
                            )}
                        </>
                    )
                }
            </FormContainer>
            <View style={styles.submitButtons}>
                <View>
                    <Button onPress={() => {
                        setAddServiceForm(false)
                        setButton(true)
                    }} title='Cancelar' color='gray' />
                </View>
                <View>
                    <Button onPress={() => nextStep()} title='Próximo' color='#330066' />
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 8
    },

    title: {
        fontSize: 20,
        marginBottom: 16,
        color: '#330066'
    },

    submitButtons: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    }


})