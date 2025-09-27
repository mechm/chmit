import postgres from 'postgres';
import {
  Page
} from './definitions';

console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB_HOST:', process.env.POSTGRES_DB_HOST);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
console.log('POSTGRES_DB:', process.env.NEXT_BUILD_ENV);


// const sql = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DB_HOST}/${process.env.POSTGRES_DB}`);
// //const sql = postgres(`postgres://sa:lymm@chmit-db-1/chmit`);
 
// export async function fetchPageById(pageId: number)  {
//     try {
//       const data = await sql<Page[]>`
//         SELECT "pageid", "description"   
//         FROM public."page"
//         WHERE "pageid" = ${pageId}
//         LIMIT 1;`;

//       return data[0] || null; // Return the first record or null if not found
//     } catch (error) {
//       console.error('Database Error:', error);
//       throw new Error('Failed to fetch page by ID.');
//     }
// }





// 1. Declare the client variable but do not initialize it at the top level.
let sqlClient: ReturnType<typeof postgres> | undefined = undefined;

/**
 * Lazily creates and returns the database client instance.
 * It connects only on the first call at runtime.
 */
function getDbClient() {
    // If the client is already created, return it immediately (Singleton pattern)
    if (sqlClient) {
        return sqlClient;
    }
    
    // Safety check: If the host environment variable is missing, we are likely in a build phase.
    if (!process.env.POSTGRES_DB_HOST) {
        // Throw an error if called at runtime without proper environment variables, 
        // but allow the module to load during the static build phase.
        console.warn('Database host not defined. Skipping connection at module load.');
        return null; 
    }

        
    // NEW CHECK: Skip connection if this variable is set during the build.
    // This is the CRITICAL fix for the Docker build error.
    // if (process.env.NEXT_BUILD_ENV === 'true') {
    //     console.warn('DB Connection skipped. Currently running static build.');
    //     return null; 
    // }


    // 2. Initialize the client ONLY inside this function, on the first call.
    const client = postgres(
        `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_DB_HOST}/${process.env.POSTGRES_DB}`
    );
    
    sqlClient = client;
    return client;
}

export async function fetchPageById(pageId: number) {
    // 3. The connection is made here, when the function is actually executed.
    const sql = getDbClient(); 

    if (!sql) {
        // If the database host is missing, treat this as a runtime error.
        //throw new Error('Database client not initialized. Check POSTGRES_DB_HOST environment variable.');
        // If client is null, return a safe, mock data structure during the build process.
        // This is necessary to satisfy the rendering component without crashing.
        return { pageid:1, title: "Loading...", description: "Data is loading or being built." };
    }

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