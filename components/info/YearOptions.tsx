import { useState } from 'react'
import YearPicker from './YearOptions/YearPicker'
import OpenPickerButton from './YearOptions/OpenPickerButton'

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
                    : <OpenPickerButton
                        availableYears={availableYears}
                        setShowPicker={setShowPicker}
                    />
            }
        </>
    )

}