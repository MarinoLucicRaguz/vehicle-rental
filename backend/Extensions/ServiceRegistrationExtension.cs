using System.Reflection;

namespace backend.Extensions
{
    public static class ServiceRegistrationExtension
    {
        public static void AddApplicationServices(this IServiceCollection services, Assembly assembly)
        {
            var serviceTypes = assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract && t.GetInterfaces().Any()).ToList();

            foreach (var implementation in serviceTypes)
            {
                foreach (var interfaceType in implementation.GetInterfaces())
                {
                    if (IsMatchingInterface(interfaceType, implementation))
                    {
                        services.AddScoped(interfaceType, implementation);
                    }
                }
            }
        }

        private static bool IsMatchingInterface(Type interfaceType, Type implementationType)
        {
            return interfaceType.Name.StartsWith("I") && interfaceType.Name.Substring(1) == implementationType.Name;
        }
    }
}
