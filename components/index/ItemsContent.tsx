import { useGetItemsAndTheirValuesForTheMonth } from '@/hooks/index/useGetItemsAndTheirValuesForTheMonth'
import { Animated, Dimensions } from 'react-native'
import ContainerHandler from '../common/ContainerHandler'
import { useEffect, useRef } from 'react'
import { Info } from './Info'
import { ListItem } from './ListItem'

interface ItemsContentProps {
    comingFrom: string
    setComingFrom: React.Dispatch<React.SetStateAction<string>>
}

export function ItemsContent({ comingFrom, setComingFrom }: ItemsContentProps) {

    useEffect(() => {
        setComingFrom('right')
    }, [setComingFrom])

    const itemsAndTheirValuesForTheMonth = useGetItemsAndTheirValuesForTheMonth()

    const screenWidth = Dimensions.get('window').width
    const direction = comingFrom === 'right' ? -screenWidth : screenWidth
    const slideAnim = useRef(new Animated.Value(direction)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    return (
        <>
            <Info text='Quanto você ganhou de cada produto ou serviço no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                }}
            >
                <ContainerHandler>
                    {itemsAndTheirValuesForTheMonth.map((current, index) => {
                        return (
                            <ListItem key={index} name={current.productName} value={current.totalRevenue} />
                        )
                    })}
                </ContainerHandler>
            </Animated.View>
        </>
    )

}