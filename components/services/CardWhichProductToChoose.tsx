import { colors } from '@/constants/appColors'
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native'

interface CardWhichProductToChooseProps {
    setShowHelpCard: React.Dispatch<React.SetStateAction<boolean>>
}

const CardWhichProductToChoose = ({ setShowHelpCard }: CardWhichProductToChooseProps) => {
  return (
    <Modal
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Qual escolher?</Text>
          </View>
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Produto para venda</Text>
              <Text style={styles.description}>
                Use quando você compra um produto de alguém para revender, ou quando você vende um produto fabricado por você mesmo.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Serviço com preço fixo</Text>
              <Text style={styles.description}>
                Use quando você presta um serviço que o valor cobrado é sempre o mesmo.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Serviço com preço variável</Text>
              <Text style={styles.description}>
                Use quando você presta um serviço que o valor cobrado pode variar conforme a condição (tamanho ou complexidade).
              </Text>
            </View>
          </View>
          <Pressable 
          style={styles.closeButton}
          onPress={() => setShowHelpCard(false)}
          >
            <Text style={styles.closeButtonText}>ENTENDI</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.items.max,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: colors.items.max,
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default CardWhichProductToChoose