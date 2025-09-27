import { fetchPageById } from '@/app/lib/data';

export default async function Page() {
      return (<>Hello World
        </>)
  // const data = await fetchPageById(1);
  //   return (<>
  //    <h1 className="title-txt">{data.title}</h1>
  //             <div className="container inner-container overflow">
  //                 {data.description}
  //             </div>
  //   </>)
}
