import { faMoneyBill, faMoneyBill1Wave, faQuestion } from "@fortawesome/free-solid-svg-icons";
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
                    <div>
                        <div className="container mx-auto card mb-20 flex flex-row">
                            <div className="w-1/2">
                                <img src={'/static/images/Reptil.jpg'} className='max-w-xl' />
                            </div>
                            <div className="w-1/3 mx-auto p-5">
                                <h2 className="text-center">Hello!!!</h2>
                                <h5 className="mt-10 text-center">Welcome to the guess game! This is simple, you only have to guess.<br /><br />
                                    <span className="text-green-800">If you win your bet multiplies x10!</span><br />
                                    <span className="text-red-800">If you lose i take all your money.</span><br />
                                    You can play all you want, you can become millionaire.</h5>
                                <h3 className="text-center mt-10"><FontAwesomeIcon icon={faMoneyBill} /></h3>
                            </div>
                        </div>
                        <div className="card w-64 mx-auto">
                            <h5 className="text-center mb-4">Quantity to Bet</h5>
                            <input onChange={(e) => setBet(Number(e.target.value))} className="form-control text-center" type={'number'} />
                            <button disabled={bet <= 0} onClick={async () => handleOnClickStartGame()} className="btn-primary w-32 mx-auto mt-10" type="button"><FontAwesomeIcon icon={faMoneyBill1Wave} /> Bet</button>
                        </div>
                    </div>
                    :
                    <div>
                        <h4 className="text-center mb-10">There is something hidden... select one.</h4>
                        <motion.div
                            initial={{
                                opacity: 0,
                                translateX: -300
                            }}
                            animate={{
                                opacity: 1,
                                translateX: 0
                            }}
                            className="flex flex-wrap gap-20 w-1/4 mx-auto">
                            {[...Array(20)].map((element: any, index: number) => (
                                <motion.div
                                    onClick={async () => handleOnClickSelectItem(index)}
                                    key={index}
                                    className="rounded-full w-16 h-16 card cursor-pointer hover:bg-blue-200 duration-200">
                                    <h5 className="text-center">{index}</h5>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
            }
        </div>
    )
}

export default Guess;