import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Shape from "d3-shape";
import d3scription from 'd3scription';

export interface ChartData {
  label: string,
  value: number
}
export const Profession: ChartData[] = [
  { label: "Musician", value: 0.40 },
  { label: "Designer", value: 0.20 },
  { label: "Photographer", value: 0.30 },
  { label: "Artist", value: 0.10 },
  { label: "Producer", value: 0.20 },
  { label: "Filmmaker", value: 0.20 },
  { label: "Producer", value: 0.20 },
  { label: "Writer", value: 0.20 },
  { label: "Comedian", value: 0.20 },
  { label: "Actor", value: 0.20 },
  { label: "Model", value: 0.20 },
  { label: "Promoter", value: 0.20 },
  { label: "Venue", value: 0.20 },
  { label: "Brand", value: 0.20 },
  { label: "Developer", value: 0.20 },
  { label: "Entrepreneur", value: 0.20 },
  { label: "Curator", value: 0.20 },
  { label: "Dancer", value: 0.20 },
  { label: "Athlete", value: 0.20 },
  { label: "Activits", value: 0.20 }];
export const AgeGroup: ChartData[] = [
  { label: "Age(18-26)", value: 0.90 },
  { label: "Age(27-35)", value: 0.30 },
  { label: "Age(36-42)", value: 0.40 },
  { label: "Age(43-50+)", value: 0.60 }];
export const Genre: ChartData[] = [
  { label: "Male", value: 0.80 },
  { label: "Female", value: 0.20 }];
export const MusicGenre: ChartData[] = [
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
    this.initGenericPie("#barGenre", 900, 500, Genre, 50, 20, 20, 30);
    this.initGeneric("bar", "#barProfession", 600, 800, 70, 20, 20, 30, Profession, "MusicData", "horizontal", 10, 0.3);
    this.initGeneric("bar", "#barMusicGenre", 900, 500, 40, 20, 40, 40, MusicGenre, "MusicData", "vertical", 10, 0.3);
    this.initGeneric("bar", "#barAgeGroup", 900, 500, 40, 20, 40, 40, AgeGroup, "MusicData", "vertical", 10, 0.3);
  }

  //GENERIC
  initGeneric(graph: string, htmlContainer: string,
    svgWidth: number,
    svgHeight: number,
    marginLeft: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    data: ChartData[],
    chartText: string, orientation: string,
    frecuency: number, padding: number) {
    //VARIABLES
    var width, height, g, svg, x, y;

    width = svgWidth - marginLeft - marginRight;
    height = svgHeight - marginTop - marginBottom;
    if (orientation == "vertical") {
      //INIT SVG
      svg = d3.select(htmlContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
      g = svg.append("g")
        .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
    } else {
      svg = d3.select(htmlContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight); //this is ok dont change it
      g = svg.append("g")
        .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
    }

    //INIT AXIS
    if (orientation == "vertical") {
      x = d3Scale.scaleBand().rangeRound([0, width]).padding(padding);
      y = d3Scale.scaleLinear().rangeRound([height, 0]);
      x.domain(data.map((d) => d.label));
      y.domain([0, 1]);
    } else {
      y = d3Scale.scaleBand().rangeRound([0, height]).padding(padding);
      x = d3Scale.scaleLinear().rangeRound([0, width]);
      y.domain(data.map((d) => d.label));
      x.domain([1, 0]);
    }
    //var tipFactory = d3scription((d : ChartData) => d.label);
    //var tip = tipFactory()
    //.element(g);
    //DRAW AXIS
    if (orientation == "vertical") {
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3Axis.axisBottom(x));
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3Axis.axisLeft(y).ticks(frecuency, "%"))
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(chartText);
    } else {
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3Axis.axisLeft(y));
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3Axis.axisBottom(x).ticks(frecuency, "%"))
        // .on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(0)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(chartText)
    }

    //DRAW BARS
    var dataSelection;
    if (orientation == "vertical") {
       g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.label))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .on('mouseover', this.onMouseover);;
    } else {
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.value))
        .attr("y", (d) => y(d.label))
        .attr("width", (d) => width - x(d.value))
        .attr("height", y.bandwidth())
        .on('mouseover', this.onMouseover);;
    }
    // dataSelection.enter()
    //   .append('circle')
    //   .classed('post', true)
    //   .on('mouseover', this.onMouseover);

    //Tips
    // var tip = d3.tip()
    // .attr('class', 'd3-tip')
    // .offset([-10, 0])
    // .html(function(d) {
    //   return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
    // })

  }
  //Function to make new request
  onMouseover(d, i) {
    console.log(d);
  }

  initGenericPie(htmlContainer: string,
    svgWidth: number,
    svgHeight: number, data: ChartData[],
    marginLeft: number,
    marginRight: number,
    marginTop: number,
    marginBottom: number) {
    //variables
    var radius, color, arc, labelArc, pie, svg, g, width, height;

    width = svgWidth - marginLeft - marginRight;
    height = svgHeight - marginTop - marginBottom;
    radius = Math.min(width, height) / 2;

    color = d3Scale.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    arc = d3Shape.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    labelArc = d3Shape.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
    pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);
    svg = d3.select(htmlContainer)
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
      .append("g")
      .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

    console.log(data);
    g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", arc)
      .style("fill", (d: any) => color(d.data.value));
    g.append("text").attr("transform", (d: any) => "translate(" + labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.value);
  }
}
