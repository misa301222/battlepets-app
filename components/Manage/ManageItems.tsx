import { faBook, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';
import { Modal, Radio } from "react-daisyui";

interface Items {
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    itemRarity: number,
    itemType: string,
    imageURL: string
}

interface Store {
    _id: string,
    storeName: string,
    storeDescription: string,
    coverURL: string,
    imageURL: string
}

interface StoreItem {
    storeId: string,
    itemId: string,
    quantity: number
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

async function getStoreItemsByStoreId(storeId: string) {
    const response = await fetch(`/api/storeItemsAPI/getItemsByStoreId/${storeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function addItemStore(storeId: string, selectedItem: Items, quantity: number) {
    const response = await fetch(`/api/itemsAPI/addItemsStore/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId: storeId, item: selectedItem, quantity: quantity })
    });

    const data = await response.json();
    return data;
}

function ManageItems({ data }: any) {
    const [items, setItems] = useState<Items[]>(data.items as Items[]);
    const [stores, setStores] = useState<Store[]>(data.stores as Store[]);
    const [selectedStore, setSelectedStore] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [storeItems, setStoreItems] = useState<Items[]>();
    const [selectedItem, setSelectedItem] = useState<Items>({
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        itemRarity: 0,
        itemType: '',
        imageURL: '',
        itemQuantity: 0
    });
    const [action, setAction] = useState<String>();
    const [quantity, setQuantity] = useState<number>(0);

    const handleOnClickStore = async (element: Store) => {
        setIsOpen(true);
        setSelectedStore(element._id);

        const responseItems = await getStoreItemsByStoreId(element._id);
        setStoreItems(responseItems);
    }

    const handleOnSubmitFormItems = async (event: SyntheticEvent) => {
        event.preventDefault();

        switch (action) {
            case 'ADD':
                const responseItem = await addItemStore(selectedStore, selectedItem, quantity);
                console.log(responseItem);
                break;

            case 'REMOVE':
                break;
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="text-center">Manage Items <FontAwesomeIcon icon={faBook} /></h1>
                <hr className="border-black" />
            </div>

            <div className="">
                <h1 className="text-center">Stores <FontAwesomeIcon icon={faStore} /></h1>
            </div>

            <div className="mt-5 flex flex-wrap justify-center w-1/2 mx-auto">
                {
                    stores?.map((element: Store, index: number) => (
                        <motion.div className="card h-[21rem] w-[15rem] cursor-pointer"
                            whileHover={{
                                scale: 1.1
                            }}
                            key={index}
                            onClick={async () => handleOnClickStore(element)}>
                            <div className="p-2">
                                <h5 className="text-center mb-2">{element.storeName}</h5>
                                <div
                                    style={{
                                        backgroundColor: `${element.imageURL ? 'white' : 'white'}`,
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

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>Store Info <FontAwesomeIcon icon={faStore} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            <form onSubmit={handleOnSubmitFormItems} className="">
                                <div className="mb-5">
                                    <h5>Items</h5>
                                    <div className="flex flex-row justify-evenly">
                                        <select className="form-control">
                                            {
                                                items?.map((element: Items, index: number) => (
                                                    <option key={index}>{element.itemName}</option>
                                                ))
                                            }
                                        </select>

                                        <input onChange={(e) => setQuantity(Number(e.target.value))} type='number' className="form-control" placeholder="Quantity" />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-evenly">
                                    <div>
                                        <Radio onClick={() => setAction('ADD')} name='radio1' />
                                        <h5>Add</h5>
                                    </div>

                                    <div>
                                        <Radio onClick={() => setAction('REMOVE')} name='radio1' />
                                        <h5>Remove</h5>
                                    </div>
                                </div>

                                <div className="mb-5 flex flex-row justify-center">
                                    <button type="submit" className="btn-primary"> Apply </button>
                                </div>
                            </form>
                            <div className="flex flex-wrap w-1/2 mx-auto gap-10">
                                {
                                    storeItems?.map((element: Items, index: number) => (
                                        <motion.div className="card p-2 w-[12rem] h-[17rem] cursor-pointer"
                                            key={index}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            onClick={() => setSelectedItem(element)}>
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
                                                <h3 className="text-center mt-10">Price: {element.itemPrice}$</h3>
                                                <h4 className="underline text-center">{element.itemQuantity} left</h4>
                                            </div>
                                        </motion.div>
                                    ))
                                }
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

export default ManageItems;