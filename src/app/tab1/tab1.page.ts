//criando a backend tabs1

import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls:['tab1.page.scss']
})

export class Tab1Page{
  @ViewChild('barChart', null) barChart: any;
  @ViewChild('horizontalBar', null) horizontalBarChart: any;
  @ViewChild('line2', null) line2Chart: any;

  bars: any;
  horizontalBar:any;
  line2: any;
  colorArray: any;
  data: any;
  isSaving = false;

  global:any;
  present: any;
  dismiss: any;
  constructor(
    public appService: AppService,
    public loadingController:LoadingController,

  ){}
  ionViewDidEnter(){
    this.getData();
  }
  //criando tela de carregamento
  async getData(){
    const loading = await this.loadingController.create({
      message: 'Carregando... PorFavor Aguarde',
      duration: 20000
    });
    await loading.present();


    this.appService.getData().subscribe((res)=>{
      this.global = res['Global'];
      this.createBarChart();
      this.createHorizontalBarChart();
      loading.dismiss();
    },
    (error) =>{

    });
  }
  createBarChart() {
    const newPerc = Math.floor((this.global.NewConfirmed / this.global.TotalConfirmed) * 100);
    const recoverdPerc = Math.floor((this.global.TotalRecovered / this.global.TotalConfirmed) * 100);
    const deathPerc = Math.floor((this.global.TotalDeaths / this.global.TotalConfirmed) * 100);
    const activePerc = 100 - (recoverdPerc + deathPerc);
    
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      height:400,
      data: {
        labels: ['Ativo(' + activePerc + '%)', 'Recuperados(' + recoverdPerc + '%)', 'DMortes (' + deathPerc + '%)', 'Novos(' + newPerc + '%)'],
        datasets: [{
          label: 'Valor percentual Total',
          data: [activePerc, recoverdPerc, deathPerc, newPerc],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createHorizontalBarChart() {
    this.horizontalBar = new Chart(this.horizontalBarChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['Casos', 'Recuperados', 'Mortes'],
        datasets: [{
          label: 'Total',
          data: [this.global.TotalConfirmed, this.global.TotalRecovered, this.global.TotalDeaths],
          backgroundColor: '#fca330', // array should have same number of elements as number of dataset
          borderColor: '#fca330',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Novos',
          data: [this.global.NewConfirmed, this.global.NewRecovered, this.global.NewDeaths],
          backgroundColor: '#fc2205', // array should have same number of elements as number of dataset
          borderColor: '#fc2205',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
    });
  }


}
