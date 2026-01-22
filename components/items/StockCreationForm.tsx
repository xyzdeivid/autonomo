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
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export default function StockCreationForm({ name, amount, value, setStock, setName, setValue, setAmount, submitStock, labelBgColor, inputBgColor, inputBorderColor }: StockCreationFormProps) {

    return (
        <>
            <FormNameField
            setName={setName}
                label='Nome do Produto'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            <FormValueField
                setValue={setValue}
                label='Valor de Venda (un)'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            <FormAmountField
                setAmount={setAmount}
                label='Quantidade'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            {
                (name && amount && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitStock} />
                ) : null
            }
        </>
    )

}