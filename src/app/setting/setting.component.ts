import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather/weather.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private weatherService:WeatherService) { }
  title ="settings"
  cities;
  items=["imperial","metric"];

  status1=false;
  status2 = true;
  radio="";
  target;
  
  ngOnInit(): void {
    this.cities = this.weatherService.getCities();
    
    let units = this.weatherService.getMeasurement();
    this.status1 = units.imperial;
    this.status2 = units.metric;

    document.getElementById('units').addEventListener('change', (e) => {
      this.target = e.target;

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
      let units = this.weatherService.getMeasurement();
      units.imperial = this.status1;
      units.metric = this.status2;
      
      this.weatherService.setMeasurement(units);
    });

    units = this.weatherService.getMeasurement();
    this.status1 = units.imperial;
    this.status2 = units.metric;
  }
 

  removeCity(city){
    this.weatherService.removeCityName(city);
  }

  addNewCity(city) {
    if (city == "" || city == null) {
      window.alert("Enter city name correct")
    }
    else {
      this.weatherService.addNewCityLocation(city);
    }
  }

  setDefault(city){
    this.weatherService.setDefaultCityLocation(city);
  }

}
