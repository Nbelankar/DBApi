# Introduction 
This Node.js application sets up a simple Express server that provides an API for executing stored procedures on a Microsoft SQL Server database. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

key components and functionalities of this API:

Dependencies:

    express: A popular web application framework for Node.js that simplifies the process of building web applications.
        body-parser: Middleware for handling JSON and URL-encoded data in HTTP requests.

    mssql: A Microsoft SQL Server client for Node.js that allows interaction with SQL Server databases.
        dbConfig: A custom module (presumably) containing the configuration details for connecting to the SQL Server database.

Express Server Setup:

        The express() function is used to create an instance of the Express application, which represents our web server.
        The app.use(bodyParser.json()) middleware is employed to parse incoming JSON data in the request body.
        The server listens on the specified port (process.env.PORT or defaulting to 3001) and logs a message when it starts.
    
API Endpoint:

    There is a single API endpoint defined at POST /api/dbApi.
    It expects JSON data in the request body with properties procedureName and xmlData.
    procedureName represents the name of the stored procedure to be executed on the SQL Server.
    xmlData is a parameter expected by the stored procedure, and it is passed as a parameter in the SQL query.

SQL Server Connection:

    The API uses the mssql library to connect to the SQL Server database using the configuration provided in the dbConfig module.
    Upon successful connection, a new SQL request object is created.

Stored Procedure Execution:

    The API then adds a parameter (xmlData) to the SQL request, using the input method with the specified data type (sql.NVarChar).
    The stored procedure specified in the procedureName property is executed using request.execute(procedureName).
    The result of the stored procedure execution (in the form of a recordset) is sent as a JSON response if successful.
Error Handling:

    Any errors that occur during the execution of the stored procedure or database connection are caught in a try-catch block.
    In case of an error, a 500 Internal Server Error response is sent, along with an error message.
Database Connection Cleanup:

    The sql.close() method is called in the finally block to ensure that the database connection is closed, whether the operation was successful or resulted in an error.
Logging:

    The server logs messages to the console, indicating that it is running and on which port.
    
CORS (commented out):

    There is a commented-out middleware (cors) that could be used to handle Cross-Origin Resource Sharing if the API needs to be accessed from different domains.

In summary, this API provides a way to execute stored procedures on a Microsoft SQL Server database through a simple HTTP endpoint. The API expects input in the form of a JSON object containing the name of the stored procedure to execute (procedureName) and any required data (xmlData). The server communicates with the SQL Server using the mssql library and returns the result of the stored procedure execution as a JSON response. Error handling is implemented to manage potential issues during database interactions.


# Run & Check with Postman

To run the Node.js code you provided, which is an Express.js server with Microsoft SQL Server interaction, follow these steps:

1. Install Dependencies:
Open a terminal and navigate to your project directory. Run the following command to install the required Node.js dependencies:

bash
Copy code
npm install
2. Configure the Database:
Ensure that you have a valid dbConfig.js file containing the configuration details for connecting to your Microsoft SQL Server. Update the file with your database connection information.

3. Run the Server:
Execute the following command to start the Express.js server:

bash
Copy code
node your_app_file.js
Replace your_app_file.js with the actual filename of your main server file.

For example, if your main server file is named server.js, the command would be:

bash
Copy code
node server.js
4. Test the API:
Once the server is running, you can test your API using a tool like Postman or by sending HTTP requests using curl or a similar command-line tool.

Send a POST request to http://localhost:3001/api/dbApi with the required data to test your API.

Example using cURL:
bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"procedureName": "your_stored_procedure_name", "xmlData": "<your_xml_data>"}' http://localhost:3001/api/dbApi
Example using Postman:
Open Postman.
Set the request type to POST.
Enter the request URL: http://localhost:3001/api/dbApi.
Set the request body to raw and provide JSON data like:
json
Copy code
{
  "procedureName": "your_stored_procedure_name",
  "xmlData": "<your_xml_data>"
}
Click "Send" to make the request.
Important Notes:
Ensure that the port specified in your code (3001) is not in use by another application.
Adjust the your_stored_procedure_name and <your_xml_data> placeholders with the actual values you want to use in your API request.
These steps assume that your server file (your_app_file.js) contains the code you provided for the Express.js application. Adjustments might be needed based on your project structure and specific requirements. Always refer to your project documentation for any additional setup instructions.

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)