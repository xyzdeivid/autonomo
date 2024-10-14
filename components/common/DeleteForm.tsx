import FormBody from './FormBody'
import FormContainer from './FormContainer'
import FormTitle from './FormTitle'
import SubmitFormButtons from './SubmitFormButtons'

interface DeleteServiceFormProps {
    targetName: string
    deleteFunction: (id: string) => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteForm({ targetName, deleteFunction, setFormOff }: DeleteServiceFormProps) {

    return (
        <FormContainer setFormOff={setFormOff}>
            <FormBody>
                <FormTitle text='Confirmar exclusão?' />
                <SubmitFormButtons submit={() => deleteFunction(targetName)} submitButtonText='Excluir' />
            </FormBody>
        </FormContainer>
    )

}