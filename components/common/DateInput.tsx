import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { View, Button, Platform, Text, StyleSheet } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface DateInputProps {
    setTargetDate: React.Dispatch<React.SetStateAction<string>>
}

export default function DateInput({ setTargetDate }: DateInputProps) {

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
        <View>
            <View style={styles.container}>
                <Text style={{ marginEnd: 2 }}>Data:</Text>
                <Button color='black' onPress={showDatepicker} title={dateFormat(getDate())} />
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

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20
    }
})