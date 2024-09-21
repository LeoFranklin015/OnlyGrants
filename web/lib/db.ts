import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any = null;

async function getDb() {
    if (!db) {
        db = await open({
            filename: './userprofiles.sqlite',
            driver: sqlite3.Database
        });
        await db.exec(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        bio TEXT
      )
    `);
    }
    return db;
}

export { getDb };