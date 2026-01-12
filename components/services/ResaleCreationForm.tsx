import AmountInput from '../common/AmountInput'
import DateInput from '../common/DateInput'
import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'
import ValueOption from '../common/ValueOption'
import { Text } from 'react-native'

interface ResaleCreationFormProps {
    setPurchaseDate: React.Dispatch<React.SetStateAction<string>>
    setAmount: React.Dispatch<React.SetStateAction<number>>
    setPurchaseValue: React.Dispatch<React.SetStateAction<number>>
    resale: boolean
    valueOutflowChoice: string
    setValueOutflowChoice: React.Dispatch<React.SetStateAction<string>>
    setName: React.Dispatch<React.SetStateAction<string>>
    category: string
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function ResaleCreationForm({
    setPurchaseDate,
    setAmount,
    setPurchaseValue,
    resale,
    valueOutflowChoice,
    setValueOutflowChoice,
    setName,
    category,
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

    return (
        <>
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
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
            {category !== 'budget' && (
                <NumberInput
                    setValue={setValue}
                    bgColor='rgba(51, 0, 102, 0.1)'
                    textColor='#330066'
                    label='Valor de Venda (un)'
                />
            )}
            <Text
                style={{
                    backgroundColor: 'rgba(51, 0, 102, 0.75)',
                    color: 'white',
                    padding: 8,
                    borderRadius: 4
                }}
            >
                Para atualizar o estoque futuramente, basta criar uma nova despesa e selecionar "Reposição de Estoque".
            </Text>
        </>
    )

}