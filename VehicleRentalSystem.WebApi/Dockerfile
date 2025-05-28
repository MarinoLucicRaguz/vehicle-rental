FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY VehicleRentalSystem.WebApi/*.csproj ./VehicleRentalSystem.WebApi/
COPY VehicleRentalSystem.Application/*.csproj ./VehicleRentalSystem.Application/
COPY VehicleRentalSystem.Domain/*.csproj ./VehicleRentalSystem.Domain/
COPY VehicleRentalSystem.Infrastructure/*.csproj ./VehicleRentalSystem.Infrastructure/
RUN dotnet restore VehicleRentalSystem.WebApi/VehicleRentalSystem.WebApi.csproj

COPY . .
RUN dotnet publish VehicleRentalSystem.WebApi/VehicleRentalSystem.WebApi.csproj \
    -c Release -o /app/publish -p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "VehicleRentalSystem.WebApi.dll"]
