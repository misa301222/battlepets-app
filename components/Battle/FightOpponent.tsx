import { faArrowLeft, faBook, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import PetCardBattle from "../Cards/PetCardBattle";
import PetCardFull from "../Cards/PetCardFull";
import { useRouter } from "next/router";

interface PetType {
    _id: string,
    petTypeName: string,
    imageURL: string
}

interface Pet {
    _id: string,
    userId: string,
    currentHealthPoints?: number,
    maxHealthPoints?: number,
    name: string,
    attackPoints?: number,
    defensePoints?: number,
    agilityPoints?: number,
    currentMagicPoints?: number,
    maxMagicPoints?: number,
    availableAttacks?: string[],
    level?: number,
    imageURL?: string,
    customImageURL?: string,
    wins?: number,
    defeats?: number,
    draws?: number,
    petType: string,
    position: number,
    experience: number,
    experienceGranted?: number
}

interface BattleLog {
    id: number,
    firstMessage: string,
    secondMessage: string
}

async function updateHealthAndMagicPoints(id: string, currentHealthPoints: number, currentMagicPoints: number) {
    const response = await fetch(`/api/petAPI/updateHealthAndMagicPoints`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, currentHealthPoints, currentMagicPoints })
    });

    const data = await response.json();
    return data;
}

async function updateExperienceAndLevel(id: string, experience: number, outcome: string) {
    const response = await fetch(`/api/petAPI/updateExperienceAndLevel`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, experience, outcome })
    });

    const data = await response.json();
    return data;
}

