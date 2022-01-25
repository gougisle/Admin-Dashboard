using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Admin;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Core;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminApiController : BaseApiController
    {
        private IAdminService _service = null;

        public AdminApiController(IAdminService service
            , ILogger<AdminApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet("dash")]
        public ActionResult<Main> GetDashboardData()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Main main = new Main();
                main.Totals = _service.GetAllTotals();
                main.UserSummaryData = _service.GetUserCount();
                main.SaleSummaryData = _service.GetAllSales();
                main.OrderSummaryData = _service.GetAllOrders();


                if (main == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No records found");
                }
                else
                {
                    response = new ItemResponse<Main> { Item = main };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("order/chart")]
        public ActionResult<List<MonthlyDataInt>> GetOrdersChart(int year)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<MonthlyDataInt> chartData = _service.GetMonthlyOrders(year);

                if (chartData == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No records found");
                }
                else
                {
                    response = new ItemResponse<List<MonthlyDataInt>> { Item = chartData };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }


        [HttpGet("sale/chart")]
        public ActionResult<List<MonthlyDataDecimal>> GetSalesChart(int year)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<MonthlyDataDecimal> chartData = _service.GetMonthlySales(year);

                if (chartData == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No records found");
                }
                else
                {
                    response = new ItemResponse<List<MonthlyDataDecimal>> { Item = chartData };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }


    }
}
