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
    CREATE TABLE IF NOT EXISTS outflows (
      _id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      value REAL NOT NULL,
      amount REAL
    );
    CREATE TABLE IF NOT EXISTS entries (
  _id TEXT PRIMARY KEY,
  serviceId TEXT NOT NULL,
  serviceCategory TEXT NOT NULL,
  serviceValue REAL NOT NULL,
  serviceIsThereAmount INTEGER NOT NULL,
  serviceAmount REAL,
  date TEXT NOT NULL,
  customer TEXT
);`
    )

  } catch {

    Alert.alert('Database Error', 'Failed to initialize the database.')

  }


}