import { faPencilAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";

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

async function editUserProfileInformation(_id: string, descriptionHeader: string, description: string, coverURL: string, location: string) {
    const response = await fetch('/api/userProfileAPI', {
        method: 'PUT',
        body: JSON.stringify({ editedUserProfile: { _id, descriptionHeader, description, coverURL, location } }),
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

    const handleOnSubmitEditUser = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await editUserInformation(selectedUser._id, selectedUser.fullName, selectedUser.imageURL, selectedUser.privateInfo);
        console.log(response);
    }

    const handleOnSubmitEditUserProfile = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response = await editUserProfileInformation(selectedUserProfile._id, selectedUserProfile.descriptionHeader, selectedUserProfile.description,
            selectedUserProfile.coverURL, selectedUserProfile.location);
        console.log(response);
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
                            </div>

                            <div className="mb-5">
                                <h5>Images URL</h5>
                                {/* <input className="form-control" type={'text'} maxLength={250} /> */}
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
        </div>
    )
}

export default EditUserProfile;