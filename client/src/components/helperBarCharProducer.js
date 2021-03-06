import * as d3 from 'd3';
import Axios from "axios";
import {baseUrl} from '../shared/baseUrl';


const draw = (url) =>{
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#totalPerProducer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
    
    // remove the prieviouse one
    svg.selectAll("*").remove();
    //Get data
    Axios.get(baseUrl + url)
    .then((response) => {
        let data = response.data;
        // sort data
        data.sort( (b,a) => a.value - b.value);

        // X axis
        var x = d3.scaleBand()
         .range([ 0, width ])
         .domain(data.map(function(d) { 
            return d.vaccine;
             }))
         .padding(0.2);
         svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x))
         .selectAll("text")
         .attr("transform", "translate(-10,0)rotate(-45)")
         .style("text-anchor", "end");
            
         //max plus 30%
         let max = parseInt(d3.max(data, d => d.value))  + (parseInt(d3.max(data, d => d.value)) * 0.3) ;
         // Add Y axis
         var y = d3.scaleLinear()
         .domain([0, max])
         .range([ height, 0]);
         svg.append("g")
         .call(d3.axisLeft(y));
 
         // Bars
         svg.selectAll("mybar")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", d => x( d.vaccine) )
         .attr("y", d => y(d.value) )
         .attr("width", x.bandwidth())
         .attr("height", d => height - y(d.value) )
         .attr("fill", "#437C90")
 
    })
    .catch((err) => {
      console.log(err);
    });

    


}
export default draw;