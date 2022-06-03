import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ViewPet from "../../components/Pet/ViewPet";

const ViewPetPage: NextPage = ({ pet, petType, user, userProfile }: any) => {
    return (<ViewPet data={{ pet, petType, user, userProfile }} />)
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
    const { id } = context.params;

    const [responsePet] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/getPetById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [petR] = await Promise.all([
        responsePet.json().catch(err => { })
    ]);


    if (!petR) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const { petType } = petR;
    const { userId } = petR;

    const [responsePetType, responseUser, responseUserProfile] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/petTypesAPI/${petType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/user/getUserById/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/getUserProfileByUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [petTypeR, userR, userProfileR] = await Promise.all([
        responsePetType.json(),
        responseUser.json(),
        responseUserProfile.json()
    ]);

    return { props: { pet: petR, petType: petTypeR, user: userR, userProfile: userProfileR } }
}

export default ViewPetPage;