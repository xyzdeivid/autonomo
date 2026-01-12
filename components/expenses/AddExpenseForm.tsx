import { useContext, useState } from 'react'
import FormContainer from '../common/FormContainer'
import FormTitle from '../common/FormTitle'
import NameInput from '../common/NameInput'
import DateInput from '../common/DateInput'
import SubmitFormButtons from '../common/SubmitFormButtons'
import { DocsContext } from '@/context/DocsContext'
import { Alert } from 'react-native'
import FormInputs from '../common/FormInputs'
import IntegrateStockButton from './IntegrateStockButton'
import LoadingScreen from '../common/LoadingScreen'
import NumberInput from '../common/NumberInput'
import ProductOptionsInput from './ProductOptionsInput'
import AmountInput from '../common/AmountInput'
import ValueOption from '../common/ValueOption'
import useAddOutflow from '@/hooks/useAddOutflow'
import { Outflow } from '@/types'
import createOutflow from '@/functions/createOutflow'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpenseForm({ setAddExpenseForm, setButton }: AddExpenseFormProps) {

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

        const resaleValue = valueChoice === 'total' ? value : value * amount

        const newOutflow: Outflow = createOutflow(
            stockIntegrate, name,
            product, date,
            value, resaleValue,
            amount
        )

        await addOutflow(
            newOutflow, stockIntegrate ? (product.amount || 0) + amount : undefined,
            stockIntegrate ? product : undefined
        )

        setAddExpenseForm(false)
        setButton(true)
        setLoadingScreen(false)

    }


    const checkResaleButtonText = () => {
        return !stockIntegrate
            ? ''
            : valueChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'
    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <FormContainer
            >
                <FormTitle text='Nova Despesa' textColor='#660000' />
                <FormInputs>
                    {products[0] && (
                        <IntegrateStockButton
                            setStockIntegrate={setStockIntegrate}
                        />
                    )}
                    {
                        !stockIntegrate
                            ? <NameInput
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
                    <DateInput
                        setTargetDate={setDate}
                        bgColor='#660000'
                        textColor='#660000'
                    />
                    <NumberInput
                        setValue={setValue}
                        bgColor='rgba(102, 0, 0, 0.1)'
                        textColor='#660000'
                        label={checkResaleButtonText()}
                    />
                    {stockIntegrate && (
                        <>
                            <ValueOption
                                choice={valueChoice}
                                setChoice={setValueChoice}
                                buttonColors={['#660000', '#990000']}
                            />
                            <AmountInput
                                setAmount={setAmount}
                                text='Quantidade'
                                bgColor='rgba(102, 0, 0, 0.1)'
                                textColor='#660000'
                            />
                        </>
                    )}
                </FormInputs>
            </FormContainer>
            <SubmitFormButtons
                cancel={() => {
                    setAddExpenseForm(false)
                    setButton(true)
                }}
                submit={addExpense}
                submitButtonText='Registrar'
                submitButtonColor='#660000'
            />
        </>
    )

}