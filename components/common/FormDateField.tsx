import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Platform, Text, Pressable } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Label } from './Label'
import { FormFieldContainer } from './FormFieldContainer'

interface FormDateFieldProps {
    setTargetDate: React.Dispatch<React.SetStateAction<string>>
    bgColor?: string
    label?: string
    textColor?: string
    borderBottomColor?: string
}

export function FormDateField({ setTargetDate, bgColor, label, textColor, borderBottomColor }: FormDateFieldProps) {

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const showDatepicker = () => {
        setShow(true)
    }

    const dateFormat = (date: string) => {
        const formatedDate = format(parseISO(date), 'dd/MM')
        return formatedDate
    }


    const getDate = () => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }


    useEffect(() => {
        setTargetDate(getDate())
    }, [date])

    return (
        <FormFieldContainer borderBottomColor={borderBottomColor}>
            <Label text={label ? label : 'Data'} color={textColor ? textColor : ''} />
            <Pressable 
            style={{ 
                backgroundColor: bgColor ? bgColor : '#00000080',
                padding: 8,
                borderRadius: 4,
                marginStart: 8
            }}
            onPress={showDatepicker}
            >
                <Text style={{ color: 'white' }}>{dateFormat(getDate())}</Text>
            </Pressable>
            {show && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onChange}
                />
            )}
        </FormFieldContainer>
    )
}