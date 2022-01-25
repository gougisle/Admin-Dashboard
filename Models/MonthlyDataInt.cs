using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Admin
{
    public class MonthlyDataInt 
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int Total { get; set; } // The monthly data for Orders is returned as integers (due to the COUNT() function in SQL)
    }
}
