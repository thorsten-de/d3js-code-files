<script>
  export let tileWidth;
  export let tileHeight;
  export let year;

  const padding = 60;
  $: radius = (tileWidth - 2 * padding) / 2;
</script>

<g transform="translate({tileWidth / 2}, {tileHeight / 2})">
  <circle cx={0} cy={0} r={radius} />
  <text x={0} y={tileHeight / 2 - 5} text-anchor="middle">{year}</text>
</g>

<style lang="scss">
  circle {
    fill: none;
    stroke: $text;
  }
</style>
