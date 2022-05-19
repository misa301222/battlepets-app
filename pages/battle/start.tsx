import { NextPage } from "next";
import { getSession } from "next-auth/react";
import BattleStart from "../../components/Battle/BattleStart";

const BattleStartPage: NextPage = ({ opponentBattlePets }: any) => {
    return (<BattleStart data={{ opponentBattlePets }} />)
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

    const [responseOpponentBattlePets] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/opponentBattlePetsAPI/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [opponentBattlePetsR] = await Promise.all([
        responseOpponentBattlePets.json()
    ]);

    return { props: { opponentBattlePets: opponentBattlePetsR } }
}

export default BattleStartPage;