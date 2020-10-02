using DevExpress.AspNetCore.Reporting.ReportDesigner;
using DevExpress.AspNetCore.Reporting.ReportDesigner.Native.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlazorReportingEvents.Controllers {
    [Route("DesignerCsrf")]
    [ValidateAntiForgeryToken]
    public class DesignerCsrfController : ReportDesignerController {
        public DesignerCsrfController(IReportDesignerMvcControllerService controllerService) : base(controllerService) {
        }
    }
}
