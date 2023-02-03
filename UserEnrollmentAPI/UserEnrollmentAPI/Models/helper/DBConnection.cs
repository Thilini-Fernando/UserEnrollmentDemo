
using Microsoft.Data.SqlClient;
using System.Data;
 

namespace API.Models.helper
{
    public class DBConnection
    {
        public SqlConnection SQLConnection;
        protected SqlCommand SQLCommand;
        protected List<SqlParameter> SQLParameters;
        protected string StoredProcedure;

        public DBConnection()
        {
            SQLConnection = new SqlConnection();

            var builder = new ConfigurationBuilder().
                SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(path: "appsettings.json", optional: true, reloadOnChange: true);
            IConfiguration _configuration = builder.Build();
            SQLConnection.ConnectionString = _configuration.GetConnectionString(name: "DBConn");


            if (SQLConnection.State == ConnectionState.Closed)
            {
                SQLConnection.Open();
            }
            SQLCommand = new SqlCommand();
            SQLCommand.Connection = SQLConnection;
            SQLCommand.CommandType = CommandType.StoredProcedure;
            SQLParameters = new List<SqlParameter>();
        }
         
       

    }
}