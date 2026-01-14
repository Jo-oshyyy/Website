using System.Web.Mvc;

namespace Website.Controllers
{
    /// <summary>
    /// Dashboard Controller - Inherits from BaseController for automatic session protection
    /// </summary>
    public class DashboardController : BaseController
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            // Use the base controller properties to get user info
            ViewBag.Username = CurrentUsername;
            ViewBag.Email = CurrentEmail;
            ViewBag.AdminId = CurrentAdminId;

            return View("DashboardView");
        }
    }
}