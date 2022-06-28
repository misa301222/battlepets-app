import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Bank from "../components/Bank/BankMain";

const bankPage: NextPage = ({ currency, bank }: any) => {
    return <Bank data={{ currency, bank }} />
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

    const [responseCurrency, responseBank] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/currencyAPI/getCurrencyByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/bankAPI/getCurrencyByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [currencyR, bankR] = await Promise.all([
        responseCurrency.json(),
        responseBank.json()
    ]);

    return { props: { currency: currencyR, bank: bankR } }

}

export default bankPage;