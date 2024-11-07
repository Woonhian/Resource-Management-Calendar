import Papa from "papaparse";

export const parseCSV = async (filePath) => {
  const response = await fetch(filePath);
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true, // First row of csv is header
      skipEmptyLines: true, // Skip any empty lines
      complete: (results) => {
        // Filter out any empty or malformed rows
        const dataRows = results.data.filter((row) =>
          Object.values(row).some((val) => val !== "")
        );
        resolve(dataRows);
      },
    });
  });
};
