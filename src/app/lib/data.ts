import postgres from 'postgres';

import {
  Page
} from './definitions';

const sql = postgres(`postgres://postgres:${process.env.POSTGRES_PASSWORD}@localhost/chmit`);

export async function fetchPage()  {
    try {      
      const data = await sql<Page[]>`SELECT "PageId", "Description", "Keywords"    
          FROM public."Page" limit 1;`;
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest invoices.');
    }
  }
  
export async function fetchPageById(pageId: number)  {
    try {
      const data = await sql<Page[]>`
        SELECT "PageId", "Description"   
        FROM public."Page"
        WHERE "PageId" = ${pageId}
        LIMIT 1;`;

      return data[0] || null; // Return the first record or null if not found
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch page by ID.');
    }
}