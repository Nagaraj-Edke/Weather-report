import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  allCities = new Subject<any>();

  constructor(private http: HttpClient) { 
    const check = localStorage.getItem('cities');

    if (check == null || JSON.parse(check).length == 0) {
      localStorage.setItem('cities', '["Hyderabad","Bangalore"]');
    }
    const cities = JSON.parse(localStorage.getItem('cities'));
    this.allCities.next(cities.slice())
  }

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
    const cities = JSON.parse(localStorage.getItem('cities'));
    return cities;
  }

  removeCityName(city): void {
    const data = JSON.parse(localStorage.getItem('cities'));
    const index = data.indexOf(city);

    if (index != -1) {
      const cityName = data.splice(index, 1);
      this.allCities.next(data)
      window.alert(cityName + ' is removed from weather list');
      localStorage.setItem('cities', JSON.stringify(data));
    }
  }

  addNewCityLocation(city): void {
    city = city.replaceAll('ā','a')
    const data = JSON.parse(localStorage.getItem('cities'));
    const result = data.findIndex(item => city.toLowerCase() === item.toLowerCase());
    
    if (result == -1) {
      data.push(city);
      window.alert(city + ' city is added to weather list');
      localStorage.setItem('cities', JSON.stringify(data));
    }
    else{
      window.alert(city + ' city is already exist in list');
    }
  }

  addMyLocation(city): void{
    city = city.replaceAll('ā','a')
    const data = JSON.parse(localStorage.getItem('cities'));
    const index = data.findIndex(item => city.toLowerCase() === item.toLowerCase());
    
    if(index != -1){
      data.splice(index,1);
    }
    data.unshift(city);
    localStorage.setItem('cities', JSON.stringify(data));
  }

  setDefaultCityLocation(city): void {
    const data = JSON.parse(localStorage.getItem('cities'));

    data.forEach((item, index) => {
      if (item === city) {
        data.splice(index, 1);
        data.unshift(item);
      }
    });
    localStorage.setItem('cities', JSON.stringify(data));
    window.alert(city + ' city is setted as default location');
  }

  getMeasurement(){
    const check = localStorage.getItem('unit');
    if (check == null){
      localStorage.setItem('unit', '{"imperial":false,"metric":true}');
    }
    const unit = JSON.parse(localStorage.getItem('unit'));
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
