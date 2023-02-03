namespace UserEnrollmentDemo.Models
{
    public class PersonModel
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string UserRole { get; set; }
        public int AttachedCustomerId { get; set; }
        public string UserGroupName { get; set; }
        public int UserGroupId { get; set; } 
        public List<AdminModel> Privileges { get; set; }

    }

    public class AdminModel
    {
        public string PrivilegeName { get; set; }
        public int PersonId { get; set; }
    }
}
