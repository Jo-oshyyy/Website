using System.Web.Mvc;
using System.Web.Routing;

namespace Website.Controllers
{
    /// <summary>
    /// Base controller that all protected controllers should inherit from
    /// Automatically checks session on every request
    /// </summary>
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Check if session exists and user is logged in
            if (Session["AdminID"] == null)
            {
                // User is not logged in, redirect to login
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        { "controller", "Login" },
                        { "action", "Index" }
                    }
                );
                return;
            }

            base.OnActionExecuting(filterContext);
        }

        /// <summary>
        /// Get current logged in Admin ID from session
        /// </summary>
        protected int? CurrentAdminId
        {
            get
            {
                if (Session["AdminID"] != null)
                {
                    return (int)Session["AdminID"];
                }
                return null;
            }
        }

        /// <summary>
        /// Get current logged in username from session
        /// </summary>
        protected string CurrentUsername
        {
            get
            {
                return Session["Username"]?.ToString();
            }
        }

        /// <summary>
        /// Get current logged in user's email from session
        /// </summary>
        protected string CurrentEmail
        {
            get
            {
                return Session["Email"]?.ToString();
            }
        }

        /// <summary>
        /// Check if user is logged in
        /// </summary>
        protected bool IsLoggedIn
        {
            get
            {
                return Session["AdminID"] != null;
            }
        }
    }
}