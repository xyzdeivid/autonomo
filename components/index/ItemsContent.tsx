import { useGetItemsAndTheirValuesForTheMonth } from '@/hooks/index/useGetItemsAndTheirValuesForTheMonth'
import { Animated, Dimensions, Text } from 'react-native'
import ContainerHandler from '../common/ContainerHandler'
import { useEffect, useRef } from 'react'
import { Info } from './Info'
import { ListItem } from './ListItem'
import { useShowInsights } from '@/hooks/index/useShowInsights'

interface ItemsContentProps {
    comingFrom: number
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function ItemsContent({ comingFrom, setComingFrom }: ItemsContentProps) {

    useEffect(() => {
        setComingFrom(2)
    }, [setComingFrom])

    const itemsAndTheirValuesForTheMonth = useGetItemsAndTheirValuesForTheMonth()

    const screenWidth = Dimensions.get('window').width
    const direction = comingFrom < 2 ? screenWidth : -screenWidth
    const slideAnim = useRef(new Animated.Value(direction)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const showInsights = useShowInsights()

    return (
        <>
            <Info text='Quanto você faturou com cada produto ou serviço no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                }}
            >
                {
                    showInsights &&
                    <ContainerHandler>
                        {itemsAndTheirValuesForTheMonth.map((current, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    name={current.productName}
                                    value={current.totalRevenue}
                                    money={true}
                                />
                            )
                        })}
                    </ContainerHandler>
                }
                {
                    !showInsights &&
                    <Text>Nenhuma receita cadastrada.</Text>
                }
            </Animated.View>
        </>
    )

}