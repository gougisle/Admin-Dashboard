using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Admin;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class AdminService : IAdminService
    {
        private IDataProvider _data = null;
        public AdminService(IDataProvider data)
        {
            _data = data;
        }

        public List<UserCount> GetUserCount()
        {
            List<UserCount> list = null;
            string procName = "[dbo].[AdminDash_Users_StatusCount]";

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: (IDataReader reader, short set) =>
                {
                    int index = 0;
                    UserCount userCount = new UserCount();

                    userCount.UserStatus = reader.GetSafeString(index++);
                    userCount.Count = reader.GetSafeInt32(index);

                    if (list == null)
                    {
                        list = new List<UserCount>();
                    }
                    list.Add(userCount);
                });

            return list;
        }

        public AdminDashTotals GetAllTotals()
        {
            AdminDashTotals totals = null;
            string procName = "dbo.AdminDash_Totals";

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: (IDataReader reader, short set) =>
            {
                int index = 0;
                totals = new AdminDashTotals();

                totals.TotalUsers = reader.GetSafeInt32(index++);
                totals.TotalSales = reader.GetSafeDecimal(index++);
                totals.TotalOrders = reader.GetSafeInt32(index++);

            });

            return totals;
        }

        public List<SummaryCardData> GetAllOrders()
        {
            List<SummaryCardData> list = null;
            string procName = "dbo.AdminDash_Orders_SelectAll";

            _data.ExecuteCmd(procName
                , inputParamMapper: null
                , singleRecordMapper: (IDataReader reader, short set) =>
                {
                    int startingIndex = 0;

                    if (set == 0)
                    {
                        SummaryCardData currentYear = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentYear);
                    }
                    else if (set == 1)
                    {
                        SummaryCardData currentQuarter = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentQuarter);
                    }
                    else if (set == 2)
                    {
                        SummaryCardData currentMonth = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentMonth);
                    }
                    else if (set == 3)
                    {
                        SummaryCardData currentWeek = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentWeek);
                    }

                });

            return list;
        }
   
        public List<SummaryCardData> GetAllSales()
        {
            List<SummaryCardData> list = null;
            string procName = "dbo.AdminDash_Sales_SelectAll";

            _data.ExecuteCmd(procName
                , inputParamMapper: null
                , singleRecordMapper: (IDataReader reader, short set) =>
                {
                    int startingIndex = 0;

                    if (set == 0)
                    {
                        SummaryCardData currentYear = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentYear);
                    }
                    else if (set == 1)
                    {
                        SummaryCardData currentQuarter = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentQuarter);
                    }
                    else if (set == 2)
                    {
                        SummaryCardData currentMonth = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentMonth);
                    }
                    else if (set == 3)
                    {
                        SummaryCardData currentWeek = MapSummaryData(reader, ref startingIndex);

                        if (list == null)
                        {
                            list = new List<SummaryCardData>();
                        }
                        list.Add(currentWeek);
                    }

                });

            return list;
        }

        public List<MonthlyDataInt> GetMonthlyOrders(int year)
        {
            string procName = "[dbo].[AdminDash_MonthlyOrders_SelectByYear]";
            List<MonthlyDataInt> list = null;

            _data.ExecuteCmd(procName, inputParamMapper : delegate (SqlParameterCollection inputs)
            {
                inputs.AddWithValue("@Year", year);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 int index = 0;
 
                 MonthlyDataInt monthData = new MonthlyDataInt();

                 monthData.Name = reader.GetSafeString(index++);
                 monthData.Number = reader.GetSafeInt32(index++);
                 monthData.Total = reader.GetSafeInt32(index++);

                 if (list == null)
                 {
                     list = new List<MonthlyDataInt>();
                 }
                 list.Add(monthData);
             });

            return list;

        }

        public List<MonthlyDataDecimal> GetMonthlySales(int year)
        {
            string procName = "[dbo].[AdminDash_MonthlySales_SelectByYear]";
            List<MonthlyDataDecimal> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection inputs)
            {
                inputs.AddWithValue("@Year", year);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;

                MonthlyDataDecimal monthData = new MonthlyDataDecimal();

                monthData.Name = reader.GetSafeString(index++);
                monthData.Number = reader.GetSafeInt32(index++);
                monthData.Total = reader.GetSafeDecimal(index++);

                if (list == null)
                {
                    list = new List<MonthlyDataDecimal>();
                }
                list.Add(monthData);
            });

            return list;

        }



        #region Internal Mapping Functions

        private static SummaryCardData MapSummaryData(IDataReader reader, ref int index)
        {
            SummaryCardData model = new SummaryCardData();

            model.Label = reader.GetSafeString(index++);
            model.DatePart = reader.GetSafeInt32(index++);
            model.CurrentSum = reader.GetSafeDecimal(index++);
            model.PreviousSum = reader.GetSafeDecimal(index++);
            model.PChange = reader.GetSafeDecimal(index++);

            return model;
        }


        #endregion





    }
}
