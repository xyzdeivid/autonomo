import { EditableProperty } from './EditableProperty'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Platform } from 'react-native'

interface EditDateFieldProps {
    defaultValue: string
    editDate: (newDate: string) => Promise<void>
    bgColor: string
    borderColor: string
}

export function EditDateField({ defaultValue, editDate, bgColor, borderColor }: EditDateFieldProps) {
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const formatDateToISO = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {

        setShowDateTimePicker(false)

        if (event.type === 'set' && selectedDate) {

            const dateString = formatDateToISO(selectedDate)

            if (dateString !== defaultValue) {

                editDate(dateString)

            }

        }

    }

    return (
        <>
            <EditableProperty
                label='Data: '
                propertyName={format(parseISO(defaultValue), 'dd/MM')}
                isEditable={true}
                onEditButtonPress={() => setShowDateTimePicker(true)}
                bgColor={bgColor}
                borderColor={borderColor}
            />
            {showDateTimePicker && (
                <DateTimePicker
                    value={parseISO(defaultValue)}
                    mode='date'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
            )}
        </>
    )
}