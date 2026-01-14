using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Website
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            // Initialize session when it starts
            // This ensures session is available for all requests
        }

        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
            // Ensure session is available for every request
            if (HttpContext.Current.Session != null)
            {
                // Session is available
            }
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            // Log errors here if needed
            Exception exception = Server.GetLastError();

            // You can add logging here
            // e.g., Logger.Error(exception);
        }
    }
}