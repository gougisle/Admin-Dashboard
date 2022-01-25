using Sabio.Models.Domain;
using Sabio.Models.Domain.Admin;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Services.Interfaces
{
    public interface IAdminService
    {
        AdminDashTotals GetAllTotals();
        List<SummaryCardData> GetAllSales();
        List<SummaryCardData> GetAllOrders();
        List<UserCount> GetUserCount();
        List<MonthlyDataInt> GetMonthlyOrders(int year);
        List<MonthlyDataDecimal> GetMonthlySales(int year);

    }
}
