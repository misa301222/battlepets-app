import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Inventory from "../components/Inventory/Inventory";

const InventoryPage: NextPage = ({ items, pets }: any) => {
    return <Inventory data={{ items, pets }} />
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

    const [responseItems, responsePets] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userItemsAPI/getItemsByEmail/${email}`, {
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

    const [itemsR, petsR] = await Promise.all([
        responseItems.json(),
        responsePets.json()
    ]);

    return { props: { items: itemsR, pets: petsR } }
}


export default InventoryPage;