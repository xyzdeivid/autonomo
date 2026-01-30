import { useRef, useEffect } from 'react'
import { colors } from '@/styles/appColors'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface InsightSelectionButtonsProps {
    insightToShow: string
    setInsightToShow: React.Dispatch<React.SetStateAction<string>>
}

export function InsightSelectionButtons({
    insightToShow,
    setInsightToShow
}: InsightSelectionButtonsProps) {

    const scrollRef = useRef<ScrollView>(null)

    const positions = useRef<Record<string, number>>({})

    function getBackgroundColor(insight: string) {
        return insight === insightToShow ? colors.home.max : colors.home.mid
    }

    useEffect(() => {

        const x = positions.current[insightToShow]

        if (x !== undefined) {
            scrollRef.current?.scrollTo({
                x: x - 40,
                animated: true
            })
        }
    }, [insightToShow])

    function savePosition(insight: string, x: number) {
        positions.current[insight] = x
    }

    return (
        <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('monthly')
                }}
                onLayout={(e) =>
                    savePosition('monthly', e.nativeEvent.layout.x)
                }
                onPress={() => setInsightToShow('monthly')}
                activeOpacity={0.8}
            >
                <AntDesign name='bar-chart' size={20} color='white' />
                <Text style={[styles.text, insightToShow === 'monthly' && styles.textActive]}>
                    Balanço
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('daily')
                }}
                onLayout={(e) =>
                    savePosition('daily', e.nativeEvent.layout.x)
                }
                onPress={() => setInsightToShow('daily')}
                activeOpacity={0.8}
            >
                <AntDesign name='line-chart' size={20} color='white' />
                <Text style={[styles.text, insightToShow === 'daily' && styles.textActive]}>
                    Receita por Dia
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('items')
                }}
                onLayout={(e) =>
                    savePosition('items', e.nativeEvent.layout.x)
                }
                onPress={() => setInsightToShow('items')}
                activeOpacity={0.8}
            >
                <AntDesign name='unordered-list' size={20} color='white' />
                <Text style={[styles.text, insightToShow === 'items' && styles.textActive]}>
                    Receita de Itens
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('customers')
                }}
                onLayout={(e) =>
                    savePosition('customers', e.nativeEvent.layout.x)
                }
                onPress={() => setInsightToShow('customers')}
                activeOpacity={0.8}
            >
                <MaterialCommunityIcons name='face-man' size={20} color='white' />
                <Text style={[styles.text, insightToShow === 'items' && styles.textActive]}>
                    Receita de Clientes
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'flex-start',
        gap: 8,
        paddingHorizontal: 6
    },

    button: {
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },

    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },

    textActive: {
        fontWeight: '700'
    }
    
})