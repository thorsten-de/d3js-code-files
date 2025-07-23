<script>
  import { range, max } from "d3-array";
  import { scaleRadial } from "d3-scale";
  import paintings from "../data/paintings.json";
  import drawings from "../data/drawings.json";
  import { months } from "../utils/months";

  import GridItem from "./GridItem.svelte";

  let windowWidth;
  const padding = 30;
  const gridContainer = 1400;
  let svgWidth;
  $: switch (true) {
    case windowWidth >= gridContainer:
      svgWidth = (10 / 12) * (gridContainer - 2 * padding);
      break;
    case windowWidth >= 748:
      svgWidth = (10 / 12) * (windowWidth - 2 * padding);
      break;
    default:
      svgWidth = windowWidth - 2 * padding;
      break;
  }

  const years = range(1881, 1891);
  var yearlydrawings = years.map((year) => {
    return {
      year,
      months: months.map((month) => {
        return {
          month,
          drawings: drawings.filter((d) => d.year === year.toString() && d.month === month),
        };
      }),
    };
  });

  const maxDrawings = max(yearlydrawings, (d) => max(d.months, (i) => i.drawings.length));

  let numColumns;
  $: switch (true) {
    case windowWidth > 900:
      numColumns = 3;
      break;
    case windowWidth > 600:
      numColumns = 2;
      break;
    default:
      numColumns = 1;
      break;
  }

  $: numRows = Math.ceil(years.length / numColumns);
  $: tileWidth = svgWidth / numColumns;
  $: tileHeight = tileWidth + 40;
  $: svgHeight = numRows * tileHeight;

  // Prepare paintings
  paintings.forEach((painting) => {
    if (painting.width_cm && painting.height_cm) {
      painting["area_cm2"] = painting.width_cm * painting.height_cm;
    }
  });
  const maxPaintingArea = max(paintings, (p) => p.area_cm2);
  const maxPaintingRadius = 8;
  const paintingDefaultRadius = 3;
  const paintingAreaScale = scaleRadial()
    .domain([0, maxPaintingArea])
    .range([0, maxPaintingRadius]);
</script>

<svelte:window bind:innerWidth={windowWidth} />
{#if svgWidth && svgHeight}
  <svg width={svgWidth} height={svgHeight}>
    {#each years as year, i}
      <g
        transform="translate(
          {(i % numColumns) * tileWidth}, 
          {Math.floor(i / numColumns) * tileHeight})"
      >
        <rect x={0} y={0} width={tileWidth} height={tileHeight} />
        <GridItem
          {tileWidth}
          {tileHeight}
          {year}
          {paintingAreaScale}
          {paintingDefaultRadius}
          paintings={paintings.filter((p) => p.year === year)}
          {maxDrawings}
          drawings={yearlydrawings.find((d) => d.year === year).months}
        />
      </g>
    {/each}
  </svg>
{/if}

<style>
  svg {
    border: 1px solid magenta;
  }
  rect {
    fill: none;
    stroke: cyan;
  }
</style>
