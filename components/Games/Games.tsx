import { faDice, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

function Games() {
    const router = useRouter();

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Settings <FontAwesomeIcon icon={faGamepad} /></h1>
                <hr />
            </div>

            <div className="container mx-auto flex flex-wrap justify-center">
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    onClick={() => router.push('/games/doubleOrNothing')}
                    className="card text-center cursor-pointer">
                    <FontAwesomeIcon icon={faDice} className='text-[5rem]' />
                    <h5 className="mt-5">Double or Nothing</h5>
                </motion.div>
            </div>
        </div>
    )
}

export default Games;