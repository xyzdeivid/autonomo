import NameInput from '../common/NameInput'
import NumberInput from '../common/NumberInput'
import ProductSubCategoryHeader from './CreateItemFormHeader'
import SubmitItemButton from '../common/SaveButton'

interface NoStockCreationFormProps {
    name: string
    value: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitNoStock: () => Promise<void>
}

export default function NoStockCreationForm({ name, value, setStep, setName, setValue, submitNoStock }: NoStockCreationFormProps) {
    
    const onComeBackButtonPress = () => {

        // Zerando estados ao sair do formulário
        setName('')
        setValue(0)
        setStep(1)

    }

    return (
        <>
            <ProductSubCategoryHeader
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
                label='Valor de Venda (un)'
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            {
                (name && value) ? (
                    <SubmitItemButton submitItem={submitNoStock} />
                ) : null
            }
        </>
    )

}