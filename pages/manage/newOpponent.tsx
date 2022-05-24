import { NextPage } from "next";
import { getSession } from "next-auth/react";
import NewOpponent from "../../components/Manage/NewOpponent";

const NewOpponentPage: NextPage = ({ petTypes }: any) => {
    return <NewOpponent data={{ petTypes }} />
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

    const [responsePetTypes] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [petTypesR] = await Promise.all([
        responsePetTypes.json()
    ]);

    return { props: { petTypes: petTypesR } }
}

export default NewOpponentPage;