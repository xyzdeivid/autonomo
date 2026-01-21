import React, { useCallback, useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Platform, Text, Pressable, View, StyleSheet } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { FormFieldContainer } from './FormFieldContainer'
import { Label } from './Label'

interface FormDateFieldProps {
    setTargetDate: React.Dispatch<React.SetStateAction<string>>
    label: string
    labelBgColor: string
    buttonBgColor: string
}

export function FormDateField({ setTargetDate, label, labelBgColor, buttonBgColor }: FormDateFieldProps) {

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


    const getDate = useCallback(() => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }, [date])

    useEffect(() => {
        setTargetDate(getDate())
    }, [getDate, setTargetDate])


    return (
        <FormFieldContainer>
            <View style={{ flexDirection: 'row' }} >
                <View style={{
                    ...styles.labelContainer,
                    backgroundColor: labelBgColor
                }}>
                    <Label text={label} />
                </View>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: buttonBgColor,
                    }}
                    onPress={showDatepicker}
                >
                    <Text>{dateFormat(getDate())}</Text>
                </Pressable>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onChange}
                    />
                )}
            </View>
        </FormFieldContainer>
    )
}

const styles = StyleSheet.create({

    labelContainer: {
        justifyContent: 'center',
    },

    button: {
        height: 40,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    }

})