namespace backend.Models.Enums
{
    [Flags]
    public enum RoleRights
    {
        None = 0,
        View = 1,
        Create = 2,
        Edit = 4,
        Delete = 8
    }
}
