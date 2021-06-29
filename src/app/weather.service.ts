import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private time = 0;
  private humOrTemp = "";
  constructor(private _http: HttpClient ) { }

  getData(humOrTemp:string, time:number){
    this.humOrTemp = humOrTemp;
    this.time = time;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hours = now.getHours() - Math.floor(time/60);
    var minutes = now.getMinutes() - time % 60;
    var seconds = now.getSeconds();
    if (minutes < 0){
      --hours;
      minutes = 60 - Math.abs(minutes);
    }
    if (hours < 0){
      --day;
      hours = 24 - Math.abs(hours);
    }

    var dateToCheck = new Date(year, month, day, hours, minutes);
    var url = "http://localhost:300/getDataAfterDate/" + dateToCheck +  "/" + humOrTemp
    return this._http.get(url)

  }

  getLabels(time:number){
    this.time = time;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hours = now.getHours() - Math.floor(time/60);
    var minutes = now.getMinutes() - time % 60;
    var seconds = now.getSeconds();

    var labels = [];
    var addMins = Math.floor(time/6);
    var addSecs = time % 6;
    var amOrPm = ""
    var labelHour = hours;
    for(let i=0; i< 6; i++){
      if (hours < 0){
        --day;
        hours = 24 - Math.abs(hours);
      }

      if (minutes < 0){
        --hours;
        minutes = 60 - Math.abs(minutes);
      }

      if (hours >= 24){
        hours = 0;
      }

      if (hours > 12){
        labelHour = hours - 12;
        amOrPm = " pm";
      }
      else{
        amOrPm = " am";
      }

      if (seconds >= 60){
        seconds = 0;
        ++minutes;
      }

      if(minutes >= 60){
        minutes = 0;
        ++hours;
      }

      var label = labelHour + ":" + minutes + ":" + seconds + amOrPm
      labels.push(label)

      minutes += addMins;
      seconds += addSecs;
    }

    return labels;
  }
}
