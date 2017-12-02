import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

export interface MusicData {
  musicGenre: string,
  percentage: number
}
export const StatsBarChart: MusicData[] = [
  { musicGenre: "AllGenres", percentage: 0.67 },
  { musicGenre: "Pop", percentage: 0.92 },
  { musicGenre: "Rap&HipHop", percentage: 0.82 },
  { musicGenre: "Rock", percentage: 0.53 },
  { musicGenre: "Country", percentage: 0.2 },
  { musicGenre: "Latin", percentage: 0.88 },
  { musicGenre: "R&B", percentage: 0.15 },
  { musicGenre: "Electronic", percentage: 0.94 },
  { musicGenre: "Alternative/IndieRock", percentage: 0.66 },
  { musicGenre: "Metal", percentage: 0.53 },
  { musicGenre: "Reggae", percentage: 0.5 },
  { musicGenre: "Blues", percentage: 0.3 },
  { musicGenre: "Religious", percentage: 0.10 },
  { musicGenre: "Jazz", percentage: 0.13 },
  { musicGenre: "Classical", percentage: 0.15 },
  { musicGenre: "Folk", percentage: 0.13 }
];
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Age Group Variables
  private title = 'D3.js with Ionic 2!';
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private svg: any;
  private g: any;

//MusicGenreVariables
private titleMusicGenre:"Music Genre";
private widthMusicGenre:number;
private heightMusicGenre: number;
private marginMusicGenre={top: 20, right: 20, bottom: 30, left: 40};
private xMusicGenre:any;
private yMusicGenre:any;
private svgMusicGenre:any;
private gMusicGenre:any;

//Cities Variables
//Genre Variables
//Profesion Variables

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertController: AlertController) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ionViewDidLoad() {
    //console.log("ionViewDidLoad Bar Chart");
    this.initializeGraphs();
  }

  onSelectCity(city) {
    if (city && city != "") {

    } else {

    }
  }
  alertCityNotSelected() {
    const alert = this.alertController.create({
      title: 'City not Selected',
      subTitle: 'Please select a city',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }
  //GRAPHS

  initializeGraphs() {
    this.initMusicGenre();
    this.initAgeGroup();
  }

  //INITIALIZE AGE GROUP
  initAgeGroup() {
    //INIT SVG
    this.svg = d3.select("#barChart")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 900 500');
    /*
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    */
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    //INIT AXIS
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(StatsBarChart.map((d) => d.musicGenre));
    this.y.domain([0, d3Array.max(StatsBarChart, (d) => d.percentage)]);

    //DRAW AXIS
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y).ticks(10, "%"))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("MusicData");

    //DRAW BARS
    this.g.selectAll(".bar")
      .data(StatsBarChart)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.musicGenre))
      .attr("y", (d) => this.y(d.percentage))
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.percentage));
  }

  //INITIALIZE MUSIC GENRE BAR GRAPH
  initMusicGenre() {

//     //INIT SVG
//     this.svgMusicGenre=d3.select("#musicGenre")
//     .append("svgMusicGenre")
//     .attr("width","100%")
//     .attr("heigth","100%")
//     .attr('viewBox','0 0 900 500');
//     this.gMusicGenre=this.svgMusicGenre.append("gMusicGenre")
//     .attr("transform","translate(" + this.marginMusicGenre.left + "," + this.marginMusicGenre.top + ")");
    
//     //INIT AXIS
//     this.yMusicGenre=d3Scale.scaleBand().rangeRound([0,this.heightMusicGenre]).padding(0.1);
//    this.xMusicGenre=d3Scale.scaleLinear().rangeRound([this.widthMusicGenre]); 
//   this.yMusicGenre.domain(StatsBarChart.map((d)=>d.musicGenre));
//   this.xMusicGenre.domain([0,d3Array.max(StatsBarChart,(d)=>d.percentage)]);

//    //DRAW AXIS
//    this.g.append("gMusicGenre")
//    .attr("class","axis axis--x")
//   .attr("transform","translate(0," + this.widthMusicGenre + ")")
// .call(d3Axis.axisLeft(this.xMusicGenre));
// this.g.append("gMusicGenre")
// .attr("class","axis axis--y")
// .attr(d3Axis.axisBottom()
//     //DRAW BARS
  }
  initGenre(){
     //INIT SVG
     this.svgMusicGenre = d3.select("#musicGenre")
     .append("svgMusicGenre")
     .attr("width", '100%')
     .attr("height", '100%')
     .attr('viewBox', '0 0 900 500');
   /*
   this.svg = d3.select("svg");
   this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
   this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
   */
   this.g = this.svgMusicGenre.append("gMusicGenre")
     .attr("transform", "translate(" + this.marginMusicGenre.left + "," + this.marginMusicGenre.top + ")");

   //INIT AXIS
   this.xMusicGenre = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
   this.yMusicGenre = d3Scale.scaleLinear().rangeRound([this.height, 0]);
   this.xMusicGenre.domain(StatsBarChart.map((d) => d.musicGenre));
   this.yMusicGenre.domain([0, d3Array.max(StatsBarChart, (d) => d.percentage)]);

   //DRAW AXIS
   this.g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + this.height + ")")
     .call(d3Axis.axisBottom(this.x));
   this.g.append("g")
     .attr("class", "axis axis--y")
     .call(d3Axis.axisLeft(this.y).ticks(10, "%"))
     .append("text")
     .attr("class", "axis-title")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
     .text("MusicData");

   //DRAW BARS
   this.g.selectAll(".bar")
     .data(StatsBarChart)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", (d) => this.x(d.musicGenre))
     .attr("y", (d) => this.y(d.percentage))
     .attr("width", this.x.bandwidth())
     .attr("height", (d) => this.height - this.y(d.percentage));
  }
  initProfession(){}

}
