import '../sass/main.scss';

import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';

const svg = select("svg")

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const Xvalue = d => d.population;
  const Yvalue = d => d.country;
  const margin = { top: 20, right: 20, bottom: 20, left: 100 }
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

  g.append('g').call(axisLeft(yScale))
  g.append('g').call(axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`)
  console.log(innerHeight)

  g.selectAll("rect").data(data)
    .enter().append('rect')
    .attr('y', d => yScale(Yvalue(d)))
    .attr('width', d => xScale(Xvalue(d)))
    .attr('height', yScale.bandwidth())
}

csv("data.csv").then(data => {
  data.forEach(d => {
    d.population = +d.population * 1000;
  })
  render(data)
})