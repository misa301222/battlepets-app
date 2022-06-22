import { faMoneyBill1Wave, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLFactory, ReactHTML, useState } from "react";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';

interface Currency {
    userId: string,
    currency: number
}

async function proccessPayment(quantity: number, type: string) {
    const response = await fetch(`/api/currencyAPI/addRemoveCurrencyByEmail`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, type })
    });

    const data = await response.json();
    return data;
}

function Guess({ data }: any) {
    const [playing, setPlaying] = useState<boolean>(false);
    const [currency, setCurrency] = useState<Currency>(data.currency as Currency);
    const [bet, setBet] = useState<number>(0);
    const [answer, setAnswer] = useState<number>(0);

    const handleOnClickStartGame = async () => {
        const type: string = 'REMOVE';

        const response = await proccessPayment(bet, type);
        if (!response.isOk) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'You dont have enough funds :(',
                showConfirmButton: true,
            });
        } else {
            setPlaying(true);
            setAnswer(Math.floor(Math.random() * 21));
        }
    }

    const handleOnClickSelectItem = async (index: number) => {
        if (answer === index) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'You won!',
                showConfirmButton: true,
            }).then(async () => {
                const type: string = 'ADD';
                setPlaying(false);
                const response = await proccessPayment((bet * 10), type);
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `You lost! Right position was ${answer}`,
                showConfirmButton: true,
            }).then(() => {
                setPlaying(false);
            });
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Guess Game <FontAwesomeIcon icon={faQuestion} /></h1>
                <hr />
            </div>

            {
                !playing ?
                    <div className="card w-64 mx-auto">
                        <h5 className="text-center mb-4">Quantity to Bet</h5>
                        <input onChange={(e) => setBet(Number(e.target.value))} className="form-control text-center" type={'number'} />
                        <button onClick={async () => handleOnClickStartGame()} className="btn-primary w-32 mx-auto mt-10" type="button"><FontAwesomeIcon icon={faMoneyBill1Wave} /> Bet</button>
                    </div>
                    :
                    <div>
                        <div className="flex flex-wrap gap-20 w-1/4 mx-auto">
                            {[...Array(20)].map((element: any, index: number) => (
                                <motion.div
                                    onClick={async () => handleOnClickSelectItem(index)}
                                    key={index}
                                    className="rounded-full w-16 h-16 card cursor-pointer hover:bg-blue-200 duration-200">
                                    <h5 className="text-center">{index}</h5>
                                </motion.div>
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Guess;