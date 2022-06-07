import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ViewStore from "../../components/Stores/ViewStore";

const ViewStorePage: NextPage = ({ store, items }: any) => {
    return <ViewStore data={{ store, items }} />
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

    const [responseStore, responseItems] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/storesAPI/getStoreById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/storeItemsAPI/getItemsByStoreId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [storeR, itemsR] = await Promise.all([
        responseStore.json(),
        responseItems.json()
    ]);

    return { props: { store: storeR, items: itemsR } }
}

export default ViewStorePage;