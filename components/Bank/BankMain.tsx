import { faBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

interface Currency {
    userId: string,
    currency: number
}

interface Bank {
    userId: string,
    currency: number
}


async function depositBank(quantity: number) {
    const response = await fetch(`/api/bankAPI/deposit/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ quantity }))
    });

    const data = await response.json();
    return data;
}

async function widthDrawBank(quantity: number) {
    const response = await fetch(`/api/bankAPI/withdraw/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: (JSON.stringify({ quantity }))
    });

    const data = await response.json();
    return data;
}

function Bank({ data }: any) {
    const [currency, setCurrency] = useState<Currency>(data.currency as Currency);
    const [bank, setBank] = useState<Bank>(data.bank as Bank);
    const [quantityDeposit, setQuantityDeposit] = useState<number>(0);
    const [quantityWithdraw, setQuantityWithDraw] = useState<number>(0);

    const handleOnSubmitDepositForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await depositBank(quantityDeposit);
        if (response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deposit Succesful',
                showConfirmButton: false,
                timer: 800
            }).then(() => {
                setCurrency(response.currency);
                setBank(response.bank);
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.message,
                showConfirmButton: true,
            })
        }
    }

    const handleOnSubmitWithdrawForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await widthDrawBank(quantityWithdraw);
        if (response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Withdraw Succesful',
                showConfirmButton: false,
                timer: 800
            }).then(() => {
                setCurrency(response.currency);
                setBank(response.bank);
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.message,
                showConfirmButton: true,
            })
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Bank <FontAwesomeIcon icon={faBank} /></h1>
                <hr />
            </div>

            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/static/images/Bank.jpg)`,
                height: '70vh',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <div className="card bg-gray-200 w-2/5 mx-auto shadow-black">
                    <h2 className="text-center">Current Savings: ${bank.currency.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                </div>
            </div>


            <div className="container mx-auto mt-20 flex flex-row justify-evenly">
                <form onSubmit={handleOnSubmitDepositForm} className="card w-1/3">
                    <div className="mb-3">
                        <h2 className="text-center">Deposit</h2>
                    </div>

                    <div className="mb-3">
                        <input onChange={(e) => setQuantityDeposit(Number(e.target.value))} type={'number'} className='form-control text-center' />
                    </div>

                    <div className="mb-5 flex flex-row justify-center">
                        <button type="submit" className="btn-primary">Deposit</button>
                    </div>
                </form>

                <form onSubmit={handleOnSubmitWithdrawForm} className="card w-1/3">
                    <div className="mb-3">
                        <h2 className="text-center">Withdraw</h2>
                    </div>

                    <div className="mb-5">
                        <input onChange={(e) => setQuantityWithDraw(Number(e.target.value))} type={'number'} className='form-control text-center' />
                    </div>

                    <div className="mb-3 flex flex-row justify-center">
                        <button type="submit" className="btn-primary">Withdraw</button>
                    </div>
                </form>
            </div>


        </div >
    )
}

export default Bank;