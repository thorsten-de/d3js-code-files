import { stratify, hierarchy } from "d3-hierarchy";

export const CsvToHierarchy = data => {
  const hierarchyGenerator = stratify()
    .id(d => d.child)
    .parentId(d => d.parent);

  const root = hierarchyGenerator(data);

  return [root, root.descendants(), root.leaves()]
}

export const JsonToHierarchy = data => {
  const root = hierarchy(data);

  return [root, root.descendants(), root.leaves()];
}
