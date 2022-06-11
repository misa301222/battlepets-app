import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage: NextPage = ({ pets, currency }: any) => {
    return (<Dashboard data={{ pets, currency }} />)
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const { req } = context;
    const { cookie } = req.headers;
    const { email }: any = session.user;

    const [responsePets, responseCurrency] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/currencyAPI/getCurrencyByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [responseP, currencyR] = await Promise.all([
        responsePets.json(),
        responseCurrency.json()
    ]);

    return { props: { pets: responseP, currency: currencyR } }
}

export default DashboardPage;