using System.Web.Mvc;

namespace Website
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            // You can add global filters here if needed
            // For example: filters.Add(new AuthorizeAdminAttribute());
        }
    }
}