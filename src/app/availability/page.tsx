import { fetchPageById } from '@/app/lib/data';

export default async function Page() {
  const data = await  fetchPageById(1);
    return (<>
     <h1 className="title-txt">{data.Title}</h1>
              <div className="container inner-container overflow">
                  {data.Description}
              </div>
    
    </>)
}