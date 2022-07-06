import { faCirclePlus, faPersonFallingBurst } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useRef, useState } from "react";
import Swal from "sweetalert2";

interface Currency {
    userId: string,
    currency: number
}

async function getRandomPhraseByDifficulty(difficulty: string) {
    const response = await fetch(`/api/gamesAPI/cliffHanger/${difficulty}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

interface CliffHangerPhrase {
    difficulty: string,
    prhase: string
}

function CliffHanger({ data }: any) {
    const [currency] = useState<Currency>(data.currency as Currency);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [phrase, setPhrase] = useState<string>('');
    const [phraseToShow, setPhraseToShow] = useState<string>('');
    const [letter, setLetter] = useState<string>();
    const [usedLetters, setUsedLetters] = useState<string[]>([]);
    const [tries, setTries] = useState<number>(0);
    const [limitTries, setLimitTries] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>();
    const [prize, setPrize] = useState<number>(0);

    const handleOnClickStartGame = async (difficulty: string) => {
        switch (difficulty) {
            case 'EASY':
                setLimitTries(10);
                setPrize(1000);
                break;

            case 'MEDIUM':
                setLimitTries(7);
                setPrize(3000);
                break;

            case 'HARD':
                setLimitTries(5);
                setPrize(8000);
                break;
        }

        setDifficulty(difficulty);

        const response = await getRandomPhraseByDifficulty(difficulty);

        let generatedPhrase: string = response.cliffHangerPhrase.phrase;
        setPhrase(generatedPhrase);

        let phraseToShow: string = '';
        for (let i = 0; i < generatedPhrase.length; i++) {
            if (generatedPhrase[i] !== ' ') {
                phraseToShow += '-';
            } else {
                phraseToShow += ' ';
            }
        }
        setPhraseToShow(phraseToShow);
        setIsPlaying(true);
        setLetter('');
    }

    const handleOnClickSubmitGuessLetterForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        let newPhrase: string = '';
        let isRight: boolean = false;
        let newTries: number = tries;
        let isEverythingRight: boolean = true;
        if (!usedLetters?.includes(letter!)) {
            for (let i = 0; i < phrase.length; i++) {
                if (phraseToShow[i] === '-') {
                    if (phrase[i] === letter) {
                        newPhrase += letter + '';
                        isRight = true;
                    } else {
                        newPhrase += '-';
                        isEverythingRight = false;
                    }
                } else {
                    newPhrase += phraseToShow[i];
                }
            }

            if (!isRight) {
                newTries++;
            }

            if (newTries === limitTries) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `You lost, so you didn't win anything!! <br /><br />The right answer was: <br />"${phrase}"`,
                    showConfirmButton: true,
                }).then(() => {
                    handleOnClickEndGame();
                });
                return;
            }

            if (isEverythingRight) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `You cleared the game in ${difficulty} difficulty! You win ${prize}!!`,
                    showConfirmButton: true,
                }).then(async () => {
                    const type: string = 'ADD';
                    const response = await proccessPayment(prize, type);
                    handleOnClickEndGame();
                });

                return;
            }

            setPhraseToShow(newPhrase);
            setUsedLetters(prev => [...prev, letter!]);
            setTries(newTries);
            setLetter('');
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'You used that letter already!',
                showConfirmButton: true
            });
        }
    }

    const handleOnClickEndGame = () => {
        setIsPlaying(false);
        setTries(0);
        setUsedLetters([]);
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">CliffHanger <FontAwesomeIcon icon={faPersonFallingBurst} /></h1>
                <hr />
            </div>


            {
                !isPlaying ? <div>
                    <div className="flex flex-row justify-center mb-10">
                        <button type="button" onClick={async () => handleOnClickStartGame('EASY')} className="btn-warning rounded-md p-5 font-bold w-36"> Start On Easy </button>
                    </div>
                    <div className="flex flex-row justify-center mb-10">
                        <button type="button" onClick={async () => handleOnClickStartGame('MEDIUM')} className="btn-secondary w-36"> Start On Medium </button>
                    </div>
                    <div className="flex flex-row justify-center mb-10">
                        <button type="button" onClick={async () => handleOnClickStartGame('HARD')} className="btn-dark w-36"> Start On Hard </button>
                    </div>
                </div> :
                    <div>
                        <div className="mb-20">
                            <h3 className="text-center">{phraseToShow}</h3>
                        </div>
                        <div className="mb-20">
                            <h3 className="text-center">Used letters: </h3>
                            <h3 className="text-center">{usedLetters.map((element: string, index: number) => (
                                <span style={{
                                    color: `${phrase.includes(element) ? 'black' : 'red'}`
                                }} key={index}>[ {element} ]</span>
                            ))}</h3>
                            <h4 className="text-center mt-20">You have {limitTries - tries} lives!</h4>
                        </div>
                        <form onSubmit={handleOnClickSubmitGuessLetterForm} className="card w-[10rem] mx-auto">
                            <div className="mb-5">
                                <h5 className="text-center mb-2">Type a Letter</h5>
                                <input value={letter} onChange={(e) => setLetter(e.target.value.toUpperCase())} type={'text'} className="form-control text-center uppercase" maxLength={1} />
                            </div>

                            <div className="flex flex-row justify-center">
                                <button disabled={!letter} type="submit" className="btn-dark"><FontAwesomeIcon icon={faCirclePlus} /> Guess</button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default CliffHanger;