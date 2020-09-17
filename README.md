# Blazor Reporting - UI Customization API

This example demonstrates how to use the client-side Blazor Reporting API to customize the Document Viewer and End-User Report Designer behavior and appearance.

## Overview
The client-side code that performs customizations is the JavaScript function defined in an external script file as a global object. The script file is included in the _Host.cshtml page. 

The [DxDocumentViewerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerCallbacks) object properties specifies the Document Viewer event handlers. The property name matches the event name. To handle the Document Viewer event, set the DxDocumentViewerCallbacks property to the JavaScript function name.  

The [DxReportDesignerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerCallbacks) object properties specifies the Report Designer event handlers. The property name matches the event name. To handle the Report Designer event, set the DxReportDesignerCallbacks property to the JavaScript function name.

The following code handles the **BeforeRender** event to specify the Document Viewer's zoom level: 

* *reporting_ViewerCustomization.js* file

    ```javascript
    window.ReportingViewerCustomization = {
        //Change default Zoom level
        onBeforeRender: function(s, e) {
            //-1: Page Width
            //0: Whole Page
            //1: 100%
            e.reportPreview.zoom(-1);
        }
    }
    ```

* *_Host.cshtml* file
    ```cshtml
    <script src="~/js/reporting_ViewerCustomization.js"></script>
    ```    

* *Viewer.razor* file
    ```razor
    <DxDocumentViewer ReportUrl="SampleReport" Height="1000px" Width="100%">
        <DxDocumentViewerCallbacks BeforeRender="ReportingViewerCustomization.onBeforeRender" />
    </DxDocumentViewer>
    ``` 
Note that you cannot use named constants in JS functions, specify the strings instead.

## Localization
Demonstrated with the [LocalizationViewer.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/LocalizationViewer.razor) and [LocalizationDesigner.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/LocalizationDesigner.razor) pages.

To localize the Document Viewer and Report Designer, you need:

* **jquery** library. Add it to the _Host.cshtml page.
* Translations in JSON format. You can download translations from the [localization service](https://localization.devexpress.com/). Review the [Localization](https://docs.devexpress.com/XtraReports/400932/web-reporting/asp-net-core-reporting/localization#obtain-json-files-from-the-localization-service) help topic for more information.

The *reporting_Localization.js* file contains the **onCustomizeLocalization** function that loads JSON localization files. The files are located in the *wwwroot\js\localization* folder.

The function name is assigned to the **CustomizeLocalization** property of the DxDocumentViewerCallbacks or DxReportDesignerCallbacks, respectively. 

## Anti-Forgery Tokens
Demonstrated with the [DesignerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCsrf.razor) and [ViewerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCsrf.razor) pages.

To implement anti-forgery tokens that [prevent CSRF attack](https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/preventing-cross-site-request-forgery-csrf-attacks), do the following:
- Add the following code to the _Host.cshtml file:
	```cshtml
	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery antiforgery
	@functions {
	string CsrfToken => antiforgery.GetAndStoreTokens(HttpContext).RequestToken;
	}
	```
- Create custom controllers (the [WebDocumentViewerController](https://docs.devexpress.com/XtraReports/DevExpress.AspNetCore.Reporting.WebDocumentViewer.WebDocumentViewerController) and [ReportDesignerController](https://docs.devexpress.com/XtraReports/DevExpress.AspNetCore.Reporting.ReportDesigner.ReportDesignerController) descendants) with the **ValidateAntiForgeryToken** and **Route** attributes. The Route attributes in this example have the "ViewerCsrf" or "DesignerCsrf" values, respectively.
- The routes "ViewerCsrf" and "DesignerCsrf" are assigned to the [DxDocumentViewerRequestOptions.InvokeAction](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerRequestOptions.InvokeAction) and [DxReportDesignerRequestOptions.InvokeAction](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerRequestOptions.InvokeAction) properties, respectively. Refer to the [DesignerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCsrf.razor) and [ViewerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCsrf.razor) files for the code sample.
- Handle the reporting component's **BeforeRender** event to add the **RequestVerificationToken** to the request header. Refer to the [reporting_ConfigureCsrf.js](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/wwwroot/js/reporting_ConfigureCsrf.js) file for the code sample.

## Document Viewer - Customization
Demonstrated with the [ViewerCustomization.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCustomization.razor) page.

The *reporting_ViewerCustomization.js* file contains JavaScript functions that customize the Document Viewer. 

The following customizations are implemented:

- Time portion in the DateTime parameter editor is removed. The JS function handles the **CustomizeParameterEditors** event.
- Default zoom level is set to "Page Width". The JS function handles the **BeforeRender** event.

## End-User Report Designer - Customization
Demonstrated with the [DesignerCustomization.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCustomization.razor) page.

The *reporting_DesignerCustomization.js* file contains JavaScript functions that customize the Report Designer.

The following customizations are implemented:

- The Menu button is removed. The JS function handles the **CustomizeElements** event.
- The Save and New buttons are moved from Menu to the toolbar. The JS function handles the **CustomizeMenuActions** event.
- The New button creates a custom report instead of an empty report. The JS function handles the **ReportOpened** event.
- The Wizard runs when the Report Designer starts. The JS function handles the **BeforeRender** event.
- Certain report types are removed from the Report Wizard. The JS function handles the **CustomizeWizard** event.

