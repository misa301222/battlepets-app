import { NextPage } from "next";
import { getSession } from "next-auth/react";
import DeletePet from "../components/DeletePet/DeletePet";

const DeletePetPage: NextPage = ({ pets }: any) => {
    return <DeletePet data={{ pets }} />
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

    const [responsePets] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [responseP] = await Promise.all([
        responsePets.json()
    ]);

    return { props: { pets: responseP } }
}

export default DeletePetPage;