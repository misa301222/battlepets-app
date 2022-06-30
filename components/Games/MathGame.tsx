import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react";

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
        setIsPlaying(false);
        setLevel(1);
        setPoints(0);
        setNextLevelPage(false);
        setIsRight(true);
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Math Game <FontAwesomeIcon icon={faCalculator} /></h1>
                <hr />
            </div>

            <div className="container mx-auto p-5 mb-10 mt-10">
                <h3 className="text-center">Level {level}</h3>
            </div>
            {
                isPlaying ?
                    !nextLevelPage ?
                        <form onSubmit={handleOnSubmitAnswerForm} className="card w-1/2 mx-auto">
                            <div className="flex flex-row justify-center gap-5 items-baseline">
                                <div>
                                    <h5 className="">{firstNumber} {operation} {secondNumber} =</h5>
                                </div>
                                <div className="">
                                    <input type={'number'} onChange={(e) => setAnswer(Number(e.target.value))} className="form-control text-center" />
                                </div>

                                <div className="">
                                    <button type="submit" className="btn-dark">Accept</button>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center gap-5 items-baseline mt-10">
                                {!isRight ? <h5 className="text-red-800">Answer is Wrong! Try again quick</h5> : <div></div>}
                            </div>
                        </form>
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
                        <button onClick={() => handleOnClickStartGame()} type="button" className="btn-primary">Start</button>
                    </div>
            }

        </div>
    )
}

export default MathGame;