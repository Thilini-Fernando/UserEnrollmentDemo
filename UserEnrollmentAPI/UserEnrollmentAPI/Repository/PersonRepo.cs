using API.Models.helper; 
using System.Data; 
using Microsoft.Data.SqlClient;
using System.Xml;
using UserEnrollmentDemo.Models;
using static UserEnrollmentDemo.Models.helper.DBStatus;
using Dapper;
using Newtonsoft.Json;

namespace UserEnrollmentDemo.Repository
{
    public class PersonRepo : DBConnection
    {
        string connectionString;
        public PersonRepo()
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
            this.connectionString = SQLConnection.ConnectionString;
        }

        public async Task<IEnumerable<PersonModel>> SelectAllPersons()
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    var result = await connection.QueryAsync<PersonModel>("[dbo].[spPersonSelect]", commandType: CommandType.StoredProcedure);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public async Task<int> InsertPerson(PersonModel data, string userRole)
        {
            try
            {

                using (var connection = new SqlConnection(connectionString))
                {
                    var privilegeJson = JsonConvert.SerializeObject(data);
                    DynamicParameters para = new DynamicParameters(); 

                    para.Add("@JSONdata", data, DbType.String); 
                    para.Add("@UserRole", userRole, DbType.String);

                    var result = await connection.ExecuteAsync("[dbo].[spPersonInsert]", para, commandType: CommandType.StoredProcedure);
                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<int> UpdatePerson(PersonModel data, string userRole)
        {
            try
            {

                using (var connection = new SqlConnection(connectionString))
                {
                    var privilegeJson = JsonConvert.SerializeObject(data);
                    DynamicParameters para = new DynamicParameters();

                    para.Add("@JSONdata", data, DbType.String);
                    para.Add("@UserRole", userRole, DbType.String);

                    var result = await connection.ExecuteAsync("[dbo].[spPersonUpdate]", para, commandType: CommandType.StoredProcedure);
                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<int> DeletePerson(int personId, string userRole)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    DynamicParameters para = new DynamicParameters();

                    para.Add("@PersonId", personId, DbType.Int32);
                    para.Add("@UserRole", personId, DbType.String);
                    var result = await connection.ExecuteAsync("[dbo].[spPersonDelete]", para, commandType: CommandType.StoredProcedure);
                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


    }
}

