import { Pressable, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

export default function GeneralButton() {

    return (
        <Pressable
            style={styles.buttonContainer}
        >
            <Entypo name='add-to-list' size={28} color='#FFFFFF' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#08819B'
    }
})