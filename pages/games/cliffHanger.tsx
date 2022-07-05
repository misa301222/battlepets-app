import { NextPage } from "next";
import { getSession } from "next-auth/react";
import CliftHanger from "../../components/Games/CliffHanger";

const cliftHangerPage: NextPage = ({ currency }: any) => {
    return <CliftHanger data={{ currency }} />
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

    const [responseCurrency] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/currencyAPI/getCurrencyByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [currencyR] = await Promise.all([
        responseCurrency.json()
    ])

    return { props: { currency: currencyR } }
}

export default cliftHangerPage;