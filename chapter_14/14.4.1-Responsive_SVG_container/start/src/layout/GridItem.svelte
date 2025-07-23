<script>
  import { scalePoint } from "d3-scale";
  import { months } from "../utils/months";

  export let tileWidth;
  export let tileHeight;
  export let year;

  const padding = 60;
  $: radius = (tileWidth - 2 * padding) / 2;

  const monthScale = scalePoint()
    .domain(months)
    .range([0, (11 / 12) * 2 * Math.PI]);
</script>

<g transform="translate({tileWidth / 2}, {tileHeight / 2})">
  <circle cx={0} cy={0} r={radius} />
  {#each months as month}
    <line
      x1="0"
      y1="0"
      x2={radius * Math.sin(monthScale(month))}
      y2={radius * Math.cos(monthScale(month))}
      stroke-linecap="round"
    />
  {/each}
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
</style>
