using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Admin
{
    public class MonthlyDataDecimal 
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public decimal Total { get; set; } // The monthly data for Orders is returned as decimals (due to the SUM() function in SQL)
    }
}
