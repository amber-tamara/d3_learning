import '../sass/main.scss';

import {
  select,
  json,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
  csv
} from 'd3';

const svg = select("svg")

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const Xvalue = d => d.population;
  const Yvalue = d => d.country;
  const margin = { top: 60, right: 20, bottom: 77, left: 180 }
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, Xvalue)])
    .range([0, innerWidth])


  const yScale = scaleBand()
    .domain(data.map(Yvalue))
    .range([0, innerHeight])
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const aAxisTickFormat = number =>
    format(".3s")(number)
      .replace('G', 'B')

  const xAxis = axisBottom(xScale)
    .tickFormat(aAxisTickFormat)
    .tickSize(-innerHeight)

  g.append('g')
    .call(axisLeft(yScale))
    .selectAll('.domain, .tick line')
    .remove();

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)


  xAxisG.select('.domain').remove();

  xAxisG.append('text')
    .attr('class', "axis-label")
    .attr('y', 65)
    .attr('x', innerWidth / 2)
    .attr("fill", "black")
    .text('Population')

  g.selectAll("rect").data(data)
    .enter().append('rect')
    .attr('y', d => yScale(Yvalue(d)))
    .attr('width', d => xScale(Xvalue(d)))
    .attr('height', yScale.bandwidth())

  g.append('text')
    .attr("class", "title")
    .attr('y', -10)
    .text('Top 10 Most Popular Countries')
}

csv("data.csv").then(data => {
  data.forEach(d => {
    d.population = +d.population * 1000
  })
  console.log(data)
  render(data)
})