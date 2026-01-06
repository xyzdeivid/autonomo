import { Alert } from 'react-native'
import { db } from './db'

export const initDatabase = async () => {

  try {

    await db.execAsync(
      `
    CREATE TABLE IF NOT EXISTS items (
      _id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      value REAL NOT NULL,
      isThereAmount INTEGER NOT NULL,
      resale INTEGER NOT NULL,
      amount REAL
    );
  `
    )

  } catch (error) {

    Alert.alert('Database Error', 'Failed to initialize the database.')
    
  }


}