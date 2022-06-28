import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';
import Home from '../components/Home/Home'

const HomePage: NextPage = ({ petTypes }: any) => {
  return (
    <Home data={{ petTypes }} />
  )
}

export async function getServerSideProps(context: any) {
  // const session = await getSession({ req: context.req });

  const { req } = context;
  const { cookie } = req.headers;
  const types: string[] = ["Dragon", "Cat", "Dog", "Cow", "Otter"];
  const results = [];
  
  for (let i = 0; i < types.length; i++) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/getPetTypeByName/${types[i]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      }
    });

    const data = await response.json();
    results.push(data);
  }

  return { props: { petTypes: results } }
}

export default HomePage;
