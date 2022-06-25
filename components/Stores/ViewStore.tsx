import { SyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';
import { Modal } from "react-daisyui";
import { faBowlFood, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

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
    imageURL: string,
    itemQuantity?: number
}

async function buyItem(storeId: string, selectedItem: Items, quantity: number) {
    const response = await fetch(`/api/itemsAPI/buyItem/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId: storeId, item: selectedItem, quantity: quantity })
    });

    const data = await response.json();
    return data;
}

async function getItemsByStoreId(storeId: string) {
    const response = await fetch(`/api/storeItemsAPI/getItemsByStoreId/${storeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

function ViewStore({ data }: any) {
    const [store, setStore] = useState<Store>(data.store as Store);
    const [items, setItems] = useState<Items[]>(data.items as Items[]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Items>({
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        itemRarity: 0,
        itemType: '',
        imageURL: '',
        itemQuantity: 0
    });
    const [quantity, setQuantity] = useState<number>(0);

    const handleOnClickSelectItem = (element: Items) => {
        setIsOpen(true);
        setSelectedItem(element);
    }

    const handleOnSubmitBuyForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response = await buyItem(store._id, selectedItem, quantity);
        if (response.isOk) {
            setIsOpen(false);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Item Bought Successfully!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                const response = await getItemsByStoreId(store._id);
                setItems(response);
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `${response.message}`,
                showConfirmButton: true,
            });
        }
    }

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

            <div className="mt-20">
                <div className="flex flex-wrap w-1/2 mx-auto gap-10">
                    {
                        items.map((element: Items, index: number) => (
                            <motion.div className="card p-2 w-[12rem] h-[17rem] cursor-pointer"
                                key={index}
                                whileHover={{
                                    scale: 1.1
                                }}
                                onClick={() => handleOnClickSelectItem(element)}
                            >
                                <div className="flex flex-col">
                                    <h5 className="text-center mb-1">{element.itemName}</h5>
                                    <div
                                        style={{
                                            backgroundImage: `url(${element.imageURL})`,
                                            height: '7rem',
                                            width: '7rem',
                                            margin: '0 auto',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '5px'
                                        }}
                                    />
                                    <h4 className="text-center mt-10">Price: ${element.itemPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
                                    <h4 className="underline text-center">{element.itemQuantity} left</h4>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>Item Info <FontAwesomeIcon icon={faBowlFood} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-5">
                            <div className="flex flex-row justify-evenly">
                                <motion.div className="card p-2 w-[12rem] h-[17rem] cursor-pointer"
                                    whileHover={{
                                        scale: 1.1
                                    }}>
                                    <div className="flex flex-col">
                                        <h5 className="text-center mb-1">{selectedItem.itemName}</h5>
                                        <div
                                            style={{
                                                backgroundImage: `url(${selectedItem.imageURL})`,
                                                height: '7rem',
                                                width: '7rem',
                                                margin: '0 auto',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        <h4 className="text-center mt-10">Price: ${selectedItem.itemPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
                                        <h4 className="underline text-center">{selectedItem.itemQuantity} left</h4>
                                    </div>
                                </motion.div>

                                <div className="mb-5">
                                    <div className="mb-10">
                                        <h2>Are you sure you want to buy this item?</h2>
                                    </div>
                                    <form onSubmit={handleOnSubmitBuyForm}>
                                        <div className="w-1/3 mb-5 mx-auto">
                                            <h5 className="text-center">Quantity</h5>
                                            <input onChange={(e) => setQuantity(Number(e.target.value))} className="form-control text-center" type={'number'} />
                                        </div>
                                        <div className="flex flex-row justify-center">
                                            <button disabled={!(selectedItem.itemQuantity! >= quantity)} type="submit" className="btn-secondary"><FontAwesomeIcon icon={faMoneyBill} /> Buy!</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Actions>

                    </Modal.Actions>
                </Modal>
            </div>

        </div>
    )
}

export default ViewStore;