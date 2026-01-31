import { Animated, Dimensions, Text } from 'react-native'
import { Info } from './Info'
import { useEffect, useRef } from 'react'
import ContainerHandler from '../common/ContainerHandler'
import { useGetCustomersAndTheirRevenueForTheMonth } from '@/hooks/index/useGetCustomersAndTheirRevenueForTheMonth'
import { ListItem } from './ListItem'
import { useShowCustomersAndTheirRevenue } from '@/hooks/index/useShowCustomersAndTheirRevenue'

interface CustomersContentProps {
    setComingFrom: React.Dispatch<React.SetStateAction<string>>
}

export function CustomersContent({ setComingFrom }: CustomersContentProps) {

    useEffect(() => {
        setComingFrom('right')
    }, [setComingFrom])

    const customersAndTheirRevenue = useGetCustomersAndTheirRevenueForTheMonth()

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(screenWidth)).current

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
            <Info text='Quanto você ganhou de cada cliente no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }]
                }}
            >
                <ContainerHandler>
                    {showCustomersAndTheirRevenue ? customersAndTheirRevenue.map((current, index) => {
                        return (
                            <ListItem key={index} name={current.customerName} value={current.totalRevenue} />
                        )
                    }) : <Text>Nenhuma receita com cliente cadastrado.</Text>}
                </ContainerHandler>
            </Animated.View>
        </>
    )
}