using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Website.Helpers
{
    public class DatabaseHelper
    {
        private static string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["LiteRiseConnection"].ConnectionString;
        }

        /// <summary>
        /// Execute a stored procedure and return a DataTable
        /// </summary>
        public static DataTable ExecuteStoredProcedure(string storedProcedureName, params SqlParameter[] parameters)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedureName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }

                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            conn.Open();
                            adapter.Fill(dt);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception (you can use logging framework)
                throw new Exception("Database error: " + ex.Message, ex);
            }

            return dt;
        }

        /// <summary>
        /// Execute a stored procedure without returning data
        /// </summary>
        public static int ExecuteNonQuery(string storedProcedureName, params SqlParameter[] parameters)
        {
            int rowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedureName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }

                        conn.Open();
                        rowsAffected = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Database error: " + ex.Message, ex);
            }

            return rowsAffected;
        }

        /// <summary>
        /// Execute a stored procedure and return a single value
        /// </summary>
        public static object ExecuteScalar(string storedProcedureName, params SqlParameter[] parameters)
        {
            object result = null;

            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedureName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }

                        conn.Open();
                        result = cmd.ExecuteScalar();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Database error: " + ex.Message, ex);
            }

            return result;
        }
    }
}