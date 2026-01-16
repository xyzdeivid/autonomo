import { FormAmountField } from '../common/FormAmountField'
import { FormDateField } from '../common/FormDateField'
import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'

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
                textColor='#330066'
                bgColor='#3300661A'
                label='Nome do Produto:'
            />
            <FormDateField
                setTargetDate={setPurchaseDate}
                bgColor='#33006680'
                label='Data de Compra:'
                textColor='#330066'
                borderBottomColor='#3300661A'
            />
            <FormAmountField
                text='Estoque:'
                setAmount={setAmount}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            <FormValueField
                setValue={setPurchaseValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                label={valueOutflowChoice === 'total' ? 'Valor de Compra (total):' : 'Valor de Compra (un):'}
                textColor='#330066'
                valueChoice={valueOutflowChoice}
                setValueChoice={setValueOutflowChoice}
            />
            <FormValueField
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
                label='Valor de Venda (un):'
            />
            {
                (name && amount && purchaseValue && value) ? (
                    <SubmitItemButton color='#330066' onPress={submitResale} />
                ) : null
            }
        </>
    )
}