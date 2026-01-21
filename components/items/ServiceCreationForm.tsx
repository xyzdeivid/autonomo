import { FormNameField } from '../common/FormNameField'
import { FormValueField } from '../common/FormValueField'
import SubmitItemButton from '../common/SaveButton'
import { colors } from '@/constants/appColors'

interface ServiceCreationFormProps {
    name: string
    value: number
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
    submitService: () => Promise<void>
    labelBgColor: string
    inputBgColor: string
}

export default function ServiceCreationForm({ name, value, setName, setValue, submitService, labelBgColor, inputBgColor }: ServiceCreationFormProps) {

    return (
        <>
            <FormNameField
                setName={setName}
                label='Nome do Serviço'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            <FormValueField
                setValue={setValue}
                label='Valor'
                labelBgColor={labelBgColor}
                inputBgColor={inputBgColor}
            />
            {
                (name && value) ? (
                    <SubmitItemButton color={colors.items.max} onPress={submitService} />
                ) : null
            }
        </>
    )

}