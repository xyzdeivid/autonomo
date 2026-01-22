import { colors } from '@/constants/appColors'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native'

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
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: colors.entries.midMax }
                    ]}
                    onPress={() => {
                        setShowAddEntryForm()
                        setShowEntryOrOutflowOptions(false)
                    }}
                >
                    <Text style={styles.buttonText}>Nova Receita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.button,
                    { backgroundColor: colors.outflows.midMax }
                ]}
                onPress={() => {
                        setShowAddOutflowForm()
                        setShowEntryOrOutflowOptions(false)
                    }}
                >
                    <Text style={styles.buttonText}>Nova Despesa</Text>
                </TouchableOpacity>
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
        borderRadius: 6,
        overflow: 'hidden',
        margin: 16
    },

    button: {
        padding: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#FFF'
    },

    buttonText: {
        fontSize: 16,
        color: '#FFF'
    }


})