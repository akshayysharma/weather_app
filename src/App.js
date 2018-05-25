import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "ed2f55394680374a55cdd5ffbb67b1e8";

class App extends React.Component{
  state = {
    temperature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }
  
  getWeather = async (e) => {
     e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    
    const data = await api_call.json();
    if(city && country)
    {
      console.log(data);
      this.setState({
      temperature : ((data.main.temp)-273.15),
      city : data.name,
      country : data.sys.country,
      humidity : data.main.humidity,
      description : data.weather[0].description,
      error : ""
      });
    } 
    else{
      this.setState({
        temperature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : "Enter details first."
        });
    }
  }
  


  render(){
    return (
      <div>
        <Titles/> {/* name of the component */}
        <Form getWeather={this.getWeather} /> {/* getWeather is function, this means class i.e. APP and getWeather again
        refer to function --> this is props in react */}
        <Weather
          temperature = {this.state.temperature}
          city = {this.state.city}
          country ={this.state.country}
          humidity = {this.state.humidity}
          description = {this.state.description}
          error= {this.state.error}
        />
      </div>
    );
  }
}

export default App;
