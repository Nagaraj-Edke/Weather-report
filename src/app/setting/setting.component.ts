import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather/weather.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  title = 'settings';
  cities;
  items = ['imperial', 'metric'];

  status1 = false;
  status2 = true;
  radio = '';
  target;

  ngOnInit(): void {
    this.cities = this.weatherService.getCities();

    let units = this.weatherService.getMeasurement();
    this.status1 = units.imperial;
    this.status2 = units.metric;
    const greet = 'hello';
    console.log(greet);

    document.getElementById('units').addEventListener('change', (e) => {
      this.target = e.target;
      console.log(e.target);


      switch (this.target.id) {
        case 'imperial':
          this.status1 = true;
          this.status2 = false;
          break;
        case 'metric':
          this.status1 = false;
          this.status2 = true;
          break;
      }
      const unit = this.weatherService.getMeasurement();
      unit.imperial = this.status1;
      unit.metric = this.status2;
      console.log(unit);


      this.weatherService.setMeasurement(unit);
    });

    units = this.weatherService.getMeasurement();
    this.status1 = units.imperial;
    this.status2 = units.metric;
  }


  removeCity(city): void{
    if(city){
      this.weatherService.removeCityName(city);
    }
    else{
      alert("select an option")
    }
    
  }

  addNewCity(city): void {
    if (city === '' || city === null) {
      window.alert('Enter city name correct');
    }
    else {
      city = city[0].toUpperCase() + city.slice(1);
      console.log(city);

      this.weatherService.addNewCityLocation(city);
    }
  }

  setDefault(city): void{
    if(city){
      this.weatherService.setDefaultCityLocation(city);
    }
    else{
      alert("select an option")
    }
    
  }



}
