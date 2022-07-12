import React, { Component } from 'react';

import { Nav} from './src/index';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            cities: []
        }

        this.addCity = this.addCity.bind(this);
        this.addLocation = this.addLocation.bind(this);
    }

    addCity = (city) => {
        const cities = this.state.cities;

        cities.push(city);
        this.setState({ cities });
    }

    addLocation = (location, city) => {
        const index = this.state.cities.findIndex(item => {
        
            return item.id === city.id
        });
        const chosenCity = this.state.cities[index];

        chosenCity.locations.push(location);

        const cities = [
            ...this.state.cities.slice(0, index),
            chosenCity,
            ...this.state.cities.slice(index + 1)
        ];

        this.setState({
            cities
        });
    }

    render() {
        return (
            <>
              <Nav
                  screenProps={{
                    cities: this.state.cities,
                    addCity: this.addCity,
                    addLocation: this.addLocation
                  }}
              />
            </>
        )
    }
}