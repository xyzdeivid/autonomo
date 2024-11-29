import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import YearPicker from './YearOptions/YearPicker'

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
                    : <AntDesign
                        name='caretright'
                        size={24}
                        color='#08819B'
                        onPress={() => setShowPicker(true)}
                    />
            }
        </>
    )

}