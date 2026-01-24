import { View, Pressable, Text, StyleSheet } from 'react-native'

interface InsightSelectionButtonsProps {
    insightToShow: string
    setInsightToShow: React.Dispatch<React.SetStateAction<string>>
}

export function InsightSelectionButtons({ insightToShow, setInsightToShow }: InsightSelectionButtonsProps) {

    const checkinsight = (button: string) => {
        return insightToShow === button
            ? '#000'
            : '#00000080'
    }

    return (
        <View style={styles.buttonsContainer}>
            <Pressable
                style={{
                    ...styles.button, backgroundColor: checkinsight('monthly')
                }}
                onPress={() => setInsightToShow('monthly')}
            >
                <Text style={styles.buttonText}>Finanças Gerais</Text>
            </Pressable>
            <Pressable
                style={{
                    ...styles.button, backgroundColor: checkinsight('daily'),
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8
                }}
                onPress={() => setInsightToShow('daily')}
            >
                <Text style={styles.buttonText}>Receita Diária</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 12
    },

    button: {
        padding: 8
    },

    buttonText: {
        color: 'white',
        fontSize: 16
    }

})