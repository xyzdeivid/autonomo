import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/styles/appColors'

interface NoStockCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitNoStock: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
    inputBorderColor: string
}

export default function NoStockCreationForm({ name, value, setName, setValue, submitNoStock, labelBgColor, inputBgColor, inputBorderColor }: NoStockCreationFormProps) {

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
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitNoStock} />
                ) : null
            }
        </>
    )

}