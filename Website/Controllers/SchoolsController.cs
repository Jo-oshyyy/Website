using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Website.Controllers
{
    public class SchoolsController : Controller
    {
        // GET: Schools
        public ActionResult Index()
        {
            return View("SchoolsView");
        }

        // ==================================================================
        // API ENDPOINTS FOR DATABASE INTEGRATION
        // ==================================================================

        /// <summary>
        /// Get all schools with student data
        /// </summary>
        [HttpGet]
        public JsonResult GetSchools(string barangay = null)
        {
            var data = GetSampleSchoolsData();

            if (!string.IsNullOrEmpty(barangay))
            {
                data = data.Where(s => s.Barangay == barangay).ToList();
            }

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Add a new school
        /// </summary>
        [HttpPost]
        public JsonResult AddSchool(string schoolId, string schoolName, string barangay)
        {
            try
            {
                // Validation
                if (string.IsNullOrWhiteSpace(schoolId) ||
                    string.IsNullOrWhiteSpace(schoolName) ||
                    string.IsNullOrWhiteSpace(barangay))
                {
                    return Json(new { success = false, message = "All fields are required" });
                }

                return Json(new
                {
                    success = true,
                    message = "School added successfully",
                    school = new { schoolId, schoolName, barangay }
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error adding school: " + ex.Message });
            }
        }

        /// <summary>
        /// Update school information
        /// </summary>
        [HttpPost]
        public JsonResult UpdateSchool(string originalSchoolId, string schoolId, string schoolName, string barangay)
        {
            try
            {
                // Validation
                if (string.IsNullOrWhiteSpace(schoolId) ||
                    string.IsNullOrWhiteSpace(schoolName) ||
                    string.IsNullOrWhiteSpace(barangay))
                {
                    return Json(new { success = false, message = "All fields are required" });
                }

                return Json(new
                {
                    success = true,
                    message = "School updated successfully",
                    school = new { schoolId, schoolName, barangay }
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error updating school: " + ex.Message });
            }
        }

        /// <summary>
        /// Delete a school
        /// </summary>
        [HttpPost]
        public JsonResult DeleteSchool(string schoolId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(schoolId))
                {
                    return Json(new { success = false, message = "School ID is required" });
                }

                return Json(new
                {
                    success = true,
                    message = "School deleted successfully"
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting school: " + ex.Message });
            }
        }

        /// <summary>
        /// Get school details by ID
        /// </summary>
        [HttpGet]
        public JsonResult GetSchoolDetails(string schoolId)
        {
            var schools = GetSampleSchoolsData();
            var school = schools.FirstOrDefault(s => s.SchoolId == schoolId);

            if (school == null)
            {
                return Json(new { success = false, message = "School not found" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                success = true,
                data = school
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get list of barangays
        /// </summary>
        [HttpGet]
        public JsonResult GetBarangays()
        {
            var barangays = new[] { "San Juan", "Santa Cruz", "Poblacion", "San Pedro", "Bagong Silang" };
            return Json(barangays, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Export schools data to CSV
        /// </summary>
        [HttpGet]
        public ActionResult ExportSchoolsCSV()
        {
            var csv = GenerateSchoolsCSV();
            return File(System.Text.Encoding.UTF8.GetBytes(csv),
                       "text/csv",
                       "schools_export.csv");
        }

        // ==================================================================
        // HELPER METHODS - SAMPLE DATA
        // ==================================================================

        private List<SchoolData> GetSampleSchoolsData()
        {
            return new List<SchoolData>
            {
                new SchoolData
                {
                    SchoolId = "SCH001",
                    SchoolName = "Riverside Elementary",
                    Barangay = "San Juan",
                    Students = new List<StudentData> {
                        new StudentData { Id = 1, Name = "Juan Dela Cruz", Age = 12, Gender = "M", IsActive = true },
                        new StudentData { Id = 2, Name = "Maria Santos", Age = 11, Gender = "F", IsActive = true },
                        new StudentData { Id = 3, Name = "Pedro Garcia", Age = 13, Gender = "M", IsActive = false }
                    }
                },
                new SchoolData
                {
                    SchoolId = "SCH002",
                    SchoolName = "Mountainview High School",
                    Barangay = "Santa Cruz",
                    Students = new List<StudentData> {
                        new StudentData { Id = 4, Name = "Ana Reyes", Age = 15, Gender = "F", IsActive = true },
                        new StudentData { Id = 5, Name = "Carlos Lopez", Age = 14, Gender = "M", IsActive = true },
                        new StudentData { Id = 6, Name = "Sofia Cruz", Age = 16, Gender = "F", IsActive = true }
                    }
                },
                new SchoolData
                {
                    SchoolId = "SCH003",
                    SchoolName = "Central Academy",
                    Barangay = "San Juan",
                    Students = new List<StudentData> {
                        new StudentData { Id = 7, Name = "Miguel Torres", Age = 12, Gender = "M", IsActive = false },
                        new StudentData { Id = 8, Name = "Isabella Ramos", Age = 13, Gender = "F", IsActive = true },
                        new StudentData { Id = 9, Name = "Diego Fernandez", Age = 11, Gender = "M", IsActive = true }
                    }
                },
                new SchoolData
                {
                    SchoolId = "SCH004",
                    SchoolName = "Bayside Learning Center",
                    Barangay = "Poblacion",
                    Students = new List<StudentData> {
                        new StudentData { Id = 10, Name = "Gabriela Mendoza", Age = 14, Gender = "F", IsActive = true },
                        new StudentData { Id = 11, Name = "Rafael Santiago", Age = 15, Gender = "M", IsActive = false },
                        new StudentData { Id = 12, Name = "Lucia Morales", Age = 13, Gender = "F", IsActive = true }
                    }
                }
            };
        }

        private string GenerateSchoolsCSV()
        {
            var csv = "School ID,School Name,Barangay,Total Students,Active Students\n";
            var schools = GetSampleSchoolsData();

            foreach (var school in schools)
            {
                var totalStudents = school.Students.Count;
                var activeStudents = school.Students.Count(s => s.IsActive); // Now this works!
                csv += $"{school.SchoolId},{school.SchoolName},{school.Barangay},{totalStudents},{activeStudents}\n";
            }

            return csv;
        }
    }

    // ==================================================================
    // DATA CLASSES (Helper classes for sample data)
    // ==================================================================

    public class SchoolData
    {
        public string SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string Barangay { get; set; }
        public List<StudentData> Students { get; set; }
    }

    public class StudentData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public bool IsActive { get; set; }
    }
}