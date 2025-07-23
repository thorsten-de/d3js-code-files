<script>
  export let paintingAreaScale;
  export let paintingDefaultRadius;
  export let paintings;
  export let monthScale;
  export let radius;
</script>

{#each paintings as painting}
  <circle
    cx={painting.month !== "" ? radius * Math.sin(monthScale(painting.month)) : 0}
    cy={painting.month !== "" ? radius * -Math.cos(monthScale(painting.month)) : 0}
    r={painting.area_cm2 ? paintingAreaScale(painting.area_cm2) : paintingDefaultRadius}
  />
{/each}
