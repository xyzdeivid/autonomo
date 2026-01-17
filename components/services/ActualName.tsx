import { Item } from '@/types'
import { ListItemCardProperty } from '../common/ListItemCardProperty'
import { EditNameField } from '../common/EditNameField'
import { colors } from '@/constants/appColors'

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
                    <ListItemCardProperty
                        label='Nome: '
                        propertyName={item._id}
                        isEditable={isEditable}
                        onEditButtonPress={() => {
                            setShowEditInput(true)
                        }}
                        bgColor={colors.items.min}
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