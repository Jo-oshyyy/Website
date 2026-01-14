using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Website.Filters
{
    /// <summary>
    /// Custom authorization attribute to protect controller actions
    /// Ensures user is logged in by checking session
    /// </summary>
    public class AuthorizeAdminAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            // Check if session exists and has AdminID
            if (httpContext.Session != null && httpContext.Session["AdminID"] != null)
            {
                return true;
            }
            return false;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            // Redirect to login page if not authorized
            filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary
                {
                    { "controller", "Login" },
                    { "action", "Index" }
                }
            );
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            // Check if session is available
            if (filterContext.HttpContext.Session == null)
            {
                // Session is not available, redirect to login
                HandleUnauthorizedRequest(filterContext);
                return;
            }

            base.OnAuthorization(filterContext);
        }
    }
}