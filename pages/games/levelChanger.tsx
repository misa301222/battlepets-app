import { NextPage } from "next";
import { getSession } from "next-auth/react";
import LevelChanger from "../../components/Games/LevelChanger";

const levelChanger: NextPage = ({ pets }: any) => {
    return <LevelChanger data={{ pets }} />
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

    const [responsePets] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [petsR] = await Promise.all([
        responsePets.json()
    ])

    return { props: { pets: petsR } }

}

export default levelChanger;