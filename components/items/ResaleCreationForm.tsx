import { FormAmountField } from '../common/FormAmountField'
import { FormDateField } from '../common/FormDateField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface ResaleCreationFormProps {
    name: string
    amount: number
    purchaseValue: number
    value: number
    setPurchaseDate: React.Dispatch<React.SetStateAction<string>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    setPurchaseValue: React.Dispatch<React.SetStateAction<number>>
    valueOutflowChoice: string
    setValueOutflowChoice: React.Dispatch<React.SetStateAction<string>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitResale: () => Promise<void>
}

export default function ResaleCreationForm({
    submitResale,
    name, amount, purchaseValue, value,
    setPurchaseDate,
    setAmount,
    setPurchaseValue,
    valueOutflowChoice,
    setValueOutflowChoice,
    setName,
    setValue,
}: ResaleCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                textColor={colors.items.max}
                bgColor={colors.items.min}
                label='Nome do Produto:'
            />
            <FormDateField
                setTargetDate={setPurchaseDate}
                bgColor={colors.items.max}
                label='Data de Compra:'
                textColor={colors.items.max}
                borderBottomColor={colors.items.min}
            />
            <FormAmountField
                text='Estoque:'
                setAmount={setAmount}
                bgColor={colors.items.min}
                textColor={colors.items.max}
            />
            <FormValueField
                setValue={setPurchaseValue}
                bgColor={colors.items.min}
                label={valueOutflowChoice === 'total' ? 'Valor de Compra (total):' : 'Valor de Compra (un):'}
                textColor={colors.items.max}
                valueChoice={valueOutflowChoice}
                setValueChoice={setValueOutflowChoice}
                valueChoiceButtonColors={[colors.items.max, colors.items.mid]}
            />
            <FormValueField
                setValue={setValue}
                bgColor={colors.items.min}
                textColor={colors.items.max}
                label='Valor de Venda (un):'
            />
            {
                (name && amount && purchaseValue && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitResale} />
                ) : null
            }
        </>
    )
}