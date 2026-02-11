import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native'

interface CardWhichProductToChooseProps {
  setShowHelpCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function WhichProductToChooseHelpCard({ setShowHelpCard }: CardWhichProductToChooseProps) {

  const theme = useGetTheme()

  return (
    <Modal
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={{
          ...styles.card,
          backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
        }}>
          <View style={styles.header}>
            <Text style={{
              ...styles.title,
              color: theme === 'dark' ? '#FFF' : colors.items.max
            }}>Qual escolher?</Text>
          </View>
          <View>
            <View style={styles.section}>
              <Text style={{
                ...styles.sectionTitle,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>Produto para venda</Text>
              <Text style={{
                ...styles.description,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>
                Use quando você compra um produto de alguém para revender, ou quando você vende um produto fabricado por você mesmo.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={{
                ...styles.sectionTitle,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>Serviço com preço fixo</Text>
              <Text style={{
                ...styles.description,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>
                Use quando você presta um serviço que o valor cobrado é sempre o mesmo.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={{
                ...styles.sectionTitle,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>Serviço com preço variável</Text>
              <Text style={{
                ...styles.description,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light
              }}>
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
    backgroundColor: '#00000080',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
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
    textAlign: 'center'
  },

  section: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
  },

  closeButton: {
    backgroundColor: colors.items.max,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },

  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

})