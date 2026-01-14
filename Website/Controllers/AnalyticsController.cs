using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Website.Controllers
{
    public class AnalyticsController : Controller
    {
        // GET: Analytics
        public ActionResult Index()
        {
            return View("AnalyticsView");
        }

        // ==================================================================
        // API ENDPOINTS FOR DATABASE INTEGRATION
        // ==================================================================

        /// <summary>
        /// Get demographics data - Replace with actual database query
        /// </summary>
        [HttpGet]
        public JsonResult GetDemographicsData(string schoolName = null, string barangay = null)
        {
            // TODO: Replace with actual database query
            // Example:
            // var data = db.Schools
            //     .Include(s => s.Students)
            //     .Where(s => (schoolName == null || s.SchoolName == schoolName) &&
            //                 (barangay == null || s.Barangay == barangay))
            //     .Select(s => new {
            //         schoolId = s.SchoolId,
            //         schoolName = s.SchoolName,
            //         barangay = s.Barangay,
            //         students = s.Students.Select(st => new {
            //             id = st.StudentId,
            //             name = st.Name,
            //             age = st.Age,
            //             gender = st.Gender,
            //             isActive = st.IsActive,
            //             currentStreak = st.CurrentStreak,
            //             longestStreak = st.LongestStreak,
            //             initialAbility = st.InitialAbility,
            //             currentAbility = st.CurrentAbility,
            //             xp = st.XP
            //         }).ToList()
            //     }).ToList();

            // Sample data for now
            var data = GetSampleDemographicsData();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get login frequency data - Replace with actual database query
        /// </summary>
        [HttpGet]
        public JsonResult GetLoginFrequencyData()
        {
            // TODO: Replace with actual database query
            // Example:
            // var loginData = db.LoginLogs
            //     .GroupBy(l => new { 
            //         Week = SqlFunctions.DatePart("week", l.LoginDate),
            //         Year = SqlFunctions.DatePart("year", l.LoginDate)
            //     })
            //     .Select(g => new {
            //         week = "Week " + g.Key.Week,
            //         avgLogins = g.GroupBy(l => l.StudentId).Average(sg => sg.Count())
            //     })
            //     .OrderBy(x => x.week)
            //     .ToList();

            var data = GetSampleLoginFrequencyData();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get aggregated statistics - Replace with actual database query
        /// </summary>
        [HttpGet]
        public JsonResult GetStatistics()
        {
            // TODO: Replace with actual database queries
            // Example:
            // var stats = new {
            //     totalStudents = db.Students.Count(),
            //     activeStudents = db.Students.Count(s => s.IsActive),
            //     totalSchools = db.Schools.Count(),
            //     avgAge = db.Students.Average(s => s.Age),
            //     avgXP = db.Students.Average(s => s.XP)
            // };

            var stats = GetSampleStatistics();
            return Json(stats, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Export data to CSV - Can be enhanced for actual database export
        /// </summary>
        [HttpGet]
        public ActionResult ExportDemographicsCSV()
        {
            // TODO: Query database and generate CSV
            // var data = db.Schools.Include(s => s.Students).ToList();

            var csv = GenerateDemographicsCSV();
            return File(System.Text.Encoding.UTF8.GetBytes(csv),
                       "text/csv",
                       "demographics_export.csv");
        }

        // ==================================================================
        // HELPER METHODS - SAMPLE DATA (Remove when connecting to database)
        // ==================================================================

        private object GetSampleDemographicsData()
        {
            return new[]
            {
                new {
                    schoolId = 1,
                    schoolName = "Riverside Elementary",
                    barangay = "San Juan",
                    students = new[] {
                        new { id = 1, name = "Juan Dela Cruz", age = 12, gender = "M", isActive = true, currentStreak = 5, longestStreak = 12, initialAbility = 50, currentAbility = 75, xp = 1250 },
                        new { id = 2, name = "Maria Santos", age = 11, gender = "F", isActive = true, currentStreak = 8, longestStreak = 15, initialAbility = 45, currentAbility = 80, xp = 1580 }
                    }
                },
                new {
                    schoolId = 2,
                    schoolName = "Mountainview High School",
                    barangay = "Santa Cruz",
                    students = new[] {
                        new { id = 3, name = "Ana Reyes", age = 15, gender = "F", isActive = true, currentStreak = 12, longestStreak = 20, initialAbility = 60, currentAbility = 90, xp = 2100 },
                        new { id = 4, name = "Carlos Lopez", age = 14, gender = "M", isActive = true, currentStreak = 3, longestStreak = 10, initialAbility = 40, currentAbility = 70, xp = 1340 }
                    }
                }
            };
        }

        private object GetSampleLoginFrequencyData()
        {
            return new[]
            {
                new { week = "Week 1", avgLogins = 4.2 },
                new { week = "Week 2", avgLogins = 4.8 },
                new { week = "Week 3", avgLogins = 5.1 },
                new { week = "Week 4", avgLogins = 4.5 },
                new { week = "Week 5", avgLogins = 5.3 },
                new { week = "Week 6", avgLogins = 5.7 },
                new { week = "Week 7", avgLogins = 5.2 },
                new { week = "Week 8", avgLogins = 6.0 }
            };
        }

        private object GetSampleStatistics()
        {
            return new
            {
                totalStudents = 12,
                activeStudents = 9,
                inactiveStudents = 3,
                totalSchools = 4,
                avgAge = 13.2,
                avgXP = 1505,
                avgCurrentStreak = 6.1,
                avgLongestStreak = 13.8
            };
        }

        private string GenerateDemographicsCSV()
        {
            var csv = "School Name,Barangay,Student Name,Age,Gender,Active,Current Streak,Longest Streak,Initial Ability,Current Ability,XP\n";
            // Add sample rows
            csv += "Riverside Elementary,San Juan,Juan Dela Cruz,12,M,Yes,5,12,50,75,1250\n";
            csv += "Riverside Elementary,San Juan,Maria Santos,11,F,Yes,8,15,45,80,1580\n";
            return csv;
        }

        // ==================================================================
        // DATABASE MODELS (Define these based on your actual database schema)
        // ==================================================================

        /* 
        Example Entity Framework Models:
        
        public class School
        {
            public int SchoolId { get; set; }
            public string SchoolName { get; set; }
            public string Barangay { get; set; }
            public virtual ICollection<Student> Students { get; set; }
        }

        public class Student
        {
            public int StudentId { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string Gender { get; set; }
            public bool IsActive { get; set; }
            public int CurrentStreak { get; set; }
            public int LongestStreak { get; set; }
            public int InitialAbility { get; set; }
            public int CurrentAbility { get; set; }
            public int XP { get; set; }
            public int SchoolId { get; set; }
            public virtual School School { get; set; }
            public virtual ICollection<LoginLog> LoginLogs { get; set; }
        }

        public class LoginLog
        {
            public int LoginLogId { get; set; }
            public int StudentId { get; set; }
            public DateTime LoginDate { get; set; }
            public virtual Student Student { get; set; }
        }
        */
    }
}