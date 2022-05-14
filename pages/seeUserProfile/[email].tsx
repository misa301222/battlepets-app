import { NextPage } from "next";
import { getSession } from "next-auth/react";
import SeeUserProfile from "../../components/SeeUserProfile/SeeUserProfile";

const SeeUserProfilePage: NextPage = ({ userProfile }: any) => {
    return (<SeeUserProfile data={{ userProfile }} />)
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

    const [responseUserProfile] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [userProfileR]: any = await Promise.all([
        responseUserProfile.json().catch(err => { console.log(err); })
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
        props: { userProfile: userProfileR }
    }
}

export default SeeUserProfilePage;