import ExcelJS from "exceljs";

export default async function DataListPrep(file, setExcelData) {
  const workbook = new ExcelJS.Workbook();
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      await workbook.xlsx.load(arrayBuffer); // Load the Excel file

      const worksheet = workbook.worksheets[0]; // Access the first worksheet
      const rows = [];

      worksheet.eachRow((row) => {
        const rowValues = row.values.slice(1); // Get the row values, skipping the first undefined value
        rows.push(rowValues); // Push the values to the array
      });

      setExcelData(rows); // Store the Excel data in state
      resolve(); // Resolve the promise
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  });
}
