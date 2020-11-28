import '../sass/main.scss';

import { select, arc } from 'd3';

const svg = select('svg');

//Variable for the width and height
//Extracting the height value from the html svg
//+ is commonly used short hand for parseFloat()
//and you can leave out the parenthesis,
//which converts strings to a floating point number
const height = +svg.attr('height');
const width = window.innerWidth;

//Variable 
const eyeSpacingX = 100;
const eyeSpacingY = -75;
const eyeRadius = 35;
const eyeBrowWidth = 50;
const eyeBrowHeight = 15;
const eyeBrowOffset = 30;

const g = svg
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)
  .on('mouseover', () => {
    eyeBrowsGroup
      .transition().duration(750)
      .attr('transform', `translate(0, ${eyeBrowOffset - 30})`)
      .transition().duration(750)
      .attr('transform', `translate(0, ${eyeBrowOffset})`)
  })

//Creating a circle, first argument is the atribute, second argument is the value
//you can chain the attr because it returns the d3 selection it was called on,
//which is called method chaining
const circle = g
  .append('circle')
  .attr('r', height / 2)
  .attr('fill', 'yellow')
  .attr('stroke', 'black')


const eyeGroup = g
  .append('g')
  .attr('transform', `translate(0, ${eyeSpacingY})`)

//appending individual eyes into one group, called "eyeGroup"
//Adding a radius
//Postioning on the X axis
const leftEyeCircle = eyeGroup
  .append('circle')
  .attr('r', eyeRadius)
  .attr('cx', -eyeSpacingX)

const rightEyeCircle = eyeGroup
  .append('circle')
  .attr('r', eyeRadius)
  .attr('cx', eyeSpacingX)

const eyeBrowsGroup = eyeGroup
  .append('g')
  .attr('transform', `translate(0, ${eyeBrowOffset})`)

const leftEyeBrow = eyeBrowsGroup
  .append('rect')
  .attr('width', eyeBrowWidth)
  .attr('height', eyeBrowHeight)
  .attr('x', -eyeSpacingX - (eyeBrowWidth / 2))
  .attr('y', eyeSpacingY - eyeBrowOffset)

const eyes

const rightEyeBrow = eyeBrowsGroup
  .append('rect')
  .attr('width', eyeBrowWidth)
  .attr('height', eyeBrowHeight)
  .attr('x', eyeSpacingX - (eyeBrowWidth / 2))
  .attr('y', eyeSpacingY - eyeBrowOffset)

const mouth = g
  .append('path')
  .attr('d', arc()({
    innerRadius: 0,
    outerRadius: 170,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2
  }))

