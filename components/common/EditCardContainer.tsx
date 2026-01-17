import { Modal, View, Text, StyleSheet } from 'react-native'

interface EditCardContainerProps {
    children: React.ReactNode
    visible: boolean
    onCancelButtonPress: () => void
    label: string
}

export function EditCardContainer({ children, visible, onCancelButtonPress, label }: EditCardContainerProps) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onCancelButtonPress}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.label}>{label}</Text>
                    {children}
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    card: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        elevation: 5
    },

    label: {
        marginBottom: 4,
        fontWeight: '500',
        fontSize: 16
    }

})