import { faAddressCard, faBookOpen, faGamepad, faGears, faRightFromBracket, faSearch, faShieldCat, faShop, faStar, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { motion } from 'framer-motion';

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

                <motion.h2
                    whileHover={{
                        scale: 1.15,
                        rotate: -5
                    }}
                    className="font-bold hover:text-amber-500 cursor-pointer"><Link href={'/'}><div><FontAwesomeIcon icon={faShieldCat} /> Battle Pets App</div></Link></motion.h2>

            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-lg lg:flex-grow">
                    <div className="p-1 w-fit m-auto flex flex-row gap-5 items-center">
                        {
                            !session && (
                                <div className="flex flex-row gap-5">
                                    <Link href={'/register'}>
                                        <motion.h5
                                            className='ease-in-out duration-300 hover:text-amber-400 cursor-pointer'> Register</motion.h5></Link>
                                    <Link href={'/login'}><motion.h5
                                        className='ease-in-out duration-300 hover:text-amber-400 cursor-pointer'
                                    > Login </motion.h5></Link>
                                </div>
                            )
                        }
                        {
                            session && (
                                <div>
                                    <Link href={'/dashboard'}>
                                        <motion.h5
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            className="cursor-pointer hover:text-amber-400"><FontAwesomeIcon icon={faStar} /> Dashboard</motion.h5>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            session && (
                                <div>
                                    <Link href={'/battle/start'}>
                                        <motion.h5
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            className="cursor-pointer hover:text-amber-400">
                                            <FontAwesomeIcon icon={faUserNinja} /> Battle</motion.h5>
                                    </Link>
                                </div>
                            )
                        }

                        {
                            session && (
                                <div>
                                    <Link href={'/viewStores'}>
                                        <motion.h5
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            className="cursor-pointer hover:text-amber-400">
                                            <FontAwesomeIcon icon={faShop} /> Stores</motion.h5>
                                    </Link>
                                </div>
                            )
                        }

                        {
                            session && (
                                <div>
                                    <Link href={'/games'}>
                                        <motion.h5
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            className="cursor-pointer hover:text-amber-400">
                                            <FontAwesomeIcon icon={faGamepad} /> Games</motion.h5>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                session && (
                    <div className="mr-4">
                        <Link href={'/search'}>
                            <motion.h5
                                whileHover={{
                                    scale: 1.1
                                }}>
                                <FontAwesomeIcon className="cursor-pointer text-[2rem] hover:text-amber-400" icon={faSearch} />
                            </motion.h5>
                        </Link>
                    </div>)
            }

            {
                session && (
                    <div className="mr-4">
                        <Link href={'/inventory'}>
                            <motion.h5
                                whileHover={{
                                    scale: 1.1
                                }}>
                                <FontAwesomeIcon className="cursor-pointer text-[2rem] hover:text-amber-400" icon={faBookOpen} />
                            </motion.h5>
                        </Link>
                    </div>)
            }

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
        </nav>
    )
}

export default NavigationBar;