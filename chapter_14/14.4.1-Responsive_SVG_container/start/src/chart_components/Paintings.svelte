<script>
  import { forceCollide, forceSimulation, forceX, forceY } from "d3-force";
  import { scaleOrdinal } from "d3-scale";
  import { subjects } from "../utils/subjects";

  export let paintingAreaScale;
  export let paintingDefaultRadius;
  export let paintings;
  export let monthScale;
  export let radius;

  const colorScale = scaleOrdinal()
    .domain(subjects.map((d) => d.subject))
    .range(subjects.map((d) => d.color));

  let simulation = forceSimulation(paintings);
  let nodes = [];

  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });

  $: {
    simulation
      .force(
        "x",
        forceX((d) => (d.month !== "" ? radius * Math.sin(monthScale(d.month)) : 0)).strength(0.5)
      )
      .force(
        "y",
        forceY((d) => (d.month !== "" ? radius * -Math.cos(monthScale(d.month)) : 0)).strength(0.5)
      )
      .force(
        "collide",
        forceCollide().radius((d) =>
          d.width_cm === null || d.height_cm === null
            ? paintingDefaultRadius + 1
            : paintingAreaScale(d.area_cm2) + 1
        )
      )
      .alpha(0.5)
      .alphaDecay(0.1);
  }
</script>

{#each nodes as node}
  <circle
    cx={node.x}
    cy={node.y}
    r={node.area_cm2 ? paintingAreaScale(node.area_cm2) : paintingDefaultRadius}
    fill={colorScale(node.subject)}
  />
{/each}
