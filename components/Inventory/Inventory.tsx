import { faBookOpen, faBowlFood, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';
import { Modal } from "react-daisyui";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface Items {
    _id: string,
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    itemRarity: number,
    itemType: string,
    imageURL: string,
    itemQuantity?: number
}

interface Pet {
    _id: string,
    userId: string,
    currentHealthPoints?: number,
    maxHealthPoints?: number,
    name: string,
    attackPoints?: number,
    defensePoints?: number,
    agilityPoints?: number,
    currentMagicPoints?: number,
    maxMagicPoints?: number,
    availableAttacks?: string[],
    level?: number,
    imageURL?: string,
    customImageURL?: string,
    wins?: number,
    defeats?: number,
    draws?: number,
    petType: string,
    position: number,
    experience: number,
    experienceGranted?: number
}

async function removeQuantity(quantity: number, itemId: string) {
    const response = await fetch(`/api/itemsAPI/removeItemFromUser/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, itemId })
    });

    const data = await response.json();
    return data;
}

async function getItemsByEmail(email: string) {
    const response = await fetch(`/api/userItemsAPI/getItemsByEmail/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

async function healPet(id: string, quantity: number) {
    const response = await fetch(`/api/petAPI/healPet/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity })
    });

    const data = await response.json();
    return data;
}

function Inventory({ data }: any) {
    const { data: session, status } = useSession();
    const [pets, setPets] = useState<Pet[]>(data.pets as Pet[]);
    const [items, setItems] = useState<Items[]>(data.items as Items[]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Items>({
        _id: '',
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        itemRarity: 0,
        itemType: '',
        imageURL: '',
        itemQuantity: 0
    });
    const [action, setAction] = useState<string>('');

    const handleOnClickSelectItem = (element: Items) => {
        setIsOpen(true);
        setSelectedItem(element);
    }

    const handleOnSubmitItemForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (action === '-1') {
            const response = await removeQuantity(1, selectedItem._id);
            if (!response.isOk) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: response.message,
                    showConfirmButton: true
                });
            }
            return;
        }

        //do the sum to hp here
        const quantity: number = selectedItem.itemRarity;
        const response = await removeQuantity(1, selectedItem._id);
        if (!response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: response.message,
                showConfirmButton: true
            });
            return;
        }
        const responseHeal = await healPet(action, quantity);
        if (responseHeal.isOk) {
            setIsOpen(false);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Pet healed ${quantity} HP!`,
                showConfirmButton: true
            }).then(async () => {
                const responseItems = await getItemsByEmail(session!.user?.email!);
                setItems(responseItems);
            });
        }
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
                                <motion.div className="p-2 w-[15rem] h-[17rem]"
                                    >
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
                                        <h4 className="text-center">{selectedItem.itemRarity} Rarity</h4>
                                    </div>
                                </motion.div>

                                <div className="mb-5">
                                    <div className="mb-10">
                                        <h2>What do you want to do?</h2>
                                    </div>
                                    <form onSubmit={handleOnSubmitItemForm}>
                                        <div className="mb-5">
                                            <select onChange={(e) => setAction(e.target.value)} className="form-control font-bold">
                                                <option value={''}>Select an Action</option>
                                                {
                                                    pets.map((element: Pet, index: number) => (
                                                        <option value={element._id} key={index}>Give Item to {element.name}</option>
                                                    ))
                                                }
                                                <option value={'-1'}>Throw item</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-row justify-center">
                                            <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faPlusCircle} /> Accept</button>
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

export default Inventory;