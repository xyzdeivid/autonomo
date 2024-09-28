import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

export default function ServicesChart() {

    function generateColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const data = [
        { value: 10, color:  generateColor()},
        { value: 20, color: generateColor() },
        { value: 30, color: generateColor() }
    ]

    return (
        <View style={{marginHorizontal: 'auto', marginVertical: 20 }}>
            <PieChart data={data} />
        </View>
    )

}