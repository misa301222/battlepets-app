import { faCirclePlus, faPersonFallingBurst } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

interface Currency {
    userId: string,
    currency: number
}

function CliffHanger({ data }: any) {
    const [currency] = useState<Currency>(data.currency as Currency);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [phrase, setPhrase] = useState<string>('Hello');
    const [phraseToShow, setPhraseToShow] = useState<string>('');
    const [letter, setLetter] = useState<string>();
    const [usedLetters, setUsedLetters] = useState<string[]>([]);
    const [tries, setTries] = useState<number>(0);

    const handleOnClickStartGame = () => {

        let phraseToShow: string = '';
        for (let i = 0; i < phrase.length; i++) {
            if (phrase[i] !== ' ') {
                phraseToShow += '-';
            } else {
                phraseToShow += ' ';
            }
        }
        setPhraseToShow(phraseToShow);
        setIsPlaying(true);
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

            if (newTries === 3) {
                handleOnClickEndGame();
                return;
            }

            if (isEverythingRight) {
                handleOnClickEndGame();
                return;
            }

            setPhraseToShow(newPhrase);
            setUsedLetters(prev => [...prev, letter!]);
            setTries(newTries);
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
                    <div className="flex flex-row justify-center">
                        <button type="button" onClick={handleOnClickStartGame} className="btn-secondary w-36"> Start </button>
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
                        </div>
                        <form onSubmit={handleOnClickSubmitGuessLetterForm} className="card w-[10rem] mx-auto">
                            <div className="mb-5">
                                <h5 className="text-center mb-2">Type a Letter</h5>
                                <input onChange={(e) => setLetter(e.target.value)} type={'text'} className="form-control text-center" maxLength={1} />
                            </div>

                            <div className="flex flex-row justify-center">
                                <button type="submit" className="btn-dark"><FontAwesomeIcon icon={faCirclePlus} /> Guess</button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

export default CliffHanger;