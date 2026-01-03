using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Website.Controllers
{
    public class MasterfileController : Controller
    {
        // GET: Logs
        public ActionResult Index()
        {
            return View("MasterfileView");
        }
    }
}