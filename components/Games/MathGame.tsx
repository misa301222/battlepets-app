import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';

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

function MathGame() {
    const [answer, setAnswer] = useState<number>();
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [operation, setOperation] = useState<string>('x');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(1);
    const [points, setPoints] = useState<number>(0);
    const [nextLevelPage, setNextLevelPage] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);

    const handleOnClickStartGame = () => {
        if (level < 10) {
            setFirstNumber(Math.floor(Math.random() * 10));
            setSecondNumber(Math.floor(Math.random() * 10));
        } else {
            setFirstNumber(Math.floor(Math.random() * 100));
            setSecondNumber(Math.floor(Math.random() * 100));
        }

        let arithmeticOperation: number = Math.floor(Math.random() * 3) + 1;
        switch (arithmeticOperation) {
            case 1:
                setOperation('+');
                break;

            case 2:
                setOperation('-');
                break;

            case 3:
                setOperation('x');
                break;
        }
        setStartTime(performance.now());
        setIsPlaying(true);
        setNextLevelPage(false);
    }

    const handleOnSubmitAnswerForm = (event: SyntheticEvent) => {
        event.preventDefault();

        switch (operation) {
            case '+':
                if (answer === (firstNumber + secondNumber)) {
                    setLevel(level + 1);
                    setNextLevelPage(true);
                    let totalTime: number = (performance.now() - startTime) / 1000;
                    setTotalTime(totalTime);
                    setIsRight(true);
                    calculateScore(totalTime);
                } else {
                    setIsRight(false);
                }
                break;

            case '-':
                if (answer === (firstNumber - secondNumber)) {
                    setLevel(level + 1);
                    setNextLevelPage(true);
                    let totalTime: number = (performance.now() - startTime) / 1000;
                    setTotalTime(totalTime);
                    calculateScore(totalTime);
                    setIsRight(true);
                } else {
                    setIsRight(false);
                }
                break;

            case 'x':
                if (answer === (firstNumber * secondNumber)) {
                    setLevel(level + 1);
                    setNextLevelPage(true);
                    let totalTime: number = (performance.now() - startTime) / 1000;
                    setTotalTime(totalTime);
                    setIsRight(true);
                    calculateScore(totalTime);
                } else {
                    setIsRight(false);
                }
                break;
        }
    }

    const calculateScore = (seconds: number) => {
        if (seconds < 2) {
            setPoints(points + 1000);
            return;
        }
        if (seconds < 5) {
            setPoints(points + 500);
            return;
        }

        if (seconds < 10) {
            setPoints(points + 400);
            return;
        }

        setPoints(points + 50);
    }

    const handleOnClickStopPlaying = async () => {
        const type: string = 'ADD';
        if (points > 0) {
            const response = await proccessPayment(points, type);
            if (response.isOk) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `You win $${points}!`,
                    showConfirmButton: true,
                }).then(() => {
                    setIsPlaying(false);
                    setLevel(1);
                    setPoints(0);
                    setNextLevelPage(false);
                    setIsRight(true);
                });
            }
        } else {
            setIsPlaying(false);
            setLevel(1);
            setPoints(0);
            setNextLevelPage(false);
            setIsRight(true);
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Math Game <FontAwesomeIcon icon={faCalculator} /></h1>
                <hr />
            </div>

            {
                !isPlaying ?
                    <div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                translateX: -400
                            }}

                            animate={{
                                opacity: 1,
                                translateX: 0,
                                transition: {
                                    type: 'spring',
                                    duration: 1.4
                                }
                            }}
                            className="container mx-auto card mb-20 flex flex-row">
                            <div className="w-1/2 flex flex-row items-center">
                                <img src={'/static/images/Math.png'} className='max-w-xl max-h-[20rem] mx-auto' />
                            </div>
                            <div className="w-1/3 mx-auto p-5">
                                <h2 className="text-center">This is the Math Game!</h2>
                                <h5 className="mt-10 text-center">Maths are fun! You'll see.<br /><br />
                                    How to play?<br />
                                    I'll ask you some operations, it can be addition, substraction, or multiplication.<br />
                                    <span className="text-blue-600">If you get the answer fast you get more points.</span><br />
                                    <span className="underline">But after level 10, things get more complicated.</span></h5>
                                <h3 className="text-center mt-10">The more points you win, better the price.</h3>
                            </div>
                        </motion.div>
                    </div>
                    : null
            }

            <div className="container mx-auto p-5 mb-10 mt-10">
                <h3 className="text-center">Level {level}</h3>
            </div>
            {
                isPlaying ?
                    !nextLevelPage ?
                        <div>
                            <form onSubmit={handleOnSubmitAnswerForm} className="card w-1/2 mx-auto">
                                <div className="flex flex-row justify-center gap-5 items-baseline">
                                    <div>
                                        <h5 className="">{firstNumber} {operation} {secondNumber} =</h5>
                                    </div>
                                    <div className="">
                                        <input autoFocus type={'number'} onChange={(e) => setAnswer(Number(e.target.value))} className="form-control text-center" autoComplete="off" />
                                    </div>

                                    <div className="">
                                        <button type="submit" className="btn-dark">Accept</button>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center gap-5 items-baseline mt-10">
                                    {!isRight ? <h5 className="text-red-800">Answer is Wrong! Try again quick</h5> : <div></div>}
                                </div>
                            </form>

                            <div className="flex flex-row justify-center mt-20">
                                <button onClick={async () => handleOnClickStopPlaying()} type="button" className="w-40 btn-danger">Quit</button>
                            </div>
                        </div>
                        :
                        <div>
                            <h3 className="text-center mb-10">You answered in: {totalTime.toFixed(2)} seconds!</h3>
                            <h3 className="text-center mb-10">Total Points: {points}</h3>
                            <div className="flex flex-row justify-center mb-20">
                                <button onClick={() => handleOnClickStartGame()} type="button" className="btn-primary">Next Level</button>
                            </div>

                            <div className="flex flex-row justify-center">
                                <button onClick={async () => handleOnClickStopPlaying()} type="button" className="btn-danger">Stop Playing</button>
                            </div>
                        </div>
                    :
                    <div className="flex flex-row justify-center">
                        <button onClick={() => handleOnClickStartGame()} type="button" className="btn-primary w-40">Start</button>
                    </div>
            }

        </div>
    )
}

export default MathGame;