import { Item } from '@/types'
import { EditableProperty } from '../common/EditableProperty'
import { EditNameField } from '../common/EditNameField'

interface ActualNameProps {
    item: Item
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    editName: () => Promise<void>
    showEditInput: boolean
    setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>
    isEditable: boolean
}

export default function ActualName({ item, name, setName, editName, showEditInput, setShowEditInput, isEditable }: ActualNameProps) {

    return (
        <>
            {
                !showEditInput && (
                    <EditableProperty
                        label='Nome'
                        propertyName={item._id}
                        isEditable={isEditable}
                        onEditablePropertyButtonPress={() => {
                            setShowEditInput(true)
                        }}
                    />
                )
            }
            {
                showEditInput && (
                    <EditNameField
                        defaultValue={item._id}
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