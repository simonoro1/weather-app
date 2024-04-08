import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import Chart from 'chart.js/auto';
import { Data, Properties } from './data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, AfterContentInit {
  title = 'weather';
  id: string | null  = '';
  chart: any = [];
  data: any = null;
  
  labels: any = [];
  forecast: any = [];
  nigthForecast: any = [];
  ctx: any = '';
  
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}
  //coment
  ngOnInit(): void {
    this.getWeather();
  }

  ngAfterContentInit(): void {}
  
  getWeather(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id
    this.weatherService.getWeather(id).subscribe((data) => {
      this.data = data.properties.periods;
      this.getLabels();
      this.createChart();
    });
  }

  getLabels(): any {
    const dayLabels = [];
    const dayTemp = [];
    const nightTemp = [];
    for (let index = 0; index < this.data?.length; index++) {
      const prop = this.data[index];

      if (prop.isDaytime) {
        dayLabels.push(prop.name);
        dayTemp.push(prop.temperature);
      }
      else{

        nightTemp.push(prop.temperature);
      }
    }

    this.forecast = dayTemp;
    this.labels = dayLabels;
    this.nigthForecast = nightTemp;
    
    console.log(dayTemp, nightTemp)

    return;
  }

  createChart() {
    this.chart = new Chart('canvas', {
      data: {
        labels: this.labels,
        datasets: [
          {
            type: 'line',
            label: 'Day forecast',
            data: this.forecast,
            borderColor: ['rgb(231, 76, 60)'],
          },
          {
            type: 'line',
            label: 'Night Forecast',
            data: this.nigthForecast,
            borderColor: ['rgb(100, 149, 237)'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              text: 'Temperature (°F)',
              display: true,
            },
          },
        },
        plugins: {
          tooltip: {
            
          },
          title: {
            display: true,
            text: `${this.id} Forecast`,
          },
        },
      },
    });
  }
}
