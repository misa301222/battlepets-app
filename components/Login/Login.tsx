import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import { getSession, signIn, useSession } from 'next-auth/react';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleOnSubmitLoginForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const result: any = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });

        if (!result.error) {
            localStorage.setItem('email', email);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            router.replace('/');
            Swal.fire({
                position: 'top-right',
                icon: 'success',
                title: 'Logged In Successfully!',
                showConfirmButton: false,
                timer: 800
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: result.error as string,
                showConfirmButton: true,
            });
        }
    }

    return (
        <div className="container mx-auto">
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Login <FontAwesomeIcon icon={faDoorOpen} /></h1>
                <hr />
            </div>
            <div className="card w-[50rem] mx-auto">
                <form onSubmit={handleOnSubmitLoginForm}>
                    <div className="mb-3">
                        <h5>Email</h5>
                        <input onChange={(e) => setEmail(e.target.value)} className="form-control" type={'text'} maxLength={250} placeholder={'Insert your Email...'} />
                    </div>

                    <div className="mb-3">
                        <h5>Password</h5>
                        <input onChange={(e) => setPassword(e.target.value)} className="form-control" type={'password'} maxLength={250} placeholder={'Insert your Password...'} />
                    </div>

                    <div className="mb-3 flex flex-row justify-center">
                        <button className="btn-primary" type="submit"><FontAwesomeIcon icon={faDoorOpen} /> Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;