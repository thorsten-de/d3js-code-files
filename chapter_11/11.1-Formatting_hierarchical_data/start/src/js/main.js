import { loadCsvData, loadJsonData } from "./load-data";
import { CsvToHierarchy, JsonToHierarchy } from "./hierarchy";

const flatData = loadCsvData();

const [root, descendants, leaves] = CsvToHierarchy(flatData)
console.log({ root, descendants, leaves })

const jsonData = loadJsonData();
const [rootJ, descendantsJ, leavesJ] = JsonToHierarchy(jsonData);
console.log({ rootJ, descendantsJ, leavesJ })