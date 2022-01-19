import React from 'react';
import Display from './Display'

type LocateState = {
    lat: number,
    lon: number,
    weather: {
        description: string,
        temp: number,
        feelsLike: number,
        low: number,
        high: number,
        humidity: number
    }
}
type myProps = {

}

interface Position {
    coords: {
        latitude: number,
        longitude: number
    }
}

const key: string = 'eb6b6964864393c4d3a4e0ed1780ea85';
const baseURL: string = 'https://api.openweathermap.org/data/2.5/weather';

class Geolocate extends React.Component<myProps, LocateState> {
    constructor(props: myProps) {
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
            weather: {
                description: 'description',
                temp: 0,
                feelsLike: 0,
                low: 0,
                high: 0,
                humidity: 0
            }
        }
    }

    componentDidMount() {
        const errorPosition = () => console.log('Error getting location data.')

        const successPosition = (position: Position) => {
            console.log(position.coords)
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
        }

        const getCoords = () => {
            navigator.geolocation.getCurrentPosition(successPosition, errorPosition, { enableHighAccuracy: true, timeout: 10000 });
        }

        const getWeather = () => {
            fetch(`${baseURL}?lat=${this.state.lat}&lon=${this.state.lon}&appid=${key}&units=imperial`)
                .then(result => result.json())
                .then(result => {
                    //console.log(result);
                    //console.log(result.weather[0].description);
                    this.setState(prevState => ({
                        weather: {
                            ...prevState.weather,
                            description: result.weather[0].description,
                            temp: result.main.temp,
                            feelsLike: result.main.feels_like,
                            low: result.main.temp_min,
                            high: result.main.temp_max,
                            humidity: result.main.humidity
                        }
                    }))
                })
        }

        getCoords();
        setTimeout(getWeather, 200) // lol
    };

    render() {
        return (
            <div>
                <Display weather={this.state.weather} />
            </div>
        )
    }
}

export default Geolocate;