using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace YourProjectName.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View("LoginView");
        }

        // POST: Login - Just redirect to Dashboard without validation for now
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(string username, string password)
        {
            // For now, just redirect to Dashboard without any backend validation
            return RedirectToAction("Index", "Dashboard");
        }
    }
}