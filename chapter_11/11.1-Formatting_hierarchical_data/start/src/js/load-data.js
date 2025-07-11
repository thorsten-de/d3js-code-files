export const loadCsvData = () => {
  const csvData = require("../data/flat_data.csv");

  csvData.forEach(d => {
    d.total_speakers = +d.total_speakers;
    d.native_speakers = +d.native_speakers;
  });

  return csvData;
};