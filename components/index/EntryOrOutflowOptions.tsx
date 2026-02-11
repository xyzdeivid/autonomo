import { colors } from '@/styles/appColors'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Pressable, StyleSheet, Text } from 'react-native'

const { height } = Dimensions.get('window')

interface EntryOrOutflowOptionsProps {
    setShowEntryOrOutflowOptions: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddEntryForm: () => void
    setShowAddOutflowForm: () => void
}

export function EntryOrOutflowOptions({ setShowEntryOrOutflowOptions, setShowAddEntryForm, setShowAddOutflowForm }: EntryOrOutflowOptionsProps) {

    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }, [slideAnim])

    return (
        <Pressable
            style={styles.container}
            onPress={() => setShowEntryOrOutflowOptions(false)}
        >
            <Animated.View
                style={[
                    styles.body,
                    { transform: [{ translateY: slideAnim }] }
                ]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? colors.entries.max : colors.entries.midMax
                        }
                    ]}
                    onPress={() => {
                        setShowAddEntryForm()
                        setShowEntryOrOutflowOptions(false)
                    }}
                >
                    <Text style={styles.buttonText}>Nova Receita</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? colors.outflows.max : colors.outflows.midMax
                        }
                    ]}
                    onPress={() => {
                        setShowAddOutflowForm()
                        setShowEntryOrOutflowOptions(false)
                    }}
                >
                    <Text style={styles.buttonText}>Nova Despesa</Text>
                </Pressable>
            </Animated.View>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    body: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        overflow: 'hidden'
    },

    button: {
        padding: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#FFF'
    },

    buttonText: {
        fontSize: 16,
        color: '#FFF'
    }


})