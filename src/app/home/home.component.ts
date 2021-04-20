import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  title = "home";
  //array of cities
  cities;
  //measurement
  unit;
  cityStatus:boolean =false;
  errorMsg = "";
  pStatus:boolean = false;
  pErrorMsg = "";

  result: any;
  result1:any;

  //weather Deatails
  temperature = "";
  windSpeed = 1;
  pressure;
  weatherDescription = "";
  cityName = "";
  weatherIcon;

  predicts = [];
  
  //errStatus = false;

  ngOnInit(): void {
    this.cities = this.weatherService.getCities();
    
    let units = this.weatherService.getMeasurement();
    if(units.imperial){
      this.unit = "imperial";
    }
    else{
      this.unit = "metric";
    }
    
    this.getMyData();
  }

  getMyData(){
    let city;

    navigator.geolocation.getCurrentPosition((pos)=>{
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      this.weatherService.getLocation(lat,long).subscribe(res=>{
        this.result = res;
        city = this.result.list[0].name;
        this.getWeatherData(city);
        
      })
    })

  }

  getWeatherData(city) {

    this.weatherService.getWeatherData(city,this.unit).subscribe((data) => {
      this.result = data;

      this.cityStatus = true;

      this.cityName = this.result.name;
      this.windSpeed = this.result.wind.speed;
      this.temperature = this.result.main.temp;
      if(this.unit =='imperial'){
        this.temperature = this.temperature+" F";
      }
      else{
        this.temperature = this.temperature+" C";
      }
      this.pressure = this.result.main.pressure;
      this.weatherDescription = this.result.weather[0].description;
      //console.log(this.iconId);
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.result.weather[0].icon}@2x.png`;
    });

    this.getPredictData(city);

  }
  
  getPredictData(city) {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    this.weatherService.getWeatherPredicationData(city,this.unit).subscribe(res => {
      this.result1 = res;
      this.pStatus = true;
      //this.predicts = [];
      //predict next 5days;
      for (let i = 0; i < 5; i++) {
        let p1 = this.result1.list[1 + (8*i)];
       
        var d = new Date(p1.dt_txt);

        let day = weekday[d.getDay()];
        
        let pTemp = p1.main.temp;
        if(this.unit =='imperial'){
          pTemp = pTemp+" F";
        }
        else{
          pTemp = pTemp+" C";
        }

        let pWindSpeed = p1.wind.speed;
        let pPressure = p1.main.pressure;
        let pDes = p1.weather[0].description;
        let pIcon = `http://openweathermap.org/img/wn/${p1.weather[0].icon}@2x.png`;

        this.predicts[i] = {"day":day,"icon":pIcon,"description":pDes,"temperature":pTemp,"wind_speed":pWindSpeed,"pressure":pPressure};

      }
      
    },
    (err)=>{
      this.pStatus = false;
      this.pErrorMsg = err.error.message;
      
    });
  }

}
