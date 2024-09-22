import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { View, Button, Platform, Text, Pressable } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

export default function DateInput() {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [textButton, setTextButton] = useState('')

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
        setTextButton(dateFormat(getDate()))
    }, [date])


    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginEnd: 2 }}>Data:</Text>
                <Button onPress={showDatepicker} title={textButton} />
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    )
}