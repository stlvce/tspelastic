import React from 'react';
import Neuron from "../../services/neuron";
import State from "../../services/state";

const MainPage = () => {
    return (
        <main>
            <h1>MainPage</h1>
            <Neuron/>
            <State/>
        </main>      
    )
}

export default MainPage;