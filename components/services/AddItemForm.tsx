import { Pressable, StyleSheet, View, Text } from 'react-native'
import { useState } from 'react'
import { Item, Outflow } from '@/types/index'
import FormTitle from '../common/FormTitle'
import LoadingScreen from '../common/LoadingScreen'
import ItemsCategoriesForm from './ItemsCategoriesForm'
import ServiceCreationForm from './ServiceCreationForm'
import FormContainer from '../common/FormContainer'
import useAddItem from '@/hooks/useAddItem'
import createItem from '@/functions/createItem'
import createResaleOutflow from '@/functions/createResaleOutflow'
import { BudgetCreationForm } from './BudgetCreationForm'
import ResaleCreationForm from './ResaleCreationForm'
import ResaleOrStockButtons from './ResaleOrStockButtons'
import StockCreationForm from './StockCreationForm'
import NoStockCreationForm from './NoStockCreationForm'

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

    const submitNewItem = async (): Promise<void> => {

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

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer>
                {
                    step === 0 && (
                        <>
                            <FormTitle
                                text='Novo Produto ou Serviço'
                                textColor='#330066'
                            />
                            <ItemsCategoriesForm
                                setCategory={setCategory}
                                setStep={setStep}
                            />
                        </>
                    )
                }
                {
                    step === 1 && category === 'service' && (
                        <ServiceCreationForm
                            name={name}
                            value={value}
                            setName={setName}
                            setValue={setValue}
                            setStep={setStep}
                            submitService={submitNewItem}
                        />
                    )
                }
                {
                    step === 1 && category === 'budget' && (
                        <BudgetCreationForm
                            name={name}
                            setName={setName}
                            setStep={setStep}
                            submitBudget={submitNewItem}
                        />
                    )
                }
                {
                    step === 1 && category === 'product' && (
                        <ResaleOrStockButtons
                            setStep={setStep}
                            setResale={setResale}
                            setStock={setStock}
                            setAmount={setAmount}
                        />
                    )
                }
                {
                    step === 2 && resale && (
                        <ResaleCreationForm
                            submitResale={submitNewItem}
                            setResale={setResale}
                            setStep={setStep}
                            name={name}
                            amount={amount}
                            purchaseValue={purchaseValue}
                            value={value}
                            setPurchaseDate={setPurchaseDate}
                            setAmount={setAmount}
                            setPurchaseValue={setPurchaseValue}
                            valueOutflowChoice={valueOutflowChoice}
                            setValueOutflowChoice={setValueOutflowChoice}
                            setName={setName}
                            setValue={setValue}
                        />
                    )
                }
                {
                    step === 2 && stock && (
                        <StockCreationForm
                            name={name}
                            amount={amount}
                            value={value}
                            setStep={setStep}
                            setStock={setStock}
                            setAmount={setAmount}
                            setValue={setValue}
                            setName={setName}
                            submitStock={submitNewItem}
                        />
                    )
                }
                {
                    step === 2 && !resale && !stock && (
                        <NoStockCreationForm
                            name={name}
                            value={value}
                            setStep={setStep}
                            setName={setName}
                            setValue={setValue}
                            submitNoStock={submitNewItem}
                        />
                    )
                }
            </FormContainer>
            <View style={styles.closeFormButtonContainer}>
                <Pressable
                    style={styles.closeFormButton}
                    onPress={() => {
                        setAddServiceForm(false)
                        setButton(true)
                    }}
                >
                    <Text style={styles.closeFormButtonText}>Fechar Formulário</Text>
                </Pressable>
            </View>
        </>
    )

}

const styles = StyleSheet.create({

    closeFormButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center'
    },

    closeFormButton: {
        padding: 8,
        borderRadius: 4,
        marginStart: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    closeFormButtonText: {
        color: '#00000090'
    }

})