import { loadCsvData, loadJsonData } from "./load-data";
import { CsvToHierarchy, JsonToHierarchy } from "./hierarchy";
import { drawCirclePack } from "./circle-pack";
import { drawTree } from "./tree";
import { createLegend } from "./legend";
import { drawTreemap } from "./treemap";

const flatData = loadCsvData();

const [root, descendants, leaves] = CsvToHierarchy(flatData)

const jsonData = loadJsonData();
const [rootJ, descendantsJ, leavesJ] = JsonToHierarchy(jsonData);


drawCirclePack(root);
drawTreemap(root);
drawTree(root);
createLegend();