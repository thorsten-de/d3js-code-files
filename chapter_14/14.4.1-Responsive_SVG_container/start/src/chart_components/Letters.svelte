<script>
  export let letters;
  export let monthScale;
  export let letterScale;
</script>

{#each letters as l}
  <line
    x1="0"
    y1="0"
    x2={letterScale(l.number_of_letters) * Math.sin(monthScale(l.month))}
    y2={letterScale(l.number_of_letters) * -Math.cos(monthScale(l.month))}
    stroke-linecap="round"
  />
{/each}

<style lang="scss">
  line {
    stroke: $secondary;
    stroke-width: 2px;
  }
</style>
