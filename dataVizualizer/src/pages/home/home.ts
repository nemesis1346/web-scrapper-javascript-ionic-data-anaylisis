import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

export interface ChartData {
  label: string,
  value: number
}
export const Data: ChartData[] = [
  { label: "AllGenres", value: 0.67 },
  { label: "Pop", value: 0.92 },
  { label: "Rap&HipHop", value: 0.82 },
  { label: "Rock", value: 0.53 },
  { label: "Country", value: 0.2 },
  { label: "Latin", value: 0.88 },
  { label: "R&B", value: 0.15 },
  { label: "Electronic", value: 0.94 },
  { label: "Alternative", value: 0.66 },
  { label: "Metal", value: 0.53 },
  { label: "Reggae", value: 0.5 },
  { label: "Blues", value: 0.3 },
  { label: "Religious", value: 0.10 },
  { label: "Jazz", value: 0.13 },
  { label: "Classical", value: 0.15 },
  { label: "Folk", value: 0.13 }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertController: AlertController) {
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
  //  this.initMusicGenre();
   // this.initAgeGroup();
    this.initGeneric("#barChart",900,500,40,20,20,30,Data,"MusicData");
    this.initGeneric("#barChart2",900,500,40,20,20,30,Data,"MusicData");
  }

  //GENERIC
  initGeneric(htmlContainer: string,
    svgWidth: number,
    svgHeight: number,
    marginLeft: number,
    marginTop: number,
    marginRight:number,
    marginBottom:number,
    data: ChartData[],
    chartText: string) {

    var width = svgWidth -marginLeft-marginRight;
    var height=svgHeight-marginTop-marginBottom;
    //INIT SVG
     var svg = d3.select(htmlContainer)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
     var g = svg.append("g")
      .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

    //INIT AXIS
    var x = d3Scale.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3Scale.scaleLinear().rangeRound([height, 0]);
    x.domain(data.map((d) => d.label));
    y.domain([0, d3Array.max(data, (d) => d.value)]);

    //DRAW AXIS
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3Axis.axisBottom(x));
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(chartText);

    //DRAW BARS
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => +height - y(d.value));
  }

    //Vertical
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

}
