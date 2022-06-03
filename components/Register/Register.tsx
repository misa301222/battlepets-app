import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

async function createUser(fullName: string, email: string, password: string) {
    const response = await fetch('/api/auth/signUpAPI', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

async function createUserProfileBlank(_id: string) {
    const response = await fetch('/api/userProfileAPI', {
        method: 'POST',
        body: JSON.stringify({ _id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}

function Register() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleOnSubmitRegisterForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await createUser(fullName, email, password);        
        if (response.isOk) {            
            const { _id } = response._doc;
            const responseUserProfile = await createUserProfileBlank(_id);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Account Created Successfully!',
                showConfirmButton: true,
            }).then(() => {
                router.push('/login');
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 800
            });
        }
    }

    return (
        <div className="container mx-auto">
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Register <FontAwesomeIcon icon={faPencilAlt} /></h1>
                <hr />
            </div>
            <div className="card w-[50rem] mx-auto">
                <form onSubmit={handleOnSubmitRegisterForm}>
                    <div className="mb-3">
                        <h5>Full Name</h5>
                        <input onChange={(e) => setFullName(e.target.value)} className="form-control" type={'text'} maxLength={250} placeholder={'Insert your Full Name...'} />
                    </div>

                    <div className="mb-3">
                        <h5>Email</h5>
                        <input onChange={(e) => setEmail(e.target.value)} className="form-control" type={'text'} maxLength={250} placeholder={'Insert your Email...'} />
                    </div>

                    <div className="mb-3">
                        <h5>Password</h5>
                        <input onChange={(e) => setPassword(e.target.value)} className="form-control" type={'Password'} maxLength={250} placeholder={'Insert your Password...'} />
                    </div>

                    <div className="mb-3 flex flex-row justify-center">
                        <button disabled={!fullName || !email || !password} className="btn-primary" type="submit"><FontAwesomeIcon icon={faPencilAlt} /> Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;