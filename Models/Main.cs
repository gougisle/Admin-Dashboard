using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Admin
{
    public class Main
    {
        public AdminDashTotals Totals { get; set; }
        public List<UserCount> UserSummaryData { get; set; }
        public List<SummaryCardData> SaleSummaryData { get; set; }
        public List<SummaryCardData> OrderSummaryData { get; set; }
    }
}
