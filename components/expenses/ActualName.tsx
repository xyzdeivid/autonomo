import { Outflow } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditNameInput } from '../common/EditNameInput'

interface ActualNameProps {
    outflow: Outflow
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    editName: () => Promise<void>
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    isEditable: boolean
}

export default function ActualName({ outflow, name, setName, editName, showEditInput, setShowEditInput, isEditable }: ActualNameProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Nome'
                        propertyName={outflow.name}
                        isEditable={isEditable}
                        onEditablePropertyButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditNameInput
                        defaultValue={outflow.name}
                        newName={name}
                        setNewName={setName}
                        onSuccessButtonPress={editName}
                        onCancelButtonPress={() => {
                            setShowEditInput(false)
                            setName('')
                        }}
                    />
                )
            }

        </>
    )

}