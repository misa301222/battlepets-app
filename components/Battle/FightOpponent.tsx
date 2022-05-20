import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import PetCardBattle from "../Cards/PetCardBattle";

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
    experience: number
}

interface BattleLog {
    id: number,
    firstMessage: string,
    secondMessage: string
}

function FightOpponent({ data }: any) {
    const [userPet, setUserPet] = useState<Pet>(data.petPositionOne as Pet);
    const [opponentPet, setOpponentPet] = useState<Pet>(data.opponentBattlePet as Pet);
    const [winner, setWinner] = useState<string>('');
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [isBattleFinished, setIsBattleFinished] = useState<boolean>(false);
    const [battleLog, setBattleLog] = useState<BattleLog[]>([]);

    const variants = {
        open: { opacity: 1, translateX: -50, rotate: 45 },
        closed: { opacity: 0, translateX: 0 },
    }

    const variantsDraw = {
        open: { opacity: 1, translateX: -350, rotate: 15, y: -50 },
        closed: { opacity: 0, translateX: 0 },
    }

    const handleOnClickAction = (action: string) => {
        const multiplier: number = 0.3;
        const battleLogIndex: number = battleLog.length;

        const newOpponentPet: Pet = opponentPet;
        const newUserPet: Pet = userPet;

        let message: string = `${newUserPet.name} (You) used `;

        switch (action) {
            case 'Attack':
                const damage: number = newUserPet.attackPoints! * multiplier
                newOpponentPet.currentHealthPoints! -= damage;
                setOpponentPet(prev => ({ ...prev, currentHealthPoints: newOpponentPet.currentHealthPoints }));

                message += `Attack! That was ${damage} of Damage!`;
                break;

            case 'Defense':
                break;

            case 'Heal':
                const heal: number = 10;
                newUserPet.currentMagicPoints! -= 5;
                newUserPet.currentHealthPoints! += heal;

                if (newUserPet.currentHealthPoints! > newUserPet.maxHealthPoints!) {
                    newUserPet.currentHealthPoints = newUserPet.maxHealthPoints!;
                }

                setUserPet(prev => ({ ...prev, currentHealthPoints: newUserPet.currentHealthPoints, currentMagicPoints: newUserPet.currentMagicPoints }));
                message += `Healed! You Recovered ${heal} HP!`
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

    const opponentAction = (newMessage: BattleLog) => {
        let maxNumber: number = 2;
        const multiplier: number = 0.3;

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
        actionRandom = 1;
        let message: string = `${newOpponentPet.name} used `;

        switch (hashActions.get(actionRandom)) {
            case 'Attack':
                const damage: number = newOpponentPet.attackPoints! * multiplier;

                newUserPet.currentHealthPoints! -= damage;
                setUserPet(prev => ({ ...prev, currentHealthPoints: newUserPet.currentHealthPoints }));

                message += `Attack! That was ${damage} of Damage!`;
                break;

            case 'Defense':
                break;

            case 'Heal':
                const heal: number = 10;
                newOpponentPet.currentMagicPoints! -= 5;
                newOpponentPet.currentHealthPoints! += heal;

                if (newOpponentPet.currentHealthPoints! > newOpponentPet.maxHealthPoints!) {
                    newOpponentPet.currentHealthPoints = newOpponentPet.maxHealthPoints!;
                }

                setOpponentPet(prev => ({ ...prev, currentHealthPoints: newOpponentPet.currentHealthPoints, currentMagicPoints: newOpponentPet.currentMagicPoints }));
                message += `Healed! Opponent Recovered ${heal} HP!`
                break;
        }
        newMessage.secondMessage = message;
        setBattleLog(prev => [...prev, newMessage]);

        if (newOpponentPet.currentHealthPoints! <= 0 || userPet.currentHealthPoints! <= 0) {
            setIsBattleFinished(true);
            if (newOpponentPet.currentHealthPoints! <= 0 && userPet.currentHealthPoints! > 0) {
                setWinner(userPet._id);
            }

            if (newOpponentPet.currentHealthPoints! > 0 && userPet.currentHealthPoints! <= 0) {
                setWinner(opponentPet._id);
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

            <div className="bg-slate-200 p-5 rounded-md shadow-black shadow-md w-3/5 mx-auto mt-20">
                <h4 className="text-center">Actions</h4>
                <hr className="border-black mb-5 w-1/2 mx-auto" />
                <div className="flex flex-row justify-evenly">
                    {
                        userPet.availableAttacks?.map((element: string, index: number) => (
                            <button disabled={isBattleFinished || (element === 'Heal' && userPet.currentMagicPoints! < 1)} onClick={() => handleOnClickAction(element)} key={index} type="button" className="btn-action w-36">{element}</button>
                        ))
                    }
                </div>
            </div>

            <div className="w-1/2 mx-auto mt-10">
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
        </div>
    )
}

export default FightOpponent;