import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import YearPicker from './YearOptions/YearPicker'
import ClosePickerButton from './YearOptions/ClosePickerButton'

interface YearOptionsProps {
    availableYears: string[]
}

export default function YearOptions({ availableYears }: YearOptionsProps) {

    const [showPicker, setShowPicker] = useState(false)

    return (
        <>
            {
                showPicker
                    ? <YearPicker
                        availableYears={availableYears}
                        setShowPicker={setShowPicker}
                    />
                    : <ClosePickerButton
                        setShowPicker={setShowPicker}
                    />
            }
        </>
    )

}