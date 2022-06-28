import { faArrowRightRotate, faFloppyDisk, faPencil, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import { Modal } from "react-daisyui";

interface Store {
    _id: string,
    storeName: string,
    storeDescription: string,
    coverURL: string,
    imageURL: string
}

async function saveStore(newStore: Store) {
    const response = await fetch(`/api/storesAPI/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ storeName: newStore.storeName, storeDescription: newStore.storeDescription, coverURL: newStore.coverURL, imageURL: newStore.imageURL }))
    });

    const data = await response.json();
    return data;
}

async function getStores() {
    const response = await fetch(`/api/storesAPI/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

async function updateStore(selectedStore: Store) {
    const response = await fetch(`/api/storesAPI/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({
            editedStore: {
                _id: selectedStore._id, storeName: selectedStore.storeName, storeDescription: selectedStore.storeDescription,
                coverURL: selectedStore.coverURL, imageURL: selectedStore.imageURL
            }
        }))
    });

    const data = await response.json();
    return data;
}

function ManageStores({ data }: any) {
    const [stores, setStores] = useState<Store[]>(data.stores as Store[]);
    const [selectedStore, setSelectedStore] = useState<Store>({
        _id: '',
        storeName: '',
        storeDescription: '',
        coverURL: '',
        imageURL: ''
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newStore, setNewStore] = useState<Store>({
        _id: '',
        storeName: '',
        storeDescription: '',
        coverURL: '',
        imageURL: ''
    });

    const handleOnChangeStoreName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStore(prev => ({ ...prev, storeName: event.target.value }))
    }

    const handleOnChangeStoreDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewStore(prev => ({ ...prev, storeDescription: event.target.value }))
    }

    const handleOnChangeCoverURL = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStore(prev => ({ ...prev, coverURL: event.target.value }))
    }

    const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStore(prev => ({ ...prev, imageURL: event.target.value }))
    }


    const handleOnChangeSelectedStoreName = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStore(prev => ({ ...prev, storeName: event.target.value }))
    }

    const handleOnChangeSelectedStoreDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedStore(prev => ({ ...prev, storeDescription: event.target.value }))
    }

    const handleOnChangeSelectedCoverURL = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStore(prev => ({ ...prev, coverURL: event.target.value }))
    }

    const handleOnChangeSelectedImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStore(prev => ({ ...prev, imageURL: event.target.value }))
    }

    const handleOnSubmitNewStore = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await saveStore(newStore);
        if (response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Store Saved Successfully!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                const responseStores = await getStores();
                setStores(responseStores);
            });
        }
    }

    const handleOnChangeSelectStore = (element: Store) => {
        setIsOpen(true);
        setSelectedStore(element);
    }

    const handleOnSubmitUpdateStore = async (event: SyntheticEvent) => {
        event.preventDefault();

        const responseUpdate = await updateStore(selectedStore);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Store Updated Successfully!',
            showConfirmButton: false,
            timer: 800
        }).then(async () => {
            const responseStores = await getStores();
            setStores(responseStores);
        });
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="text-center">Add New <FontAwesomeIcon icon={faStore} /></h1>
                <hr className="border-black" />
            </div>
            <form onSubmit={handleOnSubmitNewStore} className='card w-1/2 mx-auto'>
                <div className="mb-5">
                    <h5>Store Name</h5>
                    <input onChange={handleOnChangeStoreName} className="form-control" type={'text'} />
                </div>

                <div className="mb-5">
                    <h5>Store Description</h5>
                    <textarea onChange={handleOnChangeStoreDescription} className="form-control resize-none" rows={5} />
                </div>

                <div className="mb-5">
                    <h5>Cover URL</h5>
                    <input onChange={handleOnChangeCoverURL} className="form-control" type={'text'} />
                </div>

                <div className="mb-5">
                    <h5>Image URL</h5>
                    <input onChange={handleOnChangeImageURL} className="form-control" type={'text'} />
                </div>

                <div className="flex flex-row justify-center">
                    <button type="submit" className="btn-primary w-36"><FontAwesomeIcon icon={faFloppyDisk} /> Save</button>
                </div>
            </form>

            <div className="mb-20">
                <div className="container mx-auto p-5 mb-10 mt-10">
                    <h1 className="text-center">Current Stores <FontAwesomeIcon icon={faStore} /></h1>
                    <hr className="border-black" />
                </div>

                <div className="flex flex-wrap justify-center w-1/2 mx-auto gap-10">
                    {
                        stores?.map((element: Store, index: number) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    scale: 1.1
                                }}
                                className="h-[15rem] w-[12rem] card cursor-pointer"
                                onClick={() => handleOnChangeSelectStore(element)}>
                                <div>
                                    <h5 className="text-center mb-3">{element.storeName}</h5>
                                    <div style={{
                                        backgroundImage: `url(${element.imageURL})`,
                                        height: '8rem',
                                        width: '8rem',
                                        margin: '0 auto',
                                        backgroundSize: 'cover',
                                        borderRadius: '0.5rem'
                                    }} />
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>


            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isOpen} onClickBackdrop={() => setIsOpen(false)}>
                    <Modal.Header><h5>Edit Info <FontAwesomeIcon icon={faPencil} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            <form onSubmit={handleOnSubmitUpdateStore} className='w-1/2 mx-auto'>
                                <div className="mb-5">
                                    <h5>Store Name</h5>
                                    <input value={selectedStore.storeName} onChange={handleOnChangeSelectedStoreName} className="form-control" type={'text'} />
                                </div>

                                <div className="mb-5">
                                    <h5>Store Description</h5>
                                    <textarea value={selectedStore.storeDescription} onChange={handleOnChangeSelectedStoreDescription} className="form-control resize-none" rows={5} />
                                </div>

                                <div className="mb-5">
                                    <h5>Cover URL</h5>
                                    <input value={selectedStore.coverURL} onChange={handleOnChangeSelectedCoverURL} className="form-control" type={'text'} />
                                </div>

                                <div className="mb-5">
                                    <h5>Image URL</h5>
                                    <input value={selectedStore.imageURL} onChange={handleOnChangeSelectedImageURL} className="form-control" type={'text'} />
                                </div>

                                <div className="flex flex-row justify-center">
                                    <button type="submit" className="btn-primary w-36"><FontAwesomeIcon icon={faArrowRightRotate} /> Update</button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>

                    <Modal.Actions>

                    </Modal.Actions>
                </Modal>
            </div>

        </div>
    )
}

export default ManageStores;