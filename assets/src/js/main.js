import '../sass/main.scss';

import {
  select,
  json,
  scaleLinear,
  max,
  scalePoint,
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
    .nice()


  const yScale = scalePoint()
    .domain(data.map(Yvalue))
    .range([0, innerHeight])
    .padding(0.7)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const aAxisTickFormat = number =>
    format(".3s")(number)
      .replace('G', 'B')

  const xAxis = axisBottom(xScale)
    .tickFormat(aAxisTickFormat)
    .tickSize(-innerHeight)

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)

  g.append('g')
    .call(yAxis)
    .selectAll('.domain')
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

  g.selectAll("circle").data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(Yvalue(d)))
    .attr('cx', d => xScale(Xvalue(d)))
    .attr('r', 17);

  g.append('text')
    .attr("class", "title")
    .attr('y', -10)
    .text('Top 10 Most Popular Countries')
}

csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(data => {
    data.forEach(d => {
      console.log(d)
    })
    render(data)
  })
