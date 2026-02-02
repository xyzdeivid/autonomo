import { Animated, Dimensions, Text } from 'react-native'
import { Info } from './Info'
import { useEffect, useRef } from 'react'
import ContainerHandler from '../common/ContainerHandler'
import { useGetItemsAndTheirAmountForTheMonth } from '@/hooks/index/useGetItemsAndTheirAmountForTheMonth'
import { ListItem } from './ListItem'
import { useShowInsights } from '@/hooks/index/useShowInsights'

interface AmountContentProps {
    setComingFrom: React.Dispatch<React.SetStateAction<number>>
}

export function AmountContent({ setComingFrom }: AmountContentProps) {

    useEffect(() => {
        setComingFrom(4)
    }, [setComingFrom])

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(screenWidth)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const itemsAndTheirAmount = useGetItemsAndTheirAmountForTheMonth()
    const showInsights = useShowInsights()

    return (
        <>
            <Info text='Quantas vezes um produto foi vendido ou um serviço foi prestado no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }]
                }}
            >
                {
                    showInsights &&
                    <ContainerHandler>
                        {itemsAndTheirAmount.map((current, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    name={current.itemName}
                                    value={current.amount}
                                    money={false} />
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