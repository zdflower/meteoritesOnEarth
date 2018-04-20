# Map Data Across the Globe - Meteorites

## User stories
- [x] I can see where all Meteorites landed on a world map.
- [x] I can tell the relative size of the meteorite, just by looking at the way it's represented on the map.
- [x] I can mouse over the meteorite's data point for additional data.

Dataset: 
- Meteorites data https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json
- World map data https://d3js.org/world-50m.v1.json

## Notes
- Meteorites' data is in geojson format. World data needs the topojson library.

- I read world data and show the map on the screen.

- I show where the meteorites crashed on Earth.

- I wrote the tooltip based on [Adding tooltips to d3.js graph](http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html) 

### Things to get better

- Sometimes the map shows over the marks for the meteorites.

- Some points are behind others and you can't reach them to show more info by passing the mouse over.

- I have used two d3.json calls, one for each json file. Maybe there is another better way.

