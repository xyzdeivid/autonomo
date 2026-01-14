import AmountInput from '../common/AmountInput'
import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'

interface StockCreationFormProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
}

export default function StockCreationForm({ setName, setValue, setAmount }: StockCreationFormProps) {

    return (
        <>
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
        </>
    )

}