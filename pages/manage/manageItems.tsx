import { NextPage } from "next";
import { getSession } from "next-auth/react";
import ManageItems from "../../components/Manage/ManageItems";

const ManageItemsPage: NextPage = ({ items, stores }: any) => {
    return <ManageItems data={{ items, stores }} />
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

    const [responseItems, responseStores] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/itemsAPI/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/storesAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [itemsR, storesR] = await Promise.all([
        responseItems.json(),
        responseStores.json()
    ])

    return { props: { items: itemsR, stores: storesR } }
}

export default ManageItemsPage;