import { faCoins, faHandHoldingDollar, faMoneyBill, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';

interface Currency {
    userId: string,
    currency: number
}

async function getResultDoubleOrNothing(bet: number, round: number) {
    const response = await fetch(`/api/gamesAPI/doubleOrNothingAPI/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet, round })
    });

    const data = await response.json();
    return data;
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

function DoubleOrNothing({ data }: any) {
    const [currency, setCurrency] = useState<Currency>(data.currency as Currency);
    const [playing, setPlaying] = useState<boolean>(false);
    const [round, setRound] = useState<number>(1);
    const [message, setMessage] = useState<string>();
    const [bet, setBet] = useState<number>(0);

    const handleOnClickFlip = async () => {
        const response = await getResultDoubleOrNothing(bet, round);
        setBet(response.newBet);
        setMessage(response.message);
        setRound(response.round);
        if (!response.result) {
            setPlaying(false);
        }
    }

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
            setMessage('');
        }
    }

    const handleOnClickCollectWinnings = async () => {
        const type: string = 'ADD';
        setPlaying(false);
        setMessage('');
        setRound(1);
        const response = await proccessPayment(bet, type);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `You recollected $${bet}!`,
            showConfirmButton: true,
        });
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Double Or Nothing <FontAwesomeIcon icon={faMoneyBill} /></h1>
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
                        <h3 className="text-center">Flip #{round}</h3>
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }} onClick={async () => handleOnClickFlip()} className="card w-40 mx-auto mt-20 cursor-pointer">
                            <div className="flex flex-col items-center">
                                <h1><FontAwesomeIcon icon={faCoins} /></h1>
                                <h2 className="mt-2">Flip</h2>
                            </div>
                        </motion.div>
                    </div>
            }

            <div className="mt-10">
                <h2 className="text-center">{message}</h2>
                {
                    round > 1 ?
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }} onClick={async () => handleOnClickCollectWinnings()} className="card w-40 mx-auto mt-20 cursor-pointer">
                            <div className="flex flex-col items-center">
                                <h1><FontAwesomeIcon icon={faHandHoldingDollar} /></h1>
                                <h2 className="mt-2 text-center">Collect Winnings</h2>
                            </div>
                        </motion.div>
                        : null
                }
            </div>


        </div>
    )
}

export default DoubleOrNothing;