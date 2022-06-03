import { NextPage } from "next";
import { getSession } from "next-auth/react";
import FightOpponent from "../../../components/Battle/FightOpponent";

const FightOpponentPage: NextPage = ({ petPositionOne, petTypeUser, opponentBattlePet, petTypeOpponentR }: any) => {
    return (<FightOpponent data={{ petPositionOne, petTypeUser, opponentBattlePet, petTypeOpponentR }} />)
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
    const { id } = context.params;

    const [responsePetPositionOne, responseOpponentBattlePet] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/getPetPositionOne/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/opponentBattlePetsAPI/getOpponentBattlePetsById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);



    const [petPositionOneR, opponentBattlePetR] = await Promise.all([
        responsePetPositionOne.json(),
        responseOpponentBattlePet.json()
    ]);

    const petTypeUser = petPositionOneR.petType;
    const responsePetTypeUser = await fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/${petTypeUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie
        }
    });
    const petTypeOpponent = opponentBattlePetR.petType;
    const responsePetTypeOpponent = await fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/${petTypeOpponent}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie
        }
    });

    const petTypeUserR = await responsePetTypeUser.json();
    const petTypeOpponentR = await responsePetTypeOpponent.json();

    return { props: { petPositionOne: petPositionOneR, petTypeUser: petTypeUserR, opponentBattlePet: opponentBattlePetR, petTypeOpponent: petTypeOpponentR } }
}

export default FightOpponentPage;