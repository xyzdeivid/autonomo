import { FormAmountField } from '../common/FormAmountField'
import { FormDateField } from '../common/FormDateField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import CreateItemFormHeader from './CreateItemFormHeader'
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
    setStep: React.Dispatch<React.SetStateAction<number>>
    setResale: React.Dispatch<React.SetStateAction<boolean>>
    submitResale: () => Promise<void>
}

export default function ResaleCreationForm({
    submitResale,
    setResale,
    name, amount, purchaseValue, value,
    setStep,
    setPurchaseDate,
    setAmount,
    setPurchaseValue,
    valueOutflowChoice,
    setValueOutflowChoice,
    setName,
    setValue
}: ResaleCreationFormProps) {

    // Função do botão voltar do header
    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setValue(0)
        setAmount(0)
        setPurchaseValue(0)
        setStep(1)
        setResale(false)

    }

    return (
        <>
            <CreateItemFormHeader
                title='Novo Produto'
                onComeBackButtonPress={onComeBackButtonPress}
            />
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