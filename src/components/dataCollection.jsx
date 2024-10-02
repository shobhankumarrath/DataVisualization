import React, { useState } from "react";
import ExcelJS from "exceljs";
import DataChart from "./dataChart";
import Styles from "./dataCollection.module.css";

export default function ExcelUploader() {
  const [excelData, setExcelData] = useState([]);
  const [sheetTitle, setSheetTitle] = useState(""); // State for storing the sheet title
  const [isFileUploaded, setIsFileUploaded] = useState(false); // State to control visibility of upload section

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      await workbook.xlsx.load(arrayBuffer); // Load the Excel file

      const worksheet = workbook.worksheets[0]; // Access the first worksheet
      setSheetTitle(worksheet.name); // Set the title of the sheet

      const rows = [];
      worksheet.eachRow((row) => {
        const rowValues = row.values.slice(1); // Get the row values, skipping the first undefined value
        rows.push(rowValues); // Push the values to the array
      });

      setExcelData(rows); // Store the Excel data in state
      setIsFileUploaded(true); // Set the upload state to true
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  };

  return (
    <div>
      {/* Conditional rendering based on the upload state */}
      {!isFileUploaded && (
        <div className={Styles.middleData}>
          <div className={Styles.uploadExcelFile}>
            <p className={Styles.dataHighlight}>Upload Excel File</p>
          </div>
          <div className={Styles.inputDiv}>
            <input
              className={Styles.input}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}

      {/* Only show the chart if data has been uploaded */}
      {isFileUploaded && excelData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <DataChart excelData={excelData} title={sheetTitle} />
        </div>
      )}
    </div>
  );
}
