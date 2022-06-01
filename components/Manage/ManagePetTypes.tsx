import { faDove, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

async function savePetType(name: string, imageURL: string) {
    const response = await fetch(`/api/petTypesAPI/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ name, imageURL }))
    });

    const data = await response.json();
    return data;
}

async function getPetTypes() {
    const response = await fetch(`/api/petTypesAPI/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

function ManagePetTypes({ data }: any) {
    const [petTypes, setPetTypes] = useState<PetType[]>(data.petTypes as PetType[]);
    const [typeName, setTypeName] = useState<string>();
    const [imageURL, setImageURL] = useState<string>();

    const handleOnSubmitSavePetTypeForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await savePetType(typeName!, imageURL!);
        if (response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pet Type Added!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                const responsePets = await getPetTypes();
                setPetTypes(responsePets);
            });
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Manage Pet Types <FontAwesomeIcon icon={faDove} /></h1>
                <hr />
            </div>

            <form onSubmit={handleOnSubmitSavePetTypeForm} className="card w-1/3 mx-auto">
                <div className="mb-3">
                    <h5>Type Name<span className="text-red-600">*</span></h5>
                    <input onChange={(e) => setTypeName(e.target.value)} className="form-control" />
                </div>

                <div className="mb-3">
                    <h5>Image URL<span className="text-red-600">*</span></h5>
                    <input onChange={(e) => setImageURL(e.target.value)} className="form-control" />
                </div>

                <div className="mb-3 flex flex-row justify-center">
                    <button disabled={!typeName || !imageURL} className="btn-secondary w-36" type="submit"><FontAwesomeIcon icon={faFloppyDisk} /> Save</button>
                </div>
            </form>


            <div className="mt-20">
                <h2 className="text-center">Current Types</h2>
                <div className="flex flex-wrap gap-10 w-1/2 mx-auto justify-center mt-20">
                    {
                        petTypes.map((element: PetType, index: number) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    scale: 1.2
                                }}
                                className="card w-[12rem] h-[12rem] p-2 cursor-pointer">
                                <div className="flex flex-col">
                                    <h5 className="text-center mb-2">{element.petTypeName}</h5>
                                    <div style={{
                                        backgroundImage: `url(${element.imageURL})`,
                                        width: '8rem',
                                        height: '8rem',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        margin: '0 auto',
                                        borderRadius: '13px'
                                    }} />
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ManagePetTypes;