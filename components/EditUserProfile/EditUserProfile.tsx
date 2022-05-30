import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faDiceSix, faFloppyDisk, faImage, faPencilAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Modal } from "react-daisyui";

interface User {
    _id: string,
    fullName: string,
    email: string,
    imageURL: string,
    role: string,
    privateInfo: boolean
}

interface UserProfile {
    _id: string,
    descriptionHeader: string,
    description: string,
    hobbies: string[],
    imagesURL: string[],
    coverURL: string,
    location: string
}

async function editUserInformation(_id: string, fullName: string, imageURL: string, privateInfo: boolean) {
    const response = await fetch('/api/userAPI', {
        method: 'PUT',
        body: JSON.stringify({ editedUser: { _id, fullName, imageURL, privateInfo } }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function editUserProfileInformation(_id: string, descriptionHeader: string, description: string, hobbies: string[], imagesURL: string[], coverURL: string, location: string) {
    const response = await fetch('/api/userProfileAPI', {
        method: 'PUT',
        body: JSON.stringify({ editedUserProfile: { _id, descriptionHeader, description, hobbies, imagesURL, coverURL, location } }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

function EditUserProfile({ data }: any) {
    const [selectedUser, setSelectedUser] = useState<User>(data.user as User);
    const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);
    const [isHobbiesOpen, setIsHobbiesOpen] = useState<boolean>(false)
    const [hobbies, setHobbies] = useState<string[]>(data.userProfile.hobbies);
    const [currentHobby, setCurrentHobby] = useState<string>('');
    const [isImagesOpen, setIsImagesOpen] = useState<boolean>(false);
    const [imagesURL, setImagesURL] = useState<string[]>(data.userProfile.imagesURL);
    const [currentImageURL, setCurrentImageURL] = useState<string>('');

    const handleOnSubmitEditUser = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await editUserInformation(selectedUser._id, selectedUser.fullName, selectedUser.imageURL, selectedUser.privateInfo);
    }

    const handleOnSubmitEditUserProfile = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response = await editUserProfileInformation(selectedUserProfile._id, selectedUserProfile.descriptionHeader, selectedUserProfile.description,
            selectedUserProfile.hobbies, selectedUserProfile.imagesURL,
            selectedUserProfile.coverURL, selectedUserProfile.location);
    }

    const handleOnChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUser(prev => ({ ...prev, fullName: event.target.value }))
    }

    const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUser(prev => ({ ...prev, imageURL: event.target.value }))
    }

    const handleOnChangePrivateInfo = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(prev => ({ ...prev, privateInfo: (Number(event.target.value) === 1 ? true : false) }))
    }

    const handleOnChangeDescriptionHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUserProfile(prev => ({ ...prev, descriptionHeader: event.target.value }));
    }

    const handleOnChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedUserProfile(prev => ({ ...prev, description: event.target.value }));
    }

    const handleOnChangeCoverURL = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUserProfile(prev => ({ ...prev, coverURL: event.target.value }));
    }

    const handleOnChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedUserProfile(prev => ({ ...prev, location: event.target.value }));
    }

    const handleOnClickAddHobbies = () => {
        setIsHobbiesOpen(true);
    }

    const handleOnClickAddHobby = (newHobby: string) => {
        if (hobbies.length < 3) {
            setHobbies(prev => [...prev, newHobby]);
        }
    }

    const handleOnClickDeleteHobby = (hobbyToDelete: string) => {
        let newHobbies: string[] = [];
        for (let i = 0; i < hobbies.length; i++) {
            if (hobbies[i] !== hobbyToDelete) {
                newHobbies.push(hobbies[i]);
            }
        }
        setHobbies(newHobbies);
    }

    const handleOnClickSaveChangesAndCloseHobbies = () => {
        setIsHobbiesOpen(false);
        setSelectedUserProfile(prev => ({ ...prev, hobbies: hobbies }));
    }

    const handleOnClickAddImagesURL = () => {
        setIsImagesOpen(true);
    }

    const handleOnClickAddImageURL = (newImageURL: string) => {
        if (imagesURL.length < 3) {
            setImagesURL(prev => [...prev, newImageURL]);
        }
    }

    const handleOnClickDeleteImageURL = (imageURLToDelete: string) => {
        let newImagesURL: string[] = [];
        for (let i = 0; i < imagesURL.length; i++) {
            if (imagesURL[i] !== imageURLToDelete) {
                newImagesURL.push(imagesURL[i]);
            }
        }
        setImagesURL(newImagesURL);
    }

    const handleOnClickSaveChangesAndCloseImagesURL = () => {
        setIsImagesOpen(false);
        setSelectedUserProfile(prev => ({ ...prev, imagesURL: imagesURL }));
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Edit User Profile Information <FontAwesomeIcon icon={faUserEdit} /></h1>
                <hr />
            </div>

            <div className="flex flex-wrap justify-evenly">
                <div>
                    <div className="p-2 mb-2 bg-gray-300 rounded-md text-center">
                        <h4 className="">User General Information </h4>
                    </div>
                    <form onSubmit={handleOnSubmitEditUser} className='mb-20'>
                        <div className="card w-[45rem] mx-auto">
                            <div className="mb-5">
                                <h5>Email</h5>
                                <input value={selectedUser.email} disabled className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Full Name</h5>
                                <input value={selectedUser.fullName} onChange={handleOnChangeFullName} className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Role</h5>
                                <input value={selectedUser.role} disabled className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Image URL</h5>
                                <input value={selectedUser.imageURL} onChange={handleOnChangeImageURL} className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Private Information</h5>
                                <select className="form-control" onChange={handleOnChangePrivateInfo} defaultValue={selectedUser.privateInfo === true ? 1 : 0}>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>

                            </div>

                            <div className="mb-5 text-center">
                                <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faPencilAlt} /> Update User Information</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    <div className="p-2 mb-2 bg-gray-300 rounded-md text-center">
                        <h4 className="">User Profile Information </h4>
                    </div>
                    <form onSubmit={handleOnSubmitEditUserProfile}>
                        <div className="card w-[45rem] mx-auto">
                            <div className="mb-5">
                                <h5>Description Header</h5>
                                <input value={selectedUserProfile.descriptionHeader} onChange={handleOnChangeDescriptionHeader} className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Description</h5>
                                <textarea value={selectedUserProfile.description} onChange={handleOnChangeDescription} className="form-control" rows={5} style={{ resize: 'none' }}></textarea>
                            </div>

                            <div className="mb-5">
                                <h5>Hobbies</h5>
                                <div className="flex flex-row justify-center">
                                    <button onClick={handleOnClickAddHobbies} type="button" className="btn-dark"><FontAwesomeIcon icon={faPlusSquare} /> Add Hobbies</button>
                                </div>
                            </div>

                            <div className="mb-5">
                                <h5>Images URL</h5>
                                <div className="flex flex-row justify-center">
                                    <button onClick={handleOnClickAddImagesURL} type="button" className="btn-dark"><FontAwesomeIcon icon={faImage} /> Add Images</button>
                                </div>
                            </div>

                            <div className="mb-5">
                                <h5>Cover URL</h5>
                                <input value={selectedUserProfile.coverURL} onChange={handleOnChangeCoverURL} className="form-control" type={'text'} maxLength={250} />
                            </div>

                            <div className="mb-5">
                                <h5>Location</h5>
                                <input value={selectedUserProfile.location} onChange={handleOnChangeLocation} className="form-control" type={'text'} maxLength={50} />
                            </div>

                            <div className="mb-5 text-center">
                                <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faPencilAlt} /> Edit User Profile Information</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isHobbiesOpen} onClickBackdrop={() => setIsHobbiesOpen(false)}>
                    <Modal.Header><h5>Hobbies <FontAwesomeIcon icon={faDiceSix} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            <div className="mb-2">
                                <h5 className="text-center mb-2">Add Hobby </h5>
                                <input onChange={(e) => setCurrentHobby(e.target.value)} type={'text'} className='form-control' placeholder="Type the hobby you want to add.." />
                                <div className="flex flex-row justify-center mt-2">
                                    <button disabled={!currentHobby} onClick={() => handleOnClickAddHobby(currentHobby)} className="btn-primary" type="button"><FontAwesomeIcon icon={faFloppyDisk} /> Save Hobby</button>
                                </div>
                            </div>

                            <div className="max-h-60">
                                {
                                    hobbies?.map((element: string, index: number) => (
                                        <div className="flex flex-row justify-evenly mb-4" key={index}>
                                            <input disabled value={element} className="form-control w-4/5" />
                                            <button onClick={() => handleOnClickDeleteHobby(element)} type="button" className="btn-danger"> Delete </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Actions>
                        <button type="button" onClick={handleOnClickSaveChangesAndCloseHobbies} className="btn-dark"> Save Changes And Close</button>
                    </Modal.Actions>
                </Modal>
            </div>


            <div>
                <Modal className="text-black bg-white max-w-[60rem] max-h-full" open={isImagesOpen} onClickBackdrop={() => setIsImagesOpen(false)}>
                    <Modal.Header><h5>Hobbies <FontAwesomeIcon icon={faDiceSix} /> </h5></Modal.Header>

                    <Modal.Body>
                        <div className="p-2">
                            <div className="mb-2">
                                <h5 className="text-center mb-2">Add Images URL </h5>
                                <input onChange={(e) => setCurrentImageURL(e.target.value)} type={'text'} className='form-control' placeholder="Type the URL you want to add.." />
                                <div className="flex flex-row justify-center mt-2">
                                    <button disabled={!imagesURL} onClick={() => handleOnClickAddImageURL(currentImageURL)} className="btn-primary" type="button"><FontAwesomeIcon icon={faFloppyDisk} /> Save Hobby</button>
                                </div>
                            </div>

                            <div className="max-h-60">
                                {
                                    imagesURL?.map((element: string, index: number) => (
                                        <div className="flex flex-row justify-evenly mb-4" key={index}>
                                            <input disabled value={element} className="form-control w-4/5" />
                                            <button onClick={() => handleOnClickDeleteImageURL(element)} type="button" className="btn-danger"> Delete </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Actions>
                        <button type="button" onClick={handleOnClickSaveChangesAndCloseImagesURL} className="btn-dark"> Save Changes And Close</button>
                    </Modal.Actions>
                </Modal>
            </div>

        </div>
    )
}

export default EditUserProfile;