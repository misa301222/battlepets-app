import { faBookOpen, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion } from 'framer-motion';
import { Modal } from "react-daisyui";

interface Items {
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    itemRarity: number,
    itemType: string,
    imageURL: string,
    itemQuantity?: number
}

function Inventory({ data }: any) {
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

    const handleOnClickSelectItem = (element: Items) => {
        setIsOpen(true);
        setSelectedItem(element);
    }
    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Iventory <FontAwesomeIcon icon={faBookOpen} /></h1>
                <hr />
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
                                    <h3 className="text-center mt-10">Price: {element.itemPrice}$</h3>
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
                                        <h3 className="text-center mt-10">Price: {selectedItem.itemPrice}$</h3>
                                        <h4 className="underline text-center">{selectedItem.itemQuantity} left</h4>
                                    </div>
                                </motion.div>

                                <div className="mb-5">
                                    <div className="mb-10">
                                        <h2>What do you want to do?</h2>
                                    </div>
                                    <form>
                                        actions
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

export default Inventory;