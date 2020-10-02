using DevExpress.AspNetCore.Reporting.WebDocumentViewer;
using DevExpress.AspNetCore.Reporting.WebDocumentViewer.Native.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlazorReportingEvents.Controllers {
    [Route("ViewerCsrf")]
    [ValidateAntiForgeryToken]
    public class ViewerCsrfController : WebDocumentViewerController {
        public ViewerCsrfController(IWebDocumentViewerMvcControllerService controllerService) : base(controllerService) {
        }
    }
}
