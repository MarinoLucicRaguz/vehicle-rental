using VehicleRentalSystem.Application.DTOs;

namespace VehicleRentalSystem.Application.Helpers;

public static class EnumOptionsHelper
{
    public static IEnumerable<EnumOptionsDTO> Build<TEnum>(
        Func<TEnum, string>? displaySelector = null)
        where TEnum : struct, Enum
    {
        displaySelector ??= e => e!.ToString();

        return Enum.GetValues(typeof(TEnum))
                   .Cast<TEnum>()
                   .Select(e => new EnumOptionsDTO
                   {
                       Id = Convert.ToInt32(e),
                       Name = e.ToString(),
                       DisplayName = displaySelector(e)
                   });
    }
}
