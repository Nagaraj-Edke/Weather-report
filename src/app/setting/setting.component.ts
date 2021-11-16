import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {WeatherService} from '../weather/weather.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private weatherService: WeatherService,private router:Router,private route:ActivatedRoute) {
    this.getScreenSize();
  }
  
  loader: boolean = false;
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

    document.getElementById('units').addEventListener('change', (e) => {
      this.target = e.target;
      // console.log(e.target);
    


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
      // console.log(unit);

      this.weatherService.setMeasurement(unit);
    });

    units = this.weatherService.getMeasurement();
    this.status1 = units.imperial;
    this.status2 = units.metric;
  }


  removeCity(city): void{
    if(city){
      this.weatherService.removeCityName(city);
      this.loader = true;
    }
    else{
      alert("select an option")
    }
    this.reload();
  }

  addNewCity(city): void {
    if (city === '' || city === null) {
      window.alert('Enter city name correct');
    }
    else {
      city = city[0].toUpperCase() + city.slice(1);
      // console.log(city);

      this.weatherService.addNewCityLocation(city);
      this.loader = true;
    }
    this.reload();
  }

  
  setDefault(city): void{
    if(city){
      this.weatherService.setDefaultCityLocation(city);
      this.loader = true;
    }
    else{
      alert("select an option")
    }
    this.reload();
    
  }
  
  scrWidth:any;
  xs:boolean;normal:boolean;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrWidth = window.innerWidth;
        if(768>window.innerWidth){
          this.xs = true;
          this.normal = false;
        }
        else{
          this.normal = true;
          this.xs = false;
        }
        // console.log( this.scrWidth);
  }

  reload(){ 
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['setting']);
    });
    this.loader = false;
  }
  onChange(event?){
    // console.log(event);
    this.reload();
    
  }
}
