import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ManageOpponent from "../../components/Manage/ManageOpponent";

const ManageOpponentPage: NextPage = ({ opponentBattlePets }: any) => {
    return <ManageOpponent data={{ opponentBattlePets }} />
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

    const [responseOpponentBattle] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/opponentBattlePetsAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [opponentBattleR] = await Promise.all([
        responseOpponentBattle.json()
    ]);

    return { props: { opponentBattlePets: opponentBattleR } }
}

export default ManageOpponentPage;