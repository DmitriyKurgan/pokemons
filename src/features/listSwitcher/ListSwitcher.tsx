import React, {useState} from "react";
import {Button} from "../buttons/Button";

export const ListSwitcher = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleButtonClick = (index: number) => {
        setActiveIndex(index);
    };

    const style = {
        width: "50%",
        borderRadius: '20px',
        height: "80%",
        backgroundColor: activeIndex === 0 ? "#0B213F" : "#E0E0E0",
        color: activeIndex === 0 ? "white" : "black",
        border: "none",
        outline: "none",
        cursor: "pointer",
    }

    const style2 = {
        width: "50%",
        borderRadius: '20px',
        height: "80%",
        backgroundColor: activeIndex === 1 ? "#0B213F" : "#E0E0E0",
        color: activeIndex === 1 ? "white" : "black",
        border: "none",
        outline: "none",
        cursor: "pointer",
    }

    return (
        <div style={{width: "324px", height: "56px", border: '2px solid black'}}>
            <Button title={'Pokémon List'} style={style} onClickHandler={() => handleButtonClick(0)}/>
            <Button title={'My pokémons'} style={style2} onClickHandler={() => handleButtonClick(1)}/>
        </div>
    );
};

