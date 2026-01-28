import { colors } from '@/styles/appColors'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface InsightSelectionButtonsProps {
    insightToShow: string
    setInsightToShow: React.Dispatch<React.SetStateAction<string>>
}

export function InsightSelectionButtons({
    insightToShow,
    setInsightToShow
}: InsightSelectionButtonsProps) {

    function getBackgroundColor(insight: string) {

        if (insight === insightToShow) return colors.home.max
        return colors.home.mid

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('monthly')
                }}
                onPress={() => setInsightToShow('monthly')}
                activeOpacity={0.8}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name="bar-chart" size={24} color="white" />
                </View>
                <Text
                    style={[
                        styles.text,
                        insightToShow === 'product' && styles.textActive
                    ]}
                >
                    Finanças Gerais
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: getBackgroundColor('daily')
                }}
                onPress={() => setInsightToShow('daily')}
                activeOpacity={0.8}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name="line-chart" size={24} color="white" />
                    </View>
                <Text
                    style={[
                        styles.text,
                        insightToShow !== 'product' && styles.textActive
                    ]}
                >
                    Receita Diária
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginHorizontal: 'auto',
        marginTop: 24,
        backgroundColor: colors.home.mid,
        borderRadius: 6,
        overflow: 'hidden',
        height: 48,
        width: 320,
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },

    iconContainer: {
        padding: 4,
        borderRadius: 4,
        marginEnd: 4
    },

    text: {
        color: 'white',
        fontWeight: '500'
    },

    textActive: {
        fontWeight: '700'
    }

})