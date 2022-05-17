import { NextPage } from "next";
import { getSession } from "next-auth/react";
import CreatePet from "../components/Dashboard/CreatePet";

const CreatePetPage: NextPage = ({ petTypes, currentUser }: any) => {
    return <CreatePet data={{ petTypes, currentUser }} />;
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

    const [responsePetTypes, responseUser] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/user/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [petTypesR, userR] = await Promise.all([
        responsePetTypes.json(),
        responseUser.json()
    ]);

    return { props: { petTypes: petTypesR, currentUser: userR } }

}

export default CreatePetPage;