<script>
  import { radiansToDegrees } from "../utils/helpers";
  import { scaleLinear, scalePoint } from "d3-scale";
  import { months } from "../utils/months";
  import Paintings from "../chart_components/Paintings.svelte";
  import Drawings from "../chart_components/Drawings.svelte";
  import Letters from "../chart_components/Letters.svelte";

  export let tileWidth;
  export let tileHeight;
  export let year;
  export let paintings;
  export let paintingDefaultRadius;
  export let paintingAreaScale;
  export let maxDrawings;
  export let drawings;
  export let maxLetters;
  export let letters;

  const padding = 60;
  $: radius = (tileWidth - 2 * padding) / 2;

  const monthScale = scalePoint()
    .domain(months)
    .range([0, (11 / 12) * 2 * Math.PI]);

  const textRotation = (month) => {
    const angle = radiansToDegrees(monthScale(month));
    if (angle <= 90 || angle >= 270) return angle;
    else return angle - 180;
  };

  $: radialScale = scaleLinear()
    .domain([0, maxDrawings])
    .range([0, 2 * radius]);

  $: letterScale = scaleLinear().domain([0, maxLetters]).range([0, radius]);
</script>

<g transform="translate({tileWidth / 2}, {tileHeight / 2})">
  {#each months as month}
    {monthScale(month)}
    <line
      x1="0"
      y1="0"
      x2={radius * Math.sin(monthScale(month))}
      y2={radius * -Math.cos(monthScale(month))}
      stroke-linecap="round"
    />
    <g
      class="month-label"
      transform="translate(
        {(30 + radius) * Math.sin(monthScale(month))},
        {(30 + radius) * -Math.cos(monthScale(month))}
      )
        rotate({textRotation(month)})"
    >
      <text text-anchor="middle" dominant-baseline="middle">
        {month.slice(0, 3)}
      </text>
    </g>
  {/each}
  <Paintings {paintingAreaScale} {paintingDefaultRadius} {paintings} {monthScale} {radius} />
  <Drawings {drawings} {monthScale} {radialScale} />
  <Letters {letters} {monthScale} {letterScale} />
  <text x={0} y={tileHeight / 2 - 5} text-anchor="middle">{year}</text>
</g>

<style lang="scss">
  circle {
    fill: none;
    stroke: $text;
  }
  line {
    stroke: $text;
    stroke-opacity: 0.2;
  }
  .month-label {
    font-size: 1.4rem;
  }
</style>
