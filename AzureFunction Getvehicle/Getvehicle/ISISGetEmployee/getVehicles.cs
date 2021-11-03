using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace getVehicle
{
    
    public static class getVehicles
    {
        private class Vehicle
        {
            public string brand { get; set; }
            public string model { get; set; }
            public double mpg { get; set; }
           // public integer    Phone { get; set; }
            public Vehicle(string strBrand, string strModel, double dblMpg)
            {
                brand = strBrand;
                model = strModel;
                mpg = dblMpg;
            }
    }
        private class  Brand
        {
            public string Name { get; set; }
            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Zip { get; set; }
            public Brand(string strName, string strStreetAddress, string strCity, string strState, string strZip)
            {
                Name = strName;
                StreetAddress = strStreetAddress;
                City = strCity;
                State = strState;
                Zip = strZip;
         
            }
        }

        [FunctionName("getVehicles")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            string strBrand= req.Query["Brand"];
            string strModel = req.Query["Model"];
            log.LogInformation("HTTP trigger on getEmployee processed a request for: " + strBrand);

            Vehicle Toyota = new Vehicle("Toyota", "Corolla", "30");
            Vehicle Ford = new Vehicle("Ford", "Raptor" "17");
            Vehicle volkswagen = new Vehicle("Volkswagen", "XL1" "261");

            //Employee Archer = new Employee("Sterling", "Archer", "Duchess", "Field Agent", "Active", 23.75, 18.50, ISIS);
            //Employee Lana = new Employee("Lana", "Kane", "Truckasaurus", "Field Agent", "Active", 21.50, 23.50, ISIS);
            //Employee Pam = new Employee("Pam", "Poovey", "Snowball", "Human Resource Director", "Active", 49.00, 12, ISIS);
            //Employee Barry = new Employee("Barry", "Cyborg", "Duchess", "Field Agent", "Active", 23.75, 18.50, CIA);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            List<Vehicle> arrEmployees = new List<Vehicle>();
            arrEmployees.Add(Toyota);
            arrEmployees.Add(Ford);
            arrEmployees.Add(volkswagen);


            //List<Employee> lstISIS = new List<Employee>();
            //List<Employee> lstCIA = new List<Employee>();
            //foreach (Employee empCurrent in arrEmployees)
            //{
            //    if (empCurrent.Agency == CIA)
            //    {
            //        lstCIA.Add(empCurrent);
            //    }
            //    else
            //    {
            //        lstISIS.Add(empCurrent);
            //    }
            //}

            //List<Employee> lstFoundEmployees = new List<Employee>();
            //foreach (Employee empCurrent in arrEmployees)
            //{
            //    if (strCodeName == empCurrent.CodeName)
            //    {
            //        lstFoundEmployees.Add(empCurrent);
            //    }
            //}
            //if (lstFoundEmployees.Count > 0)
            //{
            //    return new OkObjectResult(lstFoundEmployees);
            //}
            //else
            //{
            //    return new OkObjectResult("Employee Not Found");
            //}


        }
    }
}
