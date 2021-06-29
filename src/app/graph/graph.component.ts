import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from "node_modules/chart.js";
import { Injectable } from '@angular/core';
import { WeatherService } from "../weather.service";
import { WebSocketsService } from "../web-sockets.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
@Injectable()
export class GraphComponent implements OnInit {
  allData:any[] = [];

  constructor(private weather: WeatherService, private webSocketsService:WebSocketsService) {
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.webSocketsService.listen("connect").subscribe((socket:any)=>{
      this.weather.getData("TEMP", 15).subscribe((response:any)=>{
        this.allData = response;
        var data = [];
        var chart:any;

        for(var i=0; i < this.allData.length; i++){
          data.push({x:this.allData[i].date, y:this.allData[i].data});
        }
        chart = new Chart("myChart", {
          type: 'line',
          data: {
            datasets: [{
              label: 'TEMP',
              data: data,
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1
            }]
          },
          options:{
            scales:{
              y:{
                min: 0,
                max: 30
              }
            }
          }
        });
      });
    });
  }
}
