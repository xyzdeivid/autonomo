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
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
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
    labelBgColor, inputBgColor,
    inputBorderColor
}: ResaleCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Produto'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            <FormDateField
                setTargetDate={setPurchaseDate}
                label='Data de Compra'
                labelBgColor={labelBgColor}
                buttonBgColor={inputBgColor}
                buttonBorderColor={inputBorderColor}
            />
            <FormAmountField
                setAmount={setAmount}
                label='Quantidade'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            <FormValueField
                setValue={setPurchaseValue}
                label={valueOutflowChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'}
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
                valueChoice={valueOutflowChoice}
                setValueChoice={setValueOutflowChoice}
                valueChoiceButtonColors={[labelBgColor, inputBgColor]}
            />
            <FormValueField
                setValue={setValue}
                label='Valor de Venda (un)'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
                inputBorderColor={inputBorderColor}
            />
            {
                (name && amount && purchaseValue && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitResale} />
                ) : null
            }
        </>
    )
}