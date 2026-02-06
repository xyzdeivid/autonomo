import { Animated, Dimensions, Text } from 'react-native'
import { Info } from './Info'
import { useEffect, useRef } from 'react'
import { useGetCustomersAndTheirRevenueForTheMonth } from '@/hooks/index/useGetCustomersAndTheirRevenueForTheMonth'
import { ListItem } from './ListItem'
import { useShowCustomersAndTheirRevenue } from '@/hooks/index/useShowCustomersAndTheirRevenue'

interface CustomersContentProps {
    comingFrom: number
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function CustomersContent({ comingFrom, setComingFrom }: CustomersContentProps) {

    useEffect(() => {
        setComingFrom(3)
    }, [setComingFrom])

    const customersAndTheirRevenue = useGetCustomersAndTheirRevenueForTheMonth()

    const screenWidth = Dimensions.get('window').width
    const direction = comingFrom < 3 ? screenWidth : -screenWidth
    const slideAnim = useRef(new Animated.Value(direction)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const showCustomersAndTheirRevenue = useShowCustomersAndTheirRevenue()

    return (
        <>
            <Info text='Quanto você faturou com cada cliente no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }]
                }}
            >
                {showCustomersAndTheirRevenue ? customersAndTheirRevenue.map((current, index) => {
                    return (
                        <ListItem
                            key={index}
                            name={current.customerName}
                            value={current.totalRevenue}
                            money={true}
                        />
                    )
                }) : <Text>Nenhuma receita com cliente cadastrado.</Text>}
            </Animated.View>
        </>
    )
}