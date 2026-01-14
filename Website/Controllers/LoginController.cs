using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Website.Models;
using Website.Services;

namespace Website.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            // If user is already logged in, redirect to dashboard
            if (Session["AdminID"] != null)
            {
                return RedirectToAction("Index", "Dashboard");
            }

            return View("LoginView");
        }

        // POST: Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(string username, string password, bool remember = false)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
                {
                    ViewBag.ErrorMessage = "Username and password are required";
                    return View("LoginView");
                }

                // Validate credentials using stored procedure
                LoginResult result = AuthService.ValidateLogin(username, password);

                if (result.IsSuccess)
                {
                    // Store user information in session
                    Session["AdminID"] = result.Admin.AdminID;
                    Session["Username"] = result.Admin.Username;
                    Session["Email"] = result.Admin.Email;
                    Session.Timeout = 30; // 30 minutes timeout

                    // Create authentication cookie if "Remember Me" is checked
                    if (remember)
                    {
                        FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                            1,
                            result.Admin.Username,
                            DateTime.Now,
                            DateTime.Now.AddDays(7), // Cookie expires in 7 days
                            true,
                            result.Admin.AdminID.ToString(),
                            FormsAuthentication.FormsCookiePath
                        );

                        string encryptedTicket = FormsAuthentication.Encrypt(ticket);
                        HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket)
                        {
                            HttpOnly = true,
                            Secure = Request.IsSecureConnection,
                            Expires = ticket.Expiration
                        };
                        Response.Cookies.Add(authCookie);
                    }

                    // Redirect to dashboard
                    return RedirectToAction("Index", "Dashboard");
                }
                else if (result.IsLocked)
                {
                    ViewBag.ErrorMessage = result.Message;
                    return View("LoginView");
                }
                else if (result.IsInactive)
                {
                    ViewBag.ErrorMessage = result.Message;
                    return View("LoginView");
                }
                else
                {
                    ViewBag.ErrorMessage = result.Message;
                    return View("LoginView");
                }
            }
            catch (Exception ex)
            {
                // Log the error (you should implement proper logging)
                ViewBag.ErrorMessage = "An error occurred during login. Please try again.";
                return View("LoginView");
            }
        }

        // GET: Logout
        public ActionResult Logout()
        {
            // Clear session
            Session.Clear();
            Session.Abandon();

            // Clear authentication cookie
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                authCookie.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(authCookie);
            }

            // Sign out
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Login");
        }
    }
}