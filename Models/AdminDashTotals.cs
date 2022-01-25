using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class AdminDashTotals
    {
        public int TotalUsers { get; set; }
        public decimal TotalSales { get; set; }
        public int TotalOrders { get; set; }
    }
}
