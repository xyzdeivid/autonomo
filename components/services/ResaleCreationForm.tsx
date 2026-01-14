import AmountInput from '../common/AmountInput'
import DateInput from '../common/DateInput'
import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'
import ValueOption from '../common/ValueOption'
import { Text } from 'react-native'
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

    const getPurchaseValueText = () => {

        switch (valueOutflowChoice) {

            case 'total':
                return 'Valor de todas as unidades do produto somadas.'

            default:
                return 'Valor de cada unidade do produto.'

        }

    }

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
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
                label='Nome do Produto'
            />
            <DateInput
                setTargetDate={setPurchaseDate}
                bgColor='#330066'
                label='Data de Compra'
                textColor='#330066'
            />
            <Text style={{
                color: 'rgba(51, 0, 102, 0.5)',
                fontSize: 12,
                marginBottom: 20,
                marginTop: -18
            }}>
                Data em que você comprou o produto.
            </Text>
            <AmountInput
                text='Unidades'
                setAmount={setAmount}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            <Text style={{
                color: 'rgba(51, 0, 102, 0.5)',
                fontSize: 12,
                marginBottom: 20,
                marginTop: -18
            }}>
                Quantas unidades do produto você comprou.
            </Text>
            <NumberInput
                setValue={setPurchaseValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                label={valueOutflowChoice === 'total' ? 'Valor de Compra (total)' : 'Valor de Compra (un)'}
                textColor='#330066'
            />
            <ValueOption
                choice={valueOutflowChoice}
                setChoice={setValueOutflowChoice}
                buttonColors={['#330066', '#6600CC']}
            />
            <Text style={{
                color: 'rgba(51, 0, 102, 0.5)',
                fontSize: 12,
                marginBottom: 20,
                marginTop: -18
            }}>
                {getPurchaseValueText()}
            </Text>
            <NumberInput
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
                label='Valor de Venda (un)'
            />
            {
                (name && amount && purchaseValue && value) ? (
                    <SubmitItemButton submitItem={submitResale} />
                ) : null
            }
        </>
    )
}