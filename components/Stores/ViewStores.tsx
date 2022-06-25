import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

interface Store {
    _id: string,
    storeName: string,
    storeDescription: string,
    coverURL: string,
    imageURL: string
}

function ViewStores({ data }: any) {
    const [stores, setStores] = useState<Store[]>(data.stores as Store[]);
    const router = useRouter();

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Stores <FontAwesomeIcon icon={faShop} /></h1>
                <hr />
            </div>

            <div className="flex flex-wrap justify-center w-3/5 mx-auto gap-10">
                {
                    stores.map((element: Store, index: number) => (
                        <motion.div className="card h-[21rem] w-[15rem] cursor-pointer"
                            whileHover={{
                                scale: 1.1
                            }}
                            key={index}
                            onClick={() => router.push(`/viewStores/${element._id}`)}>
                            <div className="p-2">
                                <h5 className="text-center mb-2">{element.storeName}</h5>
                                <div
                                    style={{
                                        backgroundColor: `${element.imageURL ? '' : 'white'}`,
                                        backgroundImage: `url(${element.imageURL ? element.imageURL : ''})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '12rem',
                                        width: '12rem',
                                        margin: '0 auto'
                                    }}
                                />
                                <p className="text-justify line-clamp-2 mt-2">
                                    {element.storeDescription}
                                </p>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default ViewStores;