import { loadCsvData } from "./load-data";
import { CsvToHierarchy } from "./hierarchy";

const flatData = loadCsvData();

const [root, descendants, leaves] = CsvToHierarchy(flatData)
console.log({ root, descendants, leaves })