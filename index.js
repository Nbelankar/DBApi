const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const config = require("./dbConfig");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/dbApi", async (req, res) => {
  const { procedureName, xmlData } = req.body;

  try {
    await sql.connect(config);

    const request = new sql.Request();

    // Add parameters as needed
    request.input("sXml", sql.NVarChar, xmlData);

    const result = await request.execute(procedureName);

    res.json({ success: true, Result: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
