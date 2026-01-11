import NameInput from "../common/NameInput"
import NumberInput from "../common/NumberInput"

interface NoStockCreationFormProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function NoStockCreationForm({ setName, setValue }: NoStockCreationFormProps) {

    return (
        <>
            <NameInput
                setName={setName}
                textColor='#330066'
                bgColor='rgba(51, 0, 102, 0.1)'
            />
            <NumberInput
                setValue={setValue}
                bgColor='rgba(51, 0, 102, 0.1)'
                textColor='#330066'
            />
        </>
    )

}