import { Pressable, StyleSheet, Text } from 'react-native'

interface NoValueButtonProps {
    noValue: boolean
    setNoValue: React.Dispatch<React.SetStateAction<boolean>>
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function NoValueButton({ noValue, setNoValue, setChoice }: NoValueButtonProps) {

    return (
        <Pressable
            style={{
                ...styles.body,
                backgroundColor: noValue ? 'darkblue' : 'transparent'
            }}
            onPress={() => {
                setNoValue(!noValue)
            }}
        >
            <Text
                style={{
                    color: noValue ? 'white' : 'darkblue'
                }}
            >
                Sem Valor
            </Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    body: {
        alignSelf: 'flex-start',
        padding: 6,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'darkblue'
    },
    textButton: {
        color: 'darkblue'
    }
})