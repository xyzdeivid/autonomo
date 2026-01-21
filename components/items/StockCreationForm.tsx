import { FormAmountField } from '../common/FormAmountField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface StockCreationFormProps {
    name: string
    amount: number
    value: number
    setStock: React.Dispatch<React.SetStateAction<boolean>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    submitStock: () => Promise<void>
}

export default function StockCreationForm({ name, amount, value, setStock, setName, setValue, setAmount, submitStock }: StockCreationFormProps) {

    return (
        <>
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