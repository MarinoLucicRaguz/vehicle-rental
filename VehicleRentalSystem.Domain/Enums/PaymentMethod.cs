namespace VehicleRentalSystem.Domain.Enums
{
    public enum PaymentMethod
    {
        CreditCard,
        Cash,
        BankTransfer,
        PayPal,
        ApplePay,
        GooglePay,
        Free
    }

    public static class PaymentMethodExtensions
    {
        public static string GetDisplayName(this PaymentMethod paymentMethod)
        {
            return paymentMethod switch
            {
                PaymentMethod.CreditCard => "Kreditna kartica",
                PaymentMethod.Cash => "Gotovina",
                PaymentMethod.BankTransfer => "Bankovni transfer",
                PaymentMethod.PayPal => "PayPal",
                PaymentMethod.ApplePay => "Apple Pay",
                PaymentMethod.GooglePay => "Google Pay",
                PaymentMethod.Free => "Besplatno",
                _ => paymentMethod.ToString()
            };
        }
    }
}
