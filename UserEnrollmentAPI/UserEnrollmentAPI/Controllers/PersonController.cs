 
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserEnrollmentDemo.Models;
using UserEnrollmentDemo.Repository;

namespace UserEnrollmentDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonRepo EmpRepo;

        public PersonController(PersonRepo EmployeeRepo)
        {
            EmpRepo = EmployeeRepo;
        }

        [HttpGet("selectPerson")]
        public async Task<IActionResult> SelectAllEmployees()
        {
            try
            {
                var response = await EmpRepo.SelectAllPersons();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
             
        }

        [HttpPost("insertPerson")]
        public async Task<IActionResult> InsertPerson(PersonModel data, string userRole)
        {

            try
            {
                var response = await EmpRepo.InsertPerson(data, userRole);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            } 

        }

        [HttpPost("updatePerson")]
        public async Task<IActionResult> UpdatePerson(PersonModel data, string userRole)
        {

            try
            {
                var response = await EmpRepo.UpdatePerson(data, userRole);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }


        [HttpGet("deletePerson")]
        public async Task<IActionResult> DeletePerson(int personId, string userRole)
        {

            try
            {
                var response = await EmpRepo.DeletePerson(personId, userRole);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }
    }
}
