import AmountInput from '../common/AmountInput'
import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'
import CreateItemFormHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'

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
}

export default function StockCreationForm({ name, amount, value, setStep, setStock, setName, setValue, setAmount, submitStock }: StockCreationFormProps) {

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
            />
            <NameInput
                label='Nome do Produto'
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <NumberInput
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
                label='Valor de Venda (un)'
            />
            <AmountInput
                text='Estoque Atual'
                setAmount={setAmount}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            {
                (name && amount && value) ? (
                    <SubmitItemButton color='#330066' submitItem={submitStock} />
                ) : null
            }
        </>
    )

}