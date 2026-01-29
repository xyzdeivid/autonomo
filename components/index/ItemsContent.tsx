import { useGetItemsAndTheirValuesForTheMonth } from '@/hooks/index/useGetItemsAndTheirValuesForTheMonth'
import { moneyFormat } from '@/utils/common'
import { Animated, Dimensions, StyleSheet, Text } from 'react-native'
import ContainerHandler from '../common/ContainerHandler'
import { useEffect, useRef } from 'react'
import { Info } from './Info'

interface ItemsContentProps {
    setComingFrom: React.Dispatch<React.SetStateAction<string>>
}

export function ItemsContent({ setComingFrom }: ItemsContentProps) {

    useEffect(() => {
        setComingFrom('right')
    }, [setComingFrom])

    const itemsAndTheirValuesForTheMonth = useGetItemsAndTheirValuesForTheMonth()

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(screenWidth)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    return (
        <>
            <Info text='Receita de cada produto ou serviço no mês.' />
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                    marginTop: 12
                }}
            >
                <ContainerHandler>
                    {itemsAndTheirValuesForTheMonth.map((current, index) => {
                        return (
                            <Text key={index} style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>{current.productName}:</Text> {moneyFormat(current.totalRevenue)}
                            </Text>
                        )
                    })}
                </ContainerHandler>
            </Animated.View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        marginTop: 12
    },

    item: {
        fontSize: 16,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#0000001A'
    }

})