using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ISISGetEmployee
{
    public static class getEmployee
    {

        private class Employee
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }

            public string CodeName { get; set; }

            public string Position { get; set; }

            public string Status { get; set; }
            public getEmployee(string strFirtName, string strLastName, string strCodeName, string strPosition, string strStatus)
            {
                FirstName = strFirtName;
                LastName = strLastName;
                CodeName = strCodeName;
                Position = strPosition;
                Status = strStatus;
            }

        }
    }

    
        [FunctionName("getEmployee")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            Employee Archer = new Employee("sterling", "Archer", "duchess", "field Agent", "active");
        Employee Lana = new Employee("Lana", "Kane", "Truckasauras", "field Agent", "active");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

           
            if (strCodeName == null)
            {
                return new OkObjectResult("Employee not found");
            } else
            {
               if(strCodeName == "Duchess")
            {
                return new OkObjectResult(Archer);
            } else
            {
                return new OkObjectResult("Employee Not Found")
            }
            }

           

            return new OkObjectResult(responseMessage);
        }
    }
}
