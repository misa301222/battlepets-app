import { useState } from "react";
import { motion } from 'framer-motion';

interface Store {
    _id: string,
    storeName: string,
    storeDescription: string,
    coverURL: string,
    imageURL: string
}

interface Items {
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    itemRarity: number,
    itemType: string,
    imageURL: string
}

function ViewStore({ data }: any) {
    const [store, setStore] = useState<Store>(data.store as Store);
    const [items, setItems] = useState<Items[]>(data.items as Items[]);

    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                    translateY: -1000
                }}

                animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: {
                        type: 'srping',
                        duration: 1.2
                    }
                }}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${store.coverURL})`,
                    height: '45vh',
                    backgroundSize: 'cover',
                }} />

            <div className="flex flex-row -mt-10">
                <motion.div
                    initial={{
                        opacity: 0,
                        translateX: -100
                    }}

                    animate={{
                        opacity: 1,
                        translateX: 0,
                        transition: {
                            type: 'srping',
                            duration: 1.2
                        }
                    }}
                    style={{
                        backgroundImage: `url(${store.imageURL})`,
                        height: '15rem',
                        width: '15rem',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        top: '-8rem',
                        margin: '0 auto',
                        borderWidth: '0.2rem',
                        borderColor: '#262626'
                    }} />
            </div>

            <div className="-mt-20 mb-20">
                <h1 className="text-center">{store.storeName}</h1>
            </div>

            <div className="w-3/5 mx-auto text-center">
                <h4>{store.storeDescription}</h4>
            </div>

            <div>
                {JSON.stringify(items)}
            </div>

        </div>
    )
}

export default ViewStore;