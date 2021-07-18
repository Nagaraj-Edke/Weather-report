import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city, unit): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=904f4892e202e4b9e33580d6b6f2cd52&units=${unit}`;
    return this.http.get(url);
    // http://api.weatherstack.com/current?access_key=a255da8c99ccccd331ce8ea55d6e75ab&query=${city}&units=m
  }

  getWeatherPredicationData(city, unit): Observable<any>{

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=904f4892e202e4b9e33580d6b6f2cd52&units=${unit}`;
    return this.http.get(url);

  }

  getCities(): object {

    const check = localStorage.getItem('cities');

    if (check == null || JSON.parse(check).length == 0) {
      localStorage.setItem('cities', '["Hyderabad","Bangalore"]');
    }
    const cities = JSON.parse(localStorage.getItem('cities'));
    // console.log(typeof cities);

    return cities;
  }

  removeCityName(city): void {
    // console.log(city);
    const data = JSON.parse(localStorage.getItem('cities'));
    const index = data.indexOf(city);

    if (index != -1) {
      const cityName = data.splice(index, 1);
      window.alert(cityName + ' is removed from weather list');
      localStorage.setItem('cities', JSON.stringify(data));

    }
  }

  addNewCityLocation(city): void {
    const data = JSON.parse(localStorage.getItem('cities'));

    const result = data.findIndex(item => city.toLowerCase() === item.toLowerCase());

    if (result == -1) {

      data.push(city);
      // console.log(data);
      window.alert(city + ' city is added to weather list');

      // set new array of city to localstorage
      localStorage.setItem('cities', JSON.stringify(data));
    }
    else{
      window.alert(city + ' city is already exist in list');
    }

  }

  setDefaultCityLocation(city): void {
    const data = JSON.parse(localStorage.getItem('cities'));

    // set cityname to defalut weather location
    data.forEach((item, index) => {
      if (item === city) {
        data.splice(index, 1);
        data.unshift(item);
      }
    });
    // console.log(data);

    // set new array of city to localstorage
    localStorage.setItem('cities', JSON.stringify(data));
    window.alert(city + ' city is setted as default location');


  }

  // measurement
  getMeasurement(){
    const check = localStorage.getItem('unit');
    if (check == null){
      localStorage.setItem('unit', '{"imperial":false,"metric":true}');
    }
    const unit = JSON.parse(localStorage.getItem('unit'));
    // console.log(typeof unit);
    
    return unit;
  }

  setMeasurement(unit): void{
    localStorage.setItem('unit', JSON.stringify(unit));
  }

  getLocation(lat, lon): Observable<any>{
    const  url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&appid=904f4892e202e4b9e33580d6b6f2cd52`;
    return this.http.get(url);
  }
}
