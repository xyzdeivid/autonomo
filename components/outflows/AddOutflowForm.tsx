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
import useAddOutflow from '@/hooks/outflows/useAddOutflow'
import { Outflow } from '@/types'
import { createNewOutflow } from '@/utils/createNewOutflow'
import SaveButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'
import { getErrorMessage } from '@/utils/common'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface AddExpenseFormProps {
    setAddExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddOutflowForm({ setAddExpenseForm }: AddExpenseFormProps) {

    const theme = useGetTheme()

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

    const labelBgColor = colors.outflows.max
    const inputBgColor = theme === 'dark' ? colors.cardBackground.dark : colors.outflows.min

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

        setLoadingScreen(true)

        const newOutflowName: string = stockIntegrate ? product._id : name
        const newOutflow: Outflow = createNewOutflow(valueChoice, value, amount, newOutflowName, date)

        const result = await addOutflow(
            newOutflow,
            stockIntegrate ? product : undefined
        )

        if (!result.success && result.error) {

            Alert.alert('Erro', getErrorMessage(result.error))

        }

        setAddExpenseForm(false)
        setLoadingScreen(false)

    }


    const checkResaleButtonText = () => {
        return !stockIntegrate
            ? 'Valor'
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
                    textColor={colors.outflows.max}
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
                            label='Nome'
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                        />
                        : <ProductOptionsInput
                            product={product}
                            setProduct={setProduct}
                            products={products}
                        />
                }
                <FormDateField
                    setTargetDate={setDate}
                    label='Data'
                    labelBgColor={labelBgColor}
                    buttonBgColor={inputBgColor}
                />
                {
                    stockIntegrate && (
                        <FormAmountField
                            setAmount={setAmount}
                            label='Quantidade'
                            labelBgColor={labelBgColor}
                            inputBgColor={inputBgColor}
                        />
                    )
                }
                <FormValueField
                    setValue={setValue}
                    label={checkResaleButtonText()}
                    labelBgColor={labelBgColor}
                    inputBgColor={inputBgColor}
                    valueChoice={stockIntegrate ? valueChoice : undefined}
                    setValueChoice={setValueChoice}
                    valueChoiceButtonColors={[
                        labelBgColor, 
                        theme === 'dark' ? inputBgColor : colors.outflows.midMax
                    ]}
                />
                {
                    checkAllInputs() && (
                        <SaveButton color={colors.outflows.max} onPress={addExpense} />
                    )
                }
            </FormContainer>
        </>
    )

}