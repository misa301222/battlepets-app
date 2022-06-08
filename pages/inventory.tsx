import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Inventory from "../components/Inventory/Inventory";

const InventoryPage: NextPage = ({ items }: any) => {
    return <Inventory data={{ items }} />
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

    const [responseItems] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userItemsAPI/getItemsByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [itemsR] = await Promise.all([
        responseItems.json()
    ]);

    return { props: { items: itemsR } }
}


export default InventoryPage;