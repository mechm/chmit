import { fetchPageById } from '@/app/lib/data';

// ----------------------------------------------------------------------
// THE NEXT.JS FIX: Force Dynamic Rendering (Server-Side Rendering)
// This tells Next.js to render this page on the server ONLY at request time.
export const dynamic = 'force-dynamic'; 
// ----------------------------------------------------------------------

export default async function Page() {

    const data = await fetchPageById(1);
    return (<>    
     <h1 className="title-txt">{data.pageid}{data.title}</h1>
              <div className="container inner-container overflow">
                  {data.description}
              </div>
    
    </>)
}