const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");
const config = require("./dbConfig"); // Ensure dbConfig.js is properly configured

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Define the API endpoint
app.post("/api/dbApi", async (req, res) => {
  const { procedureName, xmlData } = req.body;

  try {
    // Connect to the database using the configuration
    await sql.connect(config);

    // Create a new request object for SQL Server
    const request = new sql.Request();

    // Add parameters for the stored procedure
    request.input("sXml", sql.NVarChar, xmlData);

    // Execute the stored procedure
    const result = await request.execute(procedureName);

    // Respond with the result from the stored procedure
    res.json({ success: true, Result: result.recordset });
  } catch (err) {
    // Log the error and respond with a 500 status code and error message
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    // Close the database connection
    try {
      await sql.close();
    } catch (closeError) {
      console.error("Error closing the database connection:", closeError);
    }
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
