const config = {
  user: "Admin",
  password: "adm12345",
  server: "LAPTOP-HP32FKJT",
  database: "DEVDB",
  options: {
    trustServerCertificate: true,
    trustedConnection: false, // Use Windows Authentication
    enableArithAbort: true,
    InstanceName: "SQLEXPRESS",
  },
  port: 1433,
};

module.exports = config;
