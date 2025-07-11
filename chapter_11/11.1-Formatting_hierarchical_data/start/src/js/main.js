import { loadCsvData, loadJsonData } from "./load-data";
import { CsvToHierarchy, JsonToHierarchy } from "./hierarchy";
import { drawCirclePack } from "./circle-pack";
import { drawTree } from "./tree";

const flatData = loadCsvData();

const [root, descendants, leaves] = CsvToHierarchy(flatData)

const jsonData = loadJsonData();
const [rootJ, descendantsJ, leavesJ] = JsonToHierarchy(jsonData);

drawCirclePack(root);
drawTree(root);