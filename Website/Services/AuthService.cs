using System;
using System.Data;
using System.Data.SqlClient;
using Website.Helpers;
using Website.Models;

namespace Website.Services
{
    public class AuthService
    {
        /// <summary>
        /// Validate user login credentials
        /// </summary>
        public static LoginResult ValidateLogin(string username, string password)
        {
            try
            {
                // Create parameters for stored procedure
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@Username", SqlDbType.NVarChar, 50) { Value = username },
                    new SqlParameter("@Password", SqlDbType.NVarChar, 100) { Value = password }
                };

                // Execute stored procedure
                DataTable dt = DatabaseHelper.ExecuteStoredProcedure("sp_ValidateLogin", parameters);

                if (dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];

                    LoginResult result = new LoginResult
                    {
                        Status = row["Status"].ToString(),
                        Message = row["Message"].ToString()
                    };

                    // If login is successful, populate admin details
                    if (result.IsSuccess)
                    {
                        result.Admin = new Admin
                        {
                            AdminID = Convert.ToInt32(row["AdminID"]),
                            Username = row["Username"].ToString(),
                            Email = row["Email"].ToString()
                        };
                    }

                    return result;
                }

                return new LoginResult
                {
                    Status = "Error",
                    Message = "An unexpected error occurred"
                };
            }
            catch (Exception ex)
            {
                return new LoginResult
                {
                    Status = "Error",
                    Message = "System error: " + ex.Message
                };
            }
        }

        /// <summary>
        /// Create a new admin user
        /// </summary>
        public static LoginResult CreateAdmin(string username, string email, string password)
        {
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@Username", SqlDbType.NVarChar, 50) { Value = username },
                    new SqlParameter("@Email", SqlDbType.NVarChar, 100) { Value = email },
                    new SqlParameter("@Password", SqlDbType.NVarChar, 100) { Value = password }
                };

                DataTable dt = DatabaseHelper.ExecuteStoredProcedure("sp_CreateAdmin", parameters);

                if (dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];
                    return new LoginResult
                    {
                        Status = row["Status"].ToString(),
                        Message = row["Message"].ToString()
                    };
                }

                return new LoginResult
                {
                    Status = "Error",
                    Message = "Failed to create admin"
                };
            }
            catch (Exception ex)
            {
                return new LoginResult
                {
                    Status = "Error",
                    Message = "System error: " + ex.Message
                };
            }
        }

        /// <summary>
        /// Get admin details by ID
        /// </summary>
        public static Admin GetAdminById(int adminId)
        {
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@AdminID", SqlDbType.Int) { Value = adminId }
                };

                DataTable dt = DatabaseHelper.ExecuteStoredProcedure("sp_GetAdminById", parameters);

                if (dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];
                    return new Admin
                    {
                        AdminID = Convert.ToInt32(row["AdminID"]),
                        Username = row["Username"].ToString(),
                        Email = row["Email"].ToString(),
                        CreatedDate = Convert.ToDateTime(row["CreatedDate"]),
                        LastLoginDate = row["LastLoginDate"] != DBNull.Value
                            ? Convert.ToDateTime(row["LastLoginDate"])
                            : (DateTime?)null,
                        IsActive = Convert.ToBoolean(row["IsActive"])
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving admin: " + ex.Message, ex);
            }
        }
    }
}