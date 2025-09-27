import postgres from 'postgres';

import {
  Page
} from './definitions';

const sql = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost/${process.env.POSTGRES_DB}`);
 
export async function fetchPageById(pageId: number)  {
    try {
      const data = await sql<Page[]>`
        SELECT "pageid", "description"   
        FROM public."page"
        WHERE "pageid" = ${pageId}
        LIMIT 1;`;

      return data[0] || null; // Return the first record or null if not found
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch page by ID.');
    }
}