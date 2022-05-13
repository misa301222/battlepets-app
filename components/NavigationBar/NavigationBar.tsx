import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function NavigationBar() {
    const { data: session, status } = useSession();

    const handleOnClickLogout = () => {
        localStorage.clear();
        signOut({
            callbackUrl: '/'
        });

    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-black/90 p-6 shadow-sm shadow-gray-400 text-white">
            <div className="w-54 flex justify-evenly items-center">
                <h2 className="font-bold">Battle Pets App </h2>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-lg lg:flex-grow">
                    <div className="p-1 w-fit m-auto">
                        {
                            !session && (
                                <div>
                                    <Link href={'/register'}> Register</Link>
                                    <Link href={'/login'}> Login</Link>
                                </div>
                            )
                        }
                        {
                            session && (
                                <button onClick={handleOnClickLogout} type="button" className="btn-primary"><FontAwesomeIcon icon={faDoorOpen} /> Logout</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default NavigationBar;