function FightOpponent({ data }: any) {
    const [userPet, setUserPet] = useState<Pet>(data.petPositionOne as Pet);
    const [updatedPet, setUpdatedPet] = useState<Pet | null>(null);
    const [opponentPet, setOpponentPet] = useState<Pet>(data.opponentBattlePet as Pet);
    const [winner, setWinner] = useState<string>('');
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [isBattleFinished, setIsBattleFinished] = useState<boolean>(false);
    const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
    const router = useRouter();

    const variants = {
        open: { opacity: 1, translateX: -50, rotate: 45 },
        closed: { opacity: 0, translateX: 0 },
    }

    const variantsDraw = {
        open: { opacity: 1, translateX: -350, rotate: 15, y: -50 },
        closed: { opacity: 0, translateX: 0 },
    }

    const handleOnClickAction = async (action: string) => {
        const multiplier: number = userPet.attackPoints! / 10 / 4 - (opponentPet.defensePoints! / 10 / 4) > 0 ? ((userPet.attackPoints! / 10 / 4) - (opponentPet.defensePoints! / 10 / 4)) * 0.1 : 0.3;
        const battleLogIndex: number = battleLog.length;

        const newOpponentPet: Pet = opponentPet;
        const newUserPet: Pet = userPet;

        let message: string = `${newUserPet.name} (You) used `;

        switch (action) {
            case 'Attack':
                console.log(multiplier);
                const damage: number = newUserPet.attackPoints! * multiplier
                newOpponentPet.currentHealthPoints! -= damage;
                setOpponentPet(prev => ({ ...prev, currentHealthPoints: newOpponentPet.currentHealthPoints }));

                message += `Attack! That was ${damage.toFixed(2)} of Damage!`;
                break;

            case 'Defense':
                message += `Defense!`;
                let isDefended: boolean = Math.random() < 0.3;
                if (isDefended) {
                    message += ` You blocked All damage for this turn!`;
                } else {
                    message += ` But it didn't work :(!`;
                }
                break;

            case 'Heal':
                const heal: number = 10;
                newUserPet.currentMagicPoints! -= 5;
                newUserPet.currentHealthPoints! += heal;

                if (newUserPet.currentHealthPoints! > newUserPet.maxHealthPoints!) {
                    newUserPet.currentHealthPoints = newUserPet.maxHealthPoints!;
                }

                setUserPet(prev => ({ ...prev, currentHealthPoints: newUserPet.currentHealthPoints, currentMagicPoints: newUserPet.currentMagicPoints }));
                message += `Healed! You Recovered ${heal.toFixed(2)} HP!`
                break;

            case 'Skip':
                message += `Skip! I don't know why though!`;
                break;
        }

        let newMessage: BattleLog = {
            id: battleLogIndex,
            firstMessage: message,
            secondMessage: ''
        }
        opponentAction(newMessage);
    }

    const opponentAction = async (newMessage: BattleLog) => {
        let maxNumber: number = 2;
        const multiplier: number = opponentPet.attackPoints! / 10 / 4 - (userPet.defensePoints! / 10 / 4) > 0 ? (opponentPet.attackPoints! / 10 / 4 - (userPet.defensePoints! / 10 / 4)) * 0.1 : 0.3;

        const newOpponentPet: Pet = opponentPet;
        const newUserPet: Pet = userPet;

        let hashActions = new Map();
        hashActions.set(1, 'Attack');
        hashActions.set(2, 'Defense');
        if (newOpponentPet.currentMagicPoints! > 0) {
            hashActions.set(3, 'Heal');
            maxNumber = 3;
        }
        let actionRandom: number = Math.floor(Math.random() * (maxNumber)) + 1;
        // actionRandom = 2;
        let message: string = `${newOpponentPet.name} used `;

        switch (hashActions.get(actionRandom)) {
            case 'Attack':
                const damage: number = newOpponentPet.attackPoints! * multiplier;

                newUserPet.currentHealthPoints! -= damage;
                setUserPet(prev => ({ ...prev, currentHealthPoints: newUserPet.currentHealthPoints }));

                message += `Attack! That was ${damage.toFixed(2)} of Damage!`;
                break;

            case 'Defense':
                let isDefended: boolean = Math.random() < 0.3;
                if (isDefended) {
                    message += ` Opponent blocked All damage for this turn!`;
                } else {
                    message += `Defense! But it didn't work >:)!`;
                }
                break;

            case 'Heal':
                const heal: number = 10;
                newOpponentPet.currentMagicPoints! -= 5;
                newOpponentPet.currentHealthPoints! += heal;

                if (newOpponentPet.currentHealthPoints! > newOpponentPet.maxHealthPoints!) {
                    newOpponentPet.currentHealthPoints = newOpponentPet.maxHealthPoints!;
                }

                setOpponentPet(prev => ({ ...prev, currentHealthPoints: newOpponentPet.currentHealthPoints, currentMagicPoints: newOpponentPet.currentMagicPoints }));
                message += `Healed! Opponent Recovered ${heal.toFixed(2)} HP!`
                break;
        }
        newMessage.secondMessage = message;
        setBattleLog(prev => [...prev, newMessage]);
        await updateHealthAndMagicPoints(newUserPet._id, newUserPet.currentHealthPoints!, newUserPet.currentMagicPoints!);

        if (newOpponentPet.currentHealthPoints! <= 0 || userPet.currentHealthPoints! <= 0) {
            setIsBattleFinished(true);
            if (newOpponentPet.currentHealthPoints! <= 0 && userPet.currentHealthPoints! > 0) {
                const outcome: string = 'WIN';
                setWinner(userPet._id);
                //500 EXPERIENCE GRANTED
                let experienceGranted: number = newOpponentPet.experienceGranted!;
                //experienceGranted = 50000;
                const responseExperience = await updateExperienceAndLevel(userPet._id, experienceGranted, outcome);
                setUpdatedPet(responseExperience);
            }

            if (newOpponentPet.currentHealthPoints! > 0 && userPet.currentHealthPoints! <= 0) {
                const outcome: string = 'DEFEAT';
                setWinner(opponentPet._id);

                let experienceGranted: number = 0;
                await updateExperienceAndLevel(userPet._id, experienceGranted, outcome);
            }

            if (newOpponentPet.currentHealthPoints! <= 0 && userPet.currentHealthPoints! <= 0) {
                setWinner('');
                setIsDraw(true);
            }
        }
    }

    return (
        <div>
            <div className="container mx-auto p-5 mb-10 mt-10">
                <h1 className="header">Battle! <FontAwesomeIcon icon={faUserNinja} /></h1>
                <hr />
            </div>

            <div className="flex flex-row justify-evenly items-center w-4/5 mx-auto">
                <div>
                    <motion.h1
                        animate={!isDraw && winner === userPet._id ? 'open' : 'closed'}
                        variants={variants}
                        initial={{
                            opacity: 0
                        }}
                        drag
                        dragConstraints={{
                            top: -50,
                            left: -50,
                            right: 50,
                            bottom: 50,
                        }}
                        className="text-center text-[7rem] absolute z-10 mt-20 bg-slate-400/50 p-5 rounded-lg">WINNER</motion.h1>
                    <PetCardBattle pet={userPet} />
                </div>
                <div>
                    <motion.h1
                        animate={isDraw && !winner ? 'open' : 'closed'}
                        variants={variantsDraw}
                        initial={{
                            opacity: 0
                        }}
                        drag
                        dragConstraints={{
                            top: -50,
                            left: -50,
                            right: 50,
                            bottom: 50,
                        }}
                        className="text-center text-[7rem] absolute z-10 mt-20 bg-red-700 p-5 rounded-lg">DRAAAAAAAW!</motion.h1>
                    <h1 className="text-[10rem]">VS</h1>
                </div>
                <div className="">
                    <motion.h1
                        animate={!isDraw && winner === opponentPet._id ? 'open' : 'closed'}
                        variants={variants}
                        initial={{
                            opacity: 0
                        }}
                        drag
                        dragConstraints={{
                            top: -50,
                            left: -50,
                            right: 50,
                            bottom: 50,
                        }}
                        className="text-center text-[7rem] absolute z-10 mt-20 bg-slate-400/50 p-5 rounded-lg">WINNER</motion.h1>
                    <PetCardBattle pet={opponentPet} />
                </div>
            </div>

            {
                winner === userPet._id ?
                    <div>
                        <div className="w-1/2 mx-auto mt-20 flex flex-row justify-center">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                className="">You Win {opponentPet.experienceGranted} experience!</motion.h2>
                        </div>

                        {
                            updatedPet ?
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        translateX: -200
                                    }}
                                    animate={{
                                        opacity: 1,
                                        translateX: 0
                                    }}
                                    className="flex mt-10 flex-row mx-auto justify-center w-1/2">
                                    <PetCardFull pet={updatedPet} />
                                </motion.div>
                                : null
                        }
                    </div>
                    : null
            }

            {
                !isBattleFinished ?
                    < div className="bg-slate-200 p-5 rounded-md shadow-black shadow-md w-3/5 mx-auto mt-20">
                        <h4 className="text-center">Actions</h4>
                        <hr className="border-black mb-5 w-1/2 mx-auto" />
                        <div className="flex flex-row justify-evenly">
                            {
                                userPet.availableAttacks?.map((element: string, index: number) => (
                                    <button disabled={isBattleFinished || (element === 'Heal' && userPet.currentMagicPoints! < 1)} onClick={async () => handleOnClickAction(element)} key={index} type="button" className="btn-action w-36">{element}</button>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-row justify-center mt-10">
                        <button onClick={() => router.push('/dashboard')} className="btn-dark" type="button"><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
                    </div>
            }

            <div className="w-1/2 mx-auto mt-10">
                <h3 className="text-center mb-2"><FontAwesomeIcon icon={faBook} /> Combat Log</h3>
                <hr className="mb-4" />
                <div className="bg-indigo-300 rounded-md shadow-black shadow-md p-5 max-h-[30rem] overflow-y-auto">
                    {
                        battleLog.slice(0).reverse().map((element: BattleLog, index: number) => (
                            <div className="mb-10 w-1/2 bg-blue-100 mx-auto p-2 rounded-md" key={index}>
                                <h3 className="text-center mb-2">Turn #{element.id}</h3>
                                <h5 className="text-center">{element.firstMessage}</h5>
                                <h5 className="text-center">{element.secondMessage}</h5>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default FightOpponent;