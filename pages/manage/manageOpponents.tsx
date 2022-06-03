import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ManageOpponent from "../../components/Manage/ManageOpponent";

const ManageOpponentPage: NextPage = ({ opponentBattlePets, petTypes }: any) => {
    return <ManageOpponent data={{ opponentBattlePets, petTypes }} />
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

    const [responseOpponentBattle, responsePetTypes] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/opponentBattlePetsAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [opponentBattleR, petTypesR] = await Promise.all([
        responseOpponentBattle.json(),
        responsePetTypes.json()
    ]);

    return { props: { opponentBattlePets: opponentBattleR, petTypes: petTypesR } }
}

export default ManageOpponentPage;