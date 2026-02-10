import { useGetTheme } from '@/hooks/common/useGetTheme'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ListItemCardPropertyProps {
    label: string
    text: string
    bgColor: string
    onEditButtonPress?: () => void
}

export function ListItemCardProperty({ label, text, bgColor, onEditButtonPress }: ListItemCardPropertyProps) {

    const theme = useGetTheme()

    return (
        <View style={{
            ...styles.container,
            backgroundColor: bgColor
        }}>
            <View style={styles.infoContainer}>
                <Text
                    style={{
                        ...styles.label,
                        color: theme === 'dark' ? '#FFF' : '#000'
                    }}
                >
                    {label}:
                </Text>
                <Text
                    style={{
                        ...styles.text,
                        color: theme === 'dark' ? '#FFF' : '#000'
                    }}
                    numberOfLines={1}
                >
                    {text}
                </Text>
                {
                    onEditButtonPress && (
                        <Pressable
                            style={{
                                ...styles.button,
                                borderLeftColor: theme === 'dark' ? '#89D4EF' : '#066C9180',
                            }}
                            onPress={onEditButtonPress}
                        >
                            <Text 
                            style={{
                                ...styles.buttonText,
                                color: theme === 'dark' ? '#89D4EF' : '#066C9180'
                            }}
                            >
                                Editar
                                </Text>
                        </Pressable>
                    )
                }
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        padding: 16,
        borderRadius: 8
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        fontSize: 16,
        fontWeight: '500'
    },

    text: {
        fontSize: 16,
        flexShrink: 1,
        marginStart: 4
    },

    button: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        marginLeft: 8,
        paddingLeft: 8
    },

    buttonText: {
        fontSize: 16,
        color: '#066C9180'
    }

})