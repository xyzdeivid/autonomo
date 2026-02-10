import { FormAmountField } from '../common/FormAmountField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'

interface StockCreationFormProps {
    name: string
    amount: number
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    submitStock: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
}

export default function StockCreationForm({ name, amount, value, setName, setValue, setAmount, submitStock, labelBgColor, inputBgColor }: StockCreationFormProps) {

    return (
        <>
            <FormNameField
            setName={setName}
                label='Nome do Produto'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            <FormValueField
                setValue={setValue}
                label='Valor de Venda (un)'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            <FormAmountField
                setAmount={setAmount}
                label='Quantidade'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            {
                (name && amount && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitStock} />
                ) : null
            }
        </>
    )

}