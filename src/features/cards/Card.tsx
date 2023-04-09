import React, { CSSProperties, useState } from 'react';
import { Button } from "../buttons/Button";
import Web3 from 'web3';

type CardsPropsType = {
    img: string;
    name: string;
    type: string;
    level: number;
    style?: CSSProperties;
    handleCardClick?: () => void;
};

declare global {
    interface Window {
        ethereum?: {
            enable: () => Promise<void>;
            sendAsync: (payload: any) => Promise<void>;
            selectedAddress: string;
        };
    }
}

interface Props {
    name: string;
    img: string;
    type: string;
    level: number;
    style?: React.CSSProperties;
}

const Card: React.FC<Props> = (props: CardsPropsType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    // const handleAddToListClick = async () => {
    //     if (!window.ethereum) {
    //         console.error('Metamask is not available');
    //         return;
    //     }
    //
    //     const ethereum = window.ethereum as any;
    //
    //     try {
    //         // Запрос доступа к аккаунту Metamask
    //         const accounts = await ethereum.enable();
    //         const account = accounts[0];
    //
    //         // Отправка сообщения "I want add {pokemonName} to my list"
    //         const message = `I want add ${props.name} to my list`;
    //
    //         // Подписываем сообщение
    //         const signature = await ethereum.request({
    //             method: 'eth_sign',
    //             params: [account, message],
    //         });
    //
    //         console.log('account', account);
    //         console.log('accounts', accounts);
    //         console.log('message', message);
    //         console.log('signature', signature);
    //
    //         // Отправляем запрос на сервер для сохранения покемона в MongoDB
    //         const response = await fetch('http://localhost:3000/api/pokemon/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 account,
    //                 message,
    //                 signature,
    //                 pokemonName: props.name,
    //             }),
    //         });
    //
    //         if (response.ok) {
    //             console.log('Pokemon added to list');
    //         } else {
    //             console.error('Failed to add pokemon to list');
    //         }
    //     } catch (err: any) {
    //         debugger
    //         console.log(err)
    //         // Обработка ошибки, когда пользователь отклоняет запрос на доступ к аккаунту Metamask
    //         if (err.code === 4001) {
    //             console.log('User rejected the request');
    //             alert('Please allow access to your Metamask account to continue.');
    //         } else {
    //             console.error(err);
    //         }
    //     }
    // };
    const handleAddToListClick = async () => {
        if (!window.ethereum) {
            console.error('Metamask is not available');
            return;
        }

        const ethereum = window.ethereum as any;

        try {
            // Запрос доступа к аккаунту Metamask
            const accounts = await ethereum.enable();
            const account = accounts[0];
            const web3 = new Web3(window.ethereum);
            // Отправка сообщения "I want add {pokemonName} to my list"
            const message = `I want add ${props.name} to my list`;
            const hash = web3.utils.sha3("\x19Ethereum Signed Message:\n" + message.length + message);
            // Подписываем сообщение
            const signature = await ethereum.request({
                method: 'eth_sign',
                params: [account, hash],
                id: 1, // Добавляем параметр id со значением 1
            });


            // Отправляем запрос на сервер для сохранения покемона в MongoDB
            const response = await fetch('http://localhost:3000/api/pokemon/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account,
                    message,
                    signature,
                    pokemonName: props.name,
                }),
            });

            if (response.ok) {
                console.log('Pokemon added to list');
            } else {
                console.error('Failed to add pokemon to list');
            }
        } catch (err: any) {
            debugger
            console.log(err)
            // Обработка ошибки, когда пользователь отклоняет запрос на доступ к аккаунту Metamask
            if (err.code === 4001) {
                console.log('User rejected the request');
                alert('Please allow access to your Metamask account to continue.');
            } else {
                console.error(err);
            }
        }
    };
    return (
        <>
            <div style={props.style} className={'card'} onClick={handleCardClick}>
                <img src={props.img} alt={props.name} />
                <h1>{props.name}</h1>
                <p>Type: {props.type}</p>
                <p>Level: {props.level}</p>
            </div>

            {isModalOpen && (
                <div className={'modal-overlay'}>
                    <div className={'modal'}>
                        <button className={'modal-close'} onClick={() => setIsModalOpen(false)}>
                            X
                        </button>
                        <Button title={'Add to my list'} onClick={handleAddToListClick} />
                        <img src={props.img} alt={props.name} />
                        <h1>{props.name}</h1>
                        <p>Type: {props.type}</p>
                        <p>Level: {props.level}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;



