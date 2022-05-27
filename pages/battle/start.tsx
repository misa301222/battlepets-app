import { NextPage } from "next";
import { getSession } from "next-auth/react";
import BattleStart from "../../components/Battle/BattleStart";

const BattleStartPage: NextPage = ({ opponentBattlePets, allowed }: any) => {
    return (<BattleStart data={{ opponentBattlePets, allowed }} />)
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
    const { email } = session.user!;

    const [responsePet] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/getPetPositionOne/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [petR] = await Promise.all([
        responsePet.json()
    ]);

    if (!petR) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    if (petR.currentHealthPoints <= 0) {
        return { props: { allowed: false } }
    }

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

    return { props: { opponentBattlePets: opponentBattlePetsR, allowed: true } }
}

export default BattleStartPage;