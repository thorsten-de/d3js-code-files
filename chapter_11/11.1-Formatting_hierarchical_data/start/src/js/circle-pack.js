import { pack } from "d3-hierarchy";

export const drawCirclePack = root => {
  const descendants = root.descendants();
  const leaves = root.leaves();

  const width = 800;
  const height = 800;
  const margin = { top: 1, right: 1, bottom: 1, left: 1 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute sums over the tree from root. We set the leaf node size
  // proportional to total_speakers
  root.sum(d => d.total_speakers);

  const packLayoutGenerator = pack()
    .size([innerWidth, innerHeight])
    .padding(3)

  const layout = packLayoutGenerator(root);
  console.log(layout)
}