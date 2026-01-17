import { ListItemCardProperty } from './ListItemCardProperty'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Platform } from 'react-native'

interface EditDateFieldProps {
    defaultValue: string
    editDate: (newDate: string) => Promise<void>
    bgColor: string
}

export function EditDateField({ defaultValue, editDate, bgColor }: EditDateFieldProps) {
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
            <ListItemCardProperty
                label='Data'
                text={format(parseISO(defaultValue), 'dd/MM')}
                bgColor={bgColor}
                onEditButtonPress={() => setShowDateTimePicker(true)}
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