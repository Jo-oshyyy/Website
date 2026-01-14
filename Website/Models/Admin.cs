using System;

namespace Website.Models
{
    public class Admin
    {
        public int AdminID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class LoginResult
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public Admin Admin { get; set; }

        public bool IsSuccess => Status == "Success";
        public bool IsLocked => Status == "Locked";
        public bool IsInactive => Status == "Inactive";
    }
}