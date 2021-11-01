using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace GetVehicleClass
{
    public static class Function1
    {
        [FunctionName("addVehicle")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("addVehicle called at " + System.DateTime.Now.ToLongDateString());

            string strMake = req.Query["strMake"];
            string strModel = req.Query["strModel"];
            int intYear = int.Parse(req.Query["intYear"]);
            string strArmoured = req.Query["blnArmoured"];
            bool blnArmoured = false;
            if(strArmoured == "true")
            {
                blnArmoured = true;
            }
            string strVin = req.Query["strVin"];
            log.LogInformation("New Vehicle Passed - Make: " + strMake + " | Model: " + strModel + " | year: " + intYear.ToString() + " | Armoured: " + blnArmoured.ToString());

            string strQuery = "INSERT INTO tblVehicles VALUES (@parMake, @parModel, @parYear, @parArmoured, @parVin";
            SqlConnection conSpy = new SqlConnection("MyConnectionString");
            SqlCommand comSpy = new SqlCommand(strQuery, conSpy);
            {
                SqlParameter parMake = new SqlParameter("parMake", System.Data.SqlDbType.VarChar);
                parMake.Value = strMake;
                comSpy.Parameters.Add(parMake);

                SqlParameter parModel = new SqlParameter("parModel", System.Data.SqlDbType.VarChar);
                parModel.Value = strModel;
                comSpy.Parameters.Add(parModel);

                SqlParameter parYear = new SqlParameter("parYear", System.Data.SqlDbType.Int);
                parYear.Value = intYear;
                comSpy.Parameters.Add(parYear);

                SqlParameter parArmoured = new SqlParameter("parArmoured", System.Data.SqlDbType.Bit);
                parArmoured.Value = blnArmoured;
                comSpy.Parameters.Add(parArmoured);

                SqlParameter parVin = new SqlParameter("parVin", System.Data.SqlDbType.Bit);
                parVin.Value = strVin;
                comSpy.Parameters.Add(parVin);

                comSpy.ExecuteNonQuery();


            }
            string strmessage = "success";

           // string responseMessage = string.IsNullOrEmpty(name)
             //   ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
               // : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(responseMessage);
        }
    }
}
