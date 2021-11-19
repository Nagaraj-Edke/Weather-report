import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private weatherService: WeatherService, private router:Router,private modalService:NgbModal) { }
  title = 'Weather';
  // array of cities
  cities;
  // measurement
  unit;
  scale;
  cityStatus = false;
  errorMsg = '';
  pStatus = false;
  statusCode:any;

  result: any;

  // weather Deatails
  temperature = '';
  windSpeed = 1;
  pressure;
  weatherDescription = '';
  cityName = '';
  weatherIcon;

  predicts = [];
  // errStatus = false;
  id;

  ngOnInit(): void {
    // this.openPopup();
    // this.id = document.getElementById('mod12');
    // console.log(this.id);
    // this.id.click();
    
    this.cities = this.weatherService.getCities();
    const units = this.weatherService.getMeasurement();

    if (units.imperial){
      this.unit = 'imperial';
    }
    else {
      this.unit = 'metric';
    }
    this.getWeatherData(this.cities[0]);
  }

  getMyLocationWeather(): void{
    let city;

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      this.weatherService.getLocation(lat, long).subscribe(res => {
        this.result = res;
        city = this.result.list[0].name;
        // console.log(city);
        
        // this.weatherService.addNewCityLocation(city);
        // this.weatherService.setDefaultCityLocation(city);
        // this.getWeatherData(city);
        this.weatherService.addMyLocation(city);
        this.reload()
      });
    });

  }
  reload(){ 
    this.router.navigateByUrl('/setting', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  getWeatherData(city): void {

    this.weatherService.getWeatherData(city, this.unit)
    .subscribe(
      (data) => {

        this.result = data;

        this.cityStatus = true;

        this.cityName = this.result.name;
        this.windSpeed = this.result.wind.speed;
        this.temperature = this.result.main.temp;
        // if (this.unit === 'imperial') {
        //   this.scale = 'F';
        // }
        // else {
        //   this.scale = 'C';
        // }
        this.scale = this.unit === 'imperial'? 'F': 'C';
        this.pressure = this.result.main.pressure;
        this.weatherDescription = this.result.weather[0].description;
        // console.log(this.iconId);
        this.weatherIcon = `http://openweathermap.org/img/wn/${this.result.weather[0].icon}@2x.png`;
      },
      (err)=>{
        this.cityStatus = false;
        console.log(err);
        
        if(err.status ==0){
          this.statusCode = '';
          this.errorMsg = 'Internet Disconnected';
          this.id = document.getElementById('mod12');
          this.id.click();
        }
        else{
          this.statusCode = err.error.cod ? err.error.cod: '';    
          this.errorMsg = err.error.message? err.error.message: 'Interner Error';
        }

        
      }
    );

    this.getPredictData(city);

  }

  getPredictData(city): void {

    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    this.weatherService.getWeatherPredicationData(city, this.unit)
    .subscribe(
      res => {
        this.result = res;

        // predict next 5days;
        for (let i = 0; i < 5; i++) {
          const p1 = this.result.list[1 + (8 * i)];
          const d = new Date(p1.dt_txt);
          const day1 = weekday[d.getDay()];

          const pTemp = p1.main.temp;
          const pWindSpeed = p1.wind.speed;
          const pPressure = p1.main.pressure;
          const pDes = p1.weather[0].description;
          const pIcon = `http://openweathermap.org/img/wn/${p1.weather[0].icon}@2x.png`;

          this.predicts[i] = { icon: pIcon, day: day1, description: pDes, temperature: pTemp, wind_speed: pWindSpeed, pressure: pPressure };

        }
      },
      (err) => { }
    );
  }

  open(content){
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop',centered: true,windowClass:'dark-modal'});
  }

}
