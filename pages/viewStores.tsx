import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ViewStores from "../components/Stores/ViewStores";

const ViewStoresPage: NextPage = ({ stores }: any) => {
    return <ViewStores data={{ stores }} />
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

    const [responseStores] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/storesAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [storesR] = await Promise.all([
        responseStores.json()
    ]);

    return { props: { stores: storesR } }
}

export default ViewStoresPage;