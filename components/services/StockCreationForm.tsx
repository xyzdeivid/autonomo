import { FormAmountField } from '../common/FormAmountField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface StockCreationFormProps {
    name: string
    amount: number
    value: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    submitStock: () => Promise<void>
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StockCreationForm({ name, amount, value, setStep, setStock, setName, setValue, setAmount, submitStock, setForm }: StockCreationFormProps) {

    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setValue(0)
        setAmount(0)
        setStep(1)
        setStock(false)

    }

    return (
        <>
            <CreateItemFormHeader
                title='Novo Produto'
                onComeBackButtonPress={onComeBackButtonPress}
                onCloseFormButtonPress={() => setForm(false)}
            />
            <FormNameField
                label='Nome do Produto:'
                setName={setName}
                textColor={colors.items.max}
                bgColor={colors.items.min}
            />
            <FormValueField
                setValue={setValue}
                bgColor={colors.items.min}
                textColor={colors.items.max}
                label='Valor de Venda (un):'
            />
            <FormAmountField
                text='Estoque Atual:'
                setAmount={setAmount}
                bgColor={colors.items.min}
                textColor={colors.items.max}
            />
            {
                (name && amount && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitStock} />
                ) : null
            }
        </>
    )

}