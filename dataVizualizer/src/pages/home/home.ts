import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Shape from "d3-shape";
import d3tip from 'd3tip';
import { DataSourceProvider } from "../../providers/data-source/data-source";
import { DataGeneral, DataModel } from "../../data/data"
export interface ChartData {
  label: string,
  value: number
}
declare module D3 {
  export interface Base {
    tip: any;
  }
}
declare var d3_tip: D3.Base;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private city: any;
  private param: any;
  private barTypeRequest: any;
  private listFilteredLocation: DataModel[];
  //Variables Genre
  private listResultGenre: ChartData[];
  private listGenreMale: DataModel[];
  private listGenreFemale: DataModel[];
  //Variables Age  
  private listResultAgeGroup: ChartData[];
  private listAgeGroup1: DataModel[];
  private listAgeGroup2: DataModel[];
  private listAgeGroup3: DataModel[];
  private listAgeGroup4: DataModel[];
  //Variables MusicGenre
  private listResultMusicGenre: ChartData[];
  private listAllGenres: DataModel[];
  private listPop: DataModel[];
  private listRap: DataModel[];
  private listRock: DataModel[];
  private listCountry: DataModel[];
  private listLatin: DataModel[];
  private listRB: DataModel[];
  private listElectronic: DataModel[];
  private listAlternative: DataModel[];
  private listMetal: DataModel[];
  private listReggae: DataModel[];
  private listBlues: DataModel[];
  private listReligious: DataModel[];
  private listJazz: DataModel[];
  private listClassical: DataModel[];
  private listFolk: DataModel[];
  //Variables Profession
  private listResultProfession: ChartData[];
  private listMember: DataModel[];
  private listMusician: DataModel[];
  private listDesigner: DataModel[];
  private listPhotographer: DataModel[];
  private listArtist: DataModel[];
  private listProducer: DataModel[];
  private listBlogger: DataModel[];
  private listFilmmaker: DataModel[];
  private listWriter: DataModel[];
  private listComedian: DataModel[];
  private listActor: DataModel[];
  private listModel: DataModel[];
  private listPromoter: DataModel[];
  private listVenue: DataModel[];
  private listBrand: DataModel[];
  private listDeveloper: DataModel[];
  private listEntrepreneur: DataModel[];
  private listCurator: DataModel[];
  private listDancer: DataModel[];
  private listAthlete: DataModel[];
  private listActivist: DataModel[];
  private listEntertainer: DataModel[];

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    public dataSourceProvider: DataSourceProvider) {
  }

  ionViewDidLoad() {
  }

  onSelectCity(city) {
    if (city && city != "") {
      this.listFilteredLocation = [];
      //Genre
      this.listResultGenre = [];
      this.listGenreMale = [];
      this.listGenreFemale = [];
      this.barTypeRequest = "";
      //Age
      this.listAgeGroup1 = [];
      this.listAgeGroup2 = [];
      this.listAgeGroup3 = [];
      this.listAgeGroup4 = [];
      this.listResultAgeGroup = [];
      //MusicGenre
      this.listResultMusicGenre = [];
      this.listAllGenres = [];
      this.listPop = [];
      this.listRap = [];
      this.listRock = [];
      this.listCountry = [];
      this.listLatin = [];
      this.listRB = [];
      this.listElectronic = [];
      this.listAlternative = [];
      this.listMetal = [];
      this.listReggae = [];
      this.listBlues = [];
      this.listReligious = [];
      this.listJazz = [];
      this.listClassical = [];
      this.listFolk = [];
      //Profession
      this.listResultProfession = [];
      this.listMember = [];
      this.listMusician = [];
      this.listDesigner = [];
      this.listPhotographer = [];
      this.listArtist = [];
      this.listProducer = [];
      this.listBlogger = [];
      this.listFilmmaker = [];
      this.listWriter = [];
      this.listComedian = [];
      this.listActor = [];
      this.listModel = [];
      this.listPromoter = [];
      this.listVenue = [];
      this.listBrand = [];
      this.listDeveloper = [];
      this.listEntrepreneur = [];
      this.listCurator = [];
      this.listDancer = [];
      this.listAthlete = [];
      this.listActivist = [];
      this.listEntertainer = [];
      this.requestDataByCity(city);
      this.initializeGraphs();
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
  //Function to make new request
  onMouseover(d, i) {
    console.log(this.barTypeRequest);
    console.log(d);
    console.log(i);
    //this.requestDataByParam(this.city,);
  }
  requestDataByCity(city: string) {
    DataGeneral.forEach(element => {
      if (element.location == city) {
        this.listFilteredLocation.push(element);
      }
    });
    //We get data from the location filtered array
    this.listFilteredLocation.forEach(element => {
      //Get Data Genre
      if (element.genre == "male") {
        this.listGenreMale.push(element);
      }
      if (element.genre == "female") {
        this.listGenreFemale.push(element);

      }
      //Get Data AgeGroup
      if (element.age == "group1") {
        this.listAgeGroup1.push(element);
      }
      if (element.age == "group2") {
        this.listAgeGroup2.push(element);
      }
      if (element.age == "group3") {
        this.listAgeGroup3.push(element);
      }
      if (element.age == "group4") {
        this.listAgeGroup4.push(element);
      }
      //Get Data MusicGenre
      if (element.musicGenre == "All Genres") {
        this.listAllGenres.push(element);
      }
      if (element.musicGenre == "Pop") {
        this.listPop.push(element);
      }
      if (element.musicGenre == "Rap & Hip-Hop") {
        this.listRap.push(element);
      }
      if (element.musicGenre == "Rock") {
        this.listRock.push(element);
      }
      if (element.musicGenre == "Country") {
        this.listCountry.push(element);
      }
      if (element.musicGenre == "Latin") {
        this.listLatin.push(element);
      }
      if (element.musicGenre == "R&B") {
        this.listRB.push(element);
      }
      if (element.musicGenre == "Electronic") {
        this.listElectronic.push(element);
      }
      if (element.musicGenre == "Alternative/Indie Rock") {
        this.listAlternative.push(element);
      }
      if (element.musicGenre == "Metal") {
        this.listMetal.push(element);
      }
      if (element.musicGenre == "Reggae") {
        this.listReggae.push(element);
      }
      if (element.musicGenre == "Blues") {
        this.listBlues.push(element);
      }
      if (element.musicGenre == "Religious") {
        this.listReligious.push(element);
      }
      if (element.musicGenre == "Jazz") {
        this.listJazz.push(element);
      }
      if (element.musicGenre == "Classical") {
        this.listClassical.push(element);
      }
      if (element.musicGenre == "Folk") {
        this.listFolk.push(element);
      }
      //Get Data Profession
      if (element.profession == "Member") {
        this.listMember.push(element);
      }
      if (element.profession == "Musician") {
        this.listMusician.push(element);
      }
      if (element.profession == "Designer") {
        this.listDesigner.push(element);
      }
      if (element.profession == "Photographer") {
        this.listPhotographer.push(element);
      }
      if (element.profession == "Artist") {
        this.listArtist.push(element);
      }
      if (element.profession == "DJ") {
        this.listProducer.push(element);
      }
      if (element.profession == "Blogger") {
        this.listBlogger.push(element);
      }
      if (element.profession == "Filmmaker") {
        this.listFilmmaker.push(element);
      }
      if (element.profession == "Writer") {
        this.listWriter.push(element);
      }
      if (element.profession == "Comedian") {
        this.listComedian.push(element);
      }
      if (element.profession == "Actor") {
        this.listActor.push(element);
      }
      if (element.profession == "Model") {
        this.listModel.push(element);
      }
      if (element.profession == "Promoter") {
        this.listPromoter.push(element);
      }
      if (element.profession == "Venue") {
        this.listVenue.push(element);
      }
      if (element.profession == "Brand") {
        this.listBrand.push(element);
      }
      if (element.profession == "Developer") {
        this.listDeveloper.push(element);
      }
      if (element.profession == "Entrepreneur") {
        this.listEntrepreneur.push(element);
      }
      if (element.profession == "Curator") {
        this.listCurator.push(element);
      }
      if (element.profession == "Dancer") {
        this.listDancer.push(element);
      }
      if (element.profession == "Athlete") {
        this.listAthlete.push(element);
      }
      if (element.profession == "Activist") {
        this.listActivist.push(element);
      }
      if (element.profession == "Entertainer") {
        this.listEntertainer.push(element);
      }
    });
    //Set Result Genre
    this.listResultGenre.push({
      label: "male", value: this.listGenreMale.length / this.listFilteredLocation.length
    },
      { label: "female", value: this.listGenreFemale.length / this.listFilteredLocation.length });
    console.log(this.listResultGenre);

    //Set Result Age
    this.listResultAgeGroup.push(
      { label: "(18-26)", value: this.listAgeGroup1.length / this.listFilteredLocation.length },
      { label: "(27-35)", value: this.listAgeGroup2.length / this.listFilteredLocation.length },
      { label: "(36-42)", value: this.listAgeGroup3.length / this.listFilteredLocation.length },
      { label: "(43-50+)", value: this.listAgeGroup4.length / this.listFilteredLocation.length });
    console.log(this.listResultAgeGroup);

    //Set Result Music Genre
    this.listResultMusicGenre.push(
      { label: "AllGenres", value: this.listAllGenres.length / this.listFilteredLocation.length },
      { label: "Pop", value: this.listPop.length / this.listFilteredLocation.length },
      { label: "Rap&HipHop", value: this.listRap.length / this.listFilteredLocation.length },
      { label: "Rock", value: this.listRock.length / this.listFilteredLocation.length },
      { label: "Country", value: this.listCountry.length / this.listFilteredLocation.length },
      { label: "Latin", value: this.listLatin.length / this.listFilteredLocation.length },
      { label: "R&B", value: this.listRB.length / this.listFilteredLocation.length },
      { label: "Electronic", value: this.listElectronic.length / this.listFilteredLocation.length },
      { label: "Alternative", value: this.listAlternative.length / this.listFilteredLocation.length },
      { label: "Metal", value: this.listMetal.length / this.listFilteredLocation.length },
      { label: "Reggae", value: this.listReggae.length / this.listFilteredLocation.length },
      { label: "Blues", value: this.listBlues.length / this.listFilteredLocation.length },
      { label: "Religious", value: this.listReligious.length / this.listFilteredLocation.length },
      { label: "Jazz", value: this.listJazz.length / this.listFilteredLocation.length },
      { label: "Classical", value: this.listClassical.length / this.listFilteredLocation.length },
      { label: "Folk", value: this.listFolk.length / this.listFilteredLocation.length });
    console.log(this.listResultMusicGenre);
    //Set Profession
    this.listResultProfession.push(
      { label: "Musician", value: this.listMusician.length / this.listFilteredLocation.length },
      { label: "Designer", value: this.listDesigner.length / this.listFilteredLocation.length },
      { label: "Photographer", value: this.listPhotographer.length / this.listFilteredLocation.length },
      { label: "Artist", value: this.listArtist.length / this.listFilteredLocation.length },
      { label: "Producer", value: this.listProducer.length / this.listFilteredLocation.length },
      { label: "Blogger", value: this.listBlogger.length / this.listFilteredLocation.length },
      { label: "Filmmaker", value: this.listFilmmaker.length / this.listFilteredLocation.length },
      { label: "Writer", value: this.listWriter.length / this.listFilteredLocation.length },
      { label: "Comedian", value: this.listComedian.length / this.listFilteredLocation.length },
      { label: "Actor", value: this.listActor.length / this.listFilteredLocation.length },
      { label: "Model", value: this.listModel.length / this.listFilteredLocation.length },
      { label: "Promoter", value: this.listPromoter.length / this.listFilteredLocation.length },
      { label: "Venue", value: this.listVenue.length / this.listFilteredLocation.length },
      { label: "Brand", value: this.listBrand.length / this.listFilteredLocation.length },
      { label: "Developer", value: this.listDeveloper.length / this.listFilteredLocation.length },
      { label: "Entrepreneur", value: this.listEntrepreneur.length / this.listFilteredLocation.length },
      { label: "Curator", value: this.listCurator.length / this.listFilteredLocation.length },
      { label: "Dancer", value: this.listDancer.length / this.listFilteredLocation.length },
      { label: "Athlete", value: this.listAthlete.length / this.listFilteredLocation.length },
      { label: "Activist", value: this.listActivist.length / this.listFilteredLocation.length },
      { label: "Entertainer", value: this.listEntertainer.length / this.listFilteredLocation.length });
    console.log(this.listResultProfession);
  }

  requestDataByParam(city: string, parameter: string) {

  }

  //GRAPHS
  initializeGraphs() {
    d3.selectAll("svg").remove();

    this.initGenericPie("#barGenre", 900, 500, this.listResultGenre, 50, 20, 20, 30);
    this.initGeneric("bar", "#barProfession", 600, 860, 100, 5, 20, 30, this.listResultProfession, "MusicData", "horizontal", 5, 0.3, "axis--x--profession", "axis--y--profession");
    this.initGeneric("bar", "#barMusicGenre", 500, 200, 60, 20, 40, 40, this.listResultMusicGenre, "MusicData", "vertical", 10, 0.3, "axis--x--musicGenre", "axis--y--musicGenre");
    this.initGeneric("bar", "#barAgeGroup", 900, 500, 60, 20, 40, 40, this.listResultAgeGroup, "MusicData", "vertical", 10, 0.3, "axis--x--ageGroup", "axis--y--ageGroup");
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
    frecuency: number, padding: number, classCssX: string, classCssY: string) {
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
      y.domain([0, d3Array.max(data, (d) => d.value) + 0.01]);
    } else {
      y = d3Scale.scaleBand().rangeRound([0, height]).padding(padding);
      x = d3Scale.scaleLinear().rangeRound([0, width]);
      y.domain(data.map((d) => d.label));
      x.domain([d3Array.max(data, (d) => d.value) + 0.01, 0]);
    }

    //DRAW AXIS
    if (orientation == "vertical") {
      g.append("g")
        .attr("class", "axis " + classCssX)
        .attr("transform", "translate(0," + height + ")")
        .call(d3Axis.axisBottom(x));
      g.append("g")
        .attr("class", "axis " + classCssY)
        .call(d3Axis.axisLeft(y).ticks(frecuency, "%"))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(0)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "middle")
        .text(chartText);
    } else {
      g.append("g")
        .attr("class", "axis " + classCssY)
        .call(d3Axis.axisLeft(y));
      g.append("g")
        .attr("class", "axis " + classCssX)
        .attr("transform", "translate(0," + height + ")")
        .call(d3Axis.axisBottom(x).ticks(frecuency, "%"))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(chartText);
    }

    //DRAW BARS
    if (orientation == "vertical") {
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.label))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .on("mouseover", function () {
          d3.select(this)
            .style("fill", "aqua");
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("fill", "black");
        });
      //.on('mouseover', this.onMouseover);;
    } else {
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.value))
        .attr("y", (d) => y(d.label))
        .attr("width", (d) => width - x(d.value))
        .attr("height", y.bandwidth())
        .on("mouseover", function (d, i) {
          d3.select(this)
            .style("fill", "aqua");
          // Get current event info
          this.barTypeRequest = chartText;
          this.onMouseover;
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("fill", "black");
        });
    }

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
      .outerRadius(radius - marginTop)
      .innerRadius(0);
    labelArc = d3Shape.arc()
      .outerRadius(radius - marginRight - 40)
      .innerRadius(radius - marginLeft - 120);
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

    g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", arc)
      .style("fill", (d: any) => color(d.data.value))
      .on("mouseover", function () {
        d3.select(this)
          .style("fill", "aqua");
        // Get current event info
      })
      .on("mouseout", function () {
        d3.select(this)
          .style("fill", (d: any) => color(d.data.value));
      });
    g.append("text").attr("transform", (d: any) => "translate(" + labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.label + " " + d.data.value.toFixed(3) * 100 + "%");
  }
}
