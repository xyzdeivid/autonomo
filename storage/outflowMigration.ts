import { Outflow } from '@/types/index'
import { db } from '@/database/db'
import { getDataFromAsyncStorage } from './getDataFromAsyncStorage'

const saveOutflowOnNewDB = async (outflow: Outflow) => {

    try {

        await db.runAsync(
            `INSERT INTO outflows (_id, name, date, value, amount)
            VALUES (?, ?, ?, ?, ?)`,
            [
                outflow._id,
                outflow.name,
                outflow.date,
                outflow.value,
                outflow.amount ?? null
            ]
        )

    } catch (error) {

        throw new Error(`Error saving outflow ${outflow.name} on new database`, { cause: error })

    }

}

export const saveOutflowsOnNewDB = async () => {

    const outflowsFromAsyncStorage = await getDataFromAsyncStorage('expenses')

    if (outflowsFromAsyncStorage) {

        const parsedOutflows: Outflow[] = JSON.parse(outflowsFromAsyncStorage)

        for (const outflow of parsedOutflows) {

            await saveOutflowOnNewDB(outflow)

        }

    }

}