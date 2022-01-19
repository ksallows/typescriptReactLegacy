import { useEffect, useState } from 'react';

type myProps = {
    weather: {
        description: string,
        temp: number,
        feelsLike: number,
        low: number,
        high: number,
        humidity: number
    }
}

function Display(props: myProps) {

    useEffect(() => {
        //
    }, [])

    return (
        <div>
            <p>Description: {props.weather.description}</p>
            <p>Temp: {props.weather.temp}&deg;</p>
            <p>Feels Like: {props.weather.feelsLike}</p>
            <p>Low: {props.weather.low}</p>
            <p>High: {props.weather.high}</p>
            <p>Humidity: {props.weather.humidity}%</p>
        </div>
    );
}

export default Display;