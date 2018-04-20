const height = 700;
const width = 900;

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

const tooltip = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0);

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(0,0)");

d3.json("../static/js/world-50m.v1.json").then((data) => {
  readyWorld(data);
}).catch((error) => console.error(error));
  
d3.json("../static/js/meteorite-strike-data.json").then((data) => {
  readyMeteorites(data);
}).catch((error) => console.error(error));

function readyMeteorites(data) {
  svg.append("g")
    .attr("class", "meteorites")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
      .attr("stroke", "blue")
      .style("opacity", 0.5)
      .attr("fill", "beige")
      .attr("d", path.pointRadius((d) => pointSize(d.properties.mass)))
      .style("z-index", 1 )
      .on("mouseover", (d) => {
        //d3.select(this).raise();
        tooltip.transition().duration(200).style("opacity", 0.9);      
        tooltip.html("Mass: " + d.properties.mass + "<br/>"
                   + "Name: " + d.properties.name + "<br/>"
                   + "Name type: " + d.properties.nametype + "<br/>"
                   + "Year: " + d.properties.year + "<br/>"
                   + "recclass: " + d.properties.recclass + "<br/>"  
                   + "reclat: " + d.properties.reclat + "<br/>"  
                   + "reclong: " + d.properties.reclong)  
        tooltip.style("left", (d3.event.pageX) + "px")     
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0))
}

function pointSize(mass) {
  let size = 3;
  if (mass > 300000){
    size = 35;
  } else if (mass > 100000 && mass <= 300000){
    size = 10;
  } else if (mass > 10000 && mass <= 100000){
    size = 7;
  } 
  return size;
}

function readyWorld(data) {
  svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(topojson.feature(data, data.objects.countries).features)
    .enter().append("path")
      .attr("fill", "purple")
      .attr("d", path)
      .style("z-index", 0)
}

// tooltip adapted from http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html