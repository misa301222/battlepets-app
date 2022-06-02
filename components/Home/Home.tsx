import { faShieldCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { motion } from 'framer-motion';

function Home() {
    const { data: session, status } = useSession();

    return (
        <div>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/static/images/Cat.jpg)`,
                height: '70vh',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="">
                    <div className="text-[8rem] text-orange-200 flex flex-row gap-8 cursor-pointer">
                        <motion.h5 drag
                            dragConstraints={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0.9, bounce: 0.6 } }}><FontAwesomeIcon icon={faShieldCat} /></motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>Battle</motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>Pets</motion.h5>
                        <motion.h5 initial={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0, transition: { type: 'spring', duration: 1.2, delay: 0 } }}>App</motion.h5>
                    </div>
                </div>
            </div>

            <div className="mt-20 container mx-auto">
                <h1 className="text-center">Create Your Own Pets And Battle</h1>
                <hr className="border-black" />
            </div>

        </div>
    )
}

export default Home;