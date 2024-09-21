import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/db';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureTableExists(db: any) {
    await db.run(`
        CREATE TABLE IF NOT EXISTS user_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            bio TEXT
        )
    `);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await getDb();
    await ensureTableExists(db);

    switch (req.method) {
        case 'POST':
            // Create a new user profile
            try {
                const { name, email, bio } = req.body;
                const result = await db.run(
                    'INSERT INTO user_profiles (name, email, bio) VALUES (?, ?, ?)',
                    [name, email, bio]
                );
                res.status(201).json({ id: result.lastID, name, email, bio });
            } catch (error) {
                res.status(500).json({ error: 'Error creating user profile' });
            }
            break;

        case 'GET':
            // Read user profile(s)
            try {
                const { id } = req.query;
                if (id) {
                    // Get a specific user profile
                    const profile = await db.get('SELECT * FROM user_profiles WHERE id = ?', [id]);
                    if (profile) {
                        res.status(200).json(profile);
                    } else {
                        res.status(404).json({ error: 'User profile not found' });
                    }
                } else {
                    // Get all user profiles
                    const profiles = await db.all('SELECT * FROM user_profiles');
                    res.status(200).json(profiles);
                }
            } catch (error) {
                res.status(500).json({ error: 'Error fetching user profile(s)' });
            }
            break;

        case 'PUT':
            // Update a user profile
            try {
                const { id } = req.query;
                const { name, email, bio } = req.body;
                await db.run(
                    'UPDATE user_profiles SET name = ?, email = ?, bio = ? WHERE id = ?',
                    [name, email, bio, id]
                );
                res.status(200).json({ id, name, email, bio });
            } catch (error) {
                res.status(500).json({ error: 'Error updating user profile' });
            }
            break;

        case 'DELETE':
            // Delete a user profile
            try {
                const { id } = req.query;
                await db.run('DELETE FROM user_profiles WHERE id = ?', [id]);
                res.status(200).json({ message: 'User profile deleted successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Error deleting user profile' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}