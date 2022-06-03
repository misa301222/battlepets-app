import { NextPage } from "next";
import { getSession } from "next-auth/react";
import SeeUserProfile from "../../components/SeeUserProfile/SeeUserProfile";

const SeeUserProfilePage: NextPage = ({ userProfile, user, pets }: any) => {
    return (<SeeUserProfile data={{ userProfile, user, pets }} />)
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
    const { email } = context.params;

    const [responseUserProfile, responseUser, responsePets] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/${email}`, {
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
        fetch(`${process.env.NEXTAUTH_URL}/api/petAPI/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [userProfileR, userR, petsR]: any = await Promise.all([
        responseUserProfile.json().catch(err => { console.log(err); }),
        responseUser.json().catch(err => { console.log(err); }),
        responsePets.json().catch(err => { console.log(err); })
    ]);

    if (!userProfileR) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { userProfile: userProfileR, user: userR, pets: petsR }
    }
}

export default SeeUserProfilePage;