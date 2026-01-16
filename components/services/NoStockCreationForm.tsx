import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
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
            <FormNameField
                label='Nome do Produto:'
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <FormValueField
                label='Valor de Venda (un):'
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
            {
                (name && value) ? (
                    <SubmitItemButton color='#330066' onPress={submitNoStock} />
                ) : null
            }
        </>
    )

}