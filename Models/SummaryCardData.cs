using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Admin

{
    public class SummaryCardData
    {
        public string Label { get; set; }
        public int DatePart { get; set; }
        public decimal CurrentSum { get; set; }
        public decimal PreviousSum { get; set; }
        public decimal PChange { get; set; }
    }
}
