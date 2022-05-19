import { faAddressCard, faDoorOpen, faGears, faRightFromBracket, faStar, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

function NavigationBar() {
    const { data: session, status } = useSession();

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const handleOnClickLogout = () => {
        localStorage.clear();
        signOut({
            callbackUrl: '/'
        });

    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-black/90 p-6 shadow-sm shadow-gray-400 text-white">
            <div className="w-54 flex justify-evenly items-center">
                <h2 className="font-bold"><Link href={'/'}> Battle Pets App </Link></h2>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-lg lg:flex-grow">
                    <div className="p-1 w-fit m-auto flex flex-row gap-5 items-center">
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
                                <div>
                                    <Link href={'/dashboard'}><h5 className="cursor-pointer"><FontAwesomeIcon icon={faStar}/> Dashboard</h5></Link>
                                </div>
                            )
                        }
                        {
                            session && (
                                <div>
                                    <Link href={'/battle/start'}><h5 className="cursor-pointer"><FontAwesomeIcon icon={faUserNinja} /> Battle</h5></Link>
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

            <Menu as="div" className="ml-3 relative">
                <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        {session && (
                            <img
                                className="h-14 w-14 rounded-full"
                                src={`${session?.user?.image}`}
                                alt="ProfileImage"
                            />
                        )}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={`/seeUserProfile/${session?.user?.email}`}
                                    className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2')}
                                >
                                    <h5 className="text-black"><FontAwesomeIcon icon={faAddressCard} /> Your Profile</h5>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/settings"
                                    className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2')}
                                >
                                    <h5 className="text-black"><FontAwesomeIcon icon={faGears} /> Settings</h5>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2')}
                                >
                                    <h5 onClick={handleOnClickLogout} className="text-black" ><FontAwesomeIcon icon={faRightFromBracket} /> Sign Out</h5>
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>


        </nav >
    )
}

export default NavigationBar;