import { signOut, useSession } from "next-auth/react";

function Home() {
    const { data: session, status } = useSession();


    return (
        <div className="text-red-800">
            This is homeee
            {
                JSON.stringify(session)
            }
            {
                JSON.stringify(status)
            }            
        </div>
    )
}

export default Home;