import { faCoins, faMoneyBill, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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
    const response = await fetch(`/api/currencyAPI/addRemoveCurrencyByEmail/`, {
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
        setPlaying(true);
        setMessage('');
        const response = await proccessPayment(bet, type);
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
                        <div onClick={async () => handleOnClickFlip()} className="card w-40 mx-auto mt-20 cursor-pointer">
                            <div className="flex flex-col items-center">
                                <h1><FontAwesomeIcon icon={faCoins} /></h1>
                                <h2 className="mt-2">Flip</h2>
                            </div>
                        </div>
                    </div>
            }

            <div className="mt-10">
                <h2 className="text-center">{message}</h2>
            </div>

        </div>
    )
}

export default DoubleOrNothing;