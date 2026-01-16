import { useContext, useState } from 'react'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import { FormNameField } from '../common/FormNameField'
import { FormDateField } from '../common/FormDateField'
import { DocsContext } from '@/context/DocsContext'
import { Alert } from 'react-native'
import IntegrateStockButton from './IntegrateStockButton'
import LoadingScreen from '../common/LoadingScreen'
import { FormValueField } from '../common/FormValueField'
import ProductOptionsInput from './ProductOptionsInput'
import { FormAmountField } from '../common/FormAmountField'
import useAddOutflow from '@/hooks/useAddOutflow'
import { Outflow } from '@/types'
import { createNewOutflow } from '@/functions/createNewOutflow'
import SaveButton from '../common/SaveButton'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [services] = useContext(DocsContext).items
    const products = services.filter(item => item.resale)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [stockIntegrate, setStockIntegrate] = useState(false)
    const [product, setProduct] = useState(products[0])
    const [valueChoice, setValueChoice] = useState('total')

    const addOutflow = useAddOutflow().addOutflow

    const checkAllInputs = (): boolean => {

        if (!stockIntegrate) {
            if (name && value) return true
            return false
        }

        if (value && amount) return true
        return false

    }

    const addExpense = async () => {

        if (!checkAllInputs()) {

            Alert.alert(
                'Preencha todos os campos',
                'Todos os campos do formulário precisam ser preenchidos'
            )

            return

        }

        setLoadingScreen(true)

        const newOutflowName = stockIntegrate ? product._id : name
        const newOutflow: Outflow = createNewOutflow(valueChoice, value, amount, newOutflowName, date)

        await addOutflow(
            newOutflow, stockIntegrate ? (product.amount || 0) + amount : undefined,
            stockIntegrate ? product : undefined
        )

        setAddExpenseForm(false)
        setLoadingScreen(false)

    }


    const checkResaleButtonText = () => {
        return !stockIntegrate
            ? ''
            : valueChoice === 'total' ? 'Valor de Compra (total):' : 'Valor de Compra (un):'
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle
                    text='Nova Despesa'
                    onCloseFormButtonPress={() => setAddExpenseForm(false)}
                    textColor='#660000'
                />
                {products[0] && (
                    <IntegrateStockButton
                        setStockIntegrate={setStockIntegrate}
                    />
                )}
                {
                    !stockIntegrate
                        ? <FormNameField
                            setName={setName}
                            bgColor='rgba(102, 0, 0, 0.1)'
                            textColor='#660000'
                        />
                        : <ProductOptionsInput
                            product={product}
                            setProduct={setProduct}
                            products={products}
                        />
                }
                <FormDateField
                    setTargetDate={setDate}
                    bgColor='#66000080'
                    textColor='#660000'
                    borderBottomColor='#6600001a'
                />
                {
                    stockIntegrate && (
                        <FormAmountField
                            setAmount={setAmount}
                            text='Quantidade:'
                            bgColor='rgba(102, 0, 0, 0.1)'
                            textColor='#660000'
                        />
                    )
                }
                <FormValueField
                    setValue={setValue}
                    bgColor='#6600001a'
                    textColor='#660000'
                    label={checkResaleButtonText()}
                    valueChoice={stockIntegrate ? valueChoice : undefined}
                    setValueChoice={setValueChoice}
                    valueChoiceButtonColors={['#660000', '#990000']}
                />
                {
                    checkAllInputs() && (
                        <SaveButton color='#660000' onPress={addExpense} />
                    )
                }
            </FormContainer>
        </>
    )

}