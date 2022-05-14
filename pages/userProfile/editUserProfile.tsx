import { NextPage } from "next";
import { getSession } from "next-auth/react";
import EditUserProfile from "../../components/EditUserProfile/EditUserProfile";

const EditUserProfilePage: NextPage = ({ userProfile, user }: any) => {
    return (<EditUserProfile data={{ userProfile, user }} />)
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

    const [responseUserProfile, responseUser] = await Promise.all([
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
    ]);

    const [userProfileR, userR]: any = await Promise.all([
        responseUserProfile.json().catch(err => { console.log(err); }),
        responseUser.json().catch(err => { console.log(err); })
    ]);

    if (!userProfileR || !userR) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { userProfile: userProfileR, user: userR }
    }
}

export default EditUserProfilePage;