import { Outflow } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditNameField } from '../common/EditNameField'

interface ActualNameProps {
    outflow: Outflow
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    editName: () => Promise<void>
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    isEditable: boolean
}

export function ActualName({ outflow, name, setName, editName, showEditInput, setShowEditInput, isEditable }: ActualNameProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Nome: '
                        propertyName={outflow.name}
                        isEditable={isEditable}
                        onEditButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditNameField
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