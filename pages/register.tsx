import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Register from "../components/Register/Register";

const RegisterPage: NextPage = () => {
    return (<Register />)
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    // IF SESSION EXISTS REDIRECT TO HOME PAGE
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {}
    }
}

export default RegisterPage;