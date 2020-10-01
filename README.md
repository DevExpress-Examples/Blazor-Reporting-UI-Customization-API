# Blazor Reporting - UI Customization API

This example demonstrates how to use client-side Blazor Reporting API to customize the Document Viewer and End-User Report Designer components.

## Overview
The Document Viewer and Report Designer use the following objects to specify clint-side event handlers:

* [DxDocumentViewerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerCallbacks) 
* [DxReportDesignerCallbacks](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerCallbacks)

You can define a client-side handler - a global function - in a separate JavaScript file. For example, the following function will handle the **BeforeRender** event to specify the Document Viewer's zoom level: 

*reporting_ViewerCustomization.js* file

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

Reference the script file from the _Host.cshtml page. 

*_Host.cshtml* file
```cshtml
<script src="~/js/reporting_ViewerCustomization.js"></script>
```    

Assign the client-side function's name to a property in one of the objects mentioned above - *DxDocumentViewerCallbacks* or *DxReportDesignerCallbacks*. 

* *Viewer.razor* file
```razor
<DxDocumentViewer ReportUrl="SampleReport" Height="1000px" Width="100%">
	<DxDocumentViewerCallbacks BeforeRender="ReportingViewerCustomization.onBeforeRender" />
</DxDocumentViewer>
``` 
Note that you cannot use named constants in JavaScript functions. Specify strings instead.

## Example: Localization
Related pages: [LocalizationViewer.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/LocalizationViewer.razor) and [LocalizationDesigner.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/LocalizationDesigner.razor).

To localize Document Viewer and Report Designer UI, you need the following resources:

* **jQuery** library. Add a reference to the _Host.cshtml page.
* Translations in JSON format. You can obtain the files from the DevExpress [Localization Service](https://localization.devexpress.com/). Review the [Localization](https://docs.devexpress.com/XtraReports/400932/web-reporting/asp-net-core-reporting/localization#obtain-json-files-from-the-localization-service) help topic for more information.

The *reporting_Localization.js* file contains the **onCustomizeLocalization** function that loads JSON localization files. The files are located in the *wwwroot\js\localization* folder. Razor page markup assigns the function name to the **CustomizeLocalization** property in DxDocumentViewerCallbacks or DxReportDesignerCallbacks. 

## Example: Anti-Forgery Tokens
Related pages: [DesignerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCsrf.razor) and [ViewerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCsrf.razor).

To implement anti-forgery tokens that [prevent CSRF attack](https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/preventing-cross-site-request-forgery-csrf-attacks), do the following:

- Add the following code to the _Host.cshtml file:
	```cshtml
	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery antiforgery
	@functions {
		string CsrfToken => antiforgery.GetAndStoreTokens(HttpContext).RequestToken;
	}
	```
- Create custom controllers - [WebDocumentViewerController](https://docs.devexpress.com/XtraReports/DevExpress.AspNetCore.Reporting.WebDocumentViewer.WebDocumentViewerController) and [ReportDesignerController](https://docs.devexpress.com/XtraReports/DevExpress.AspNetCore.Reporting.ReportDesigner.ReportDesignerController) descendants. Apply the **ValidateAntiForgeryToken** and **Route** attributes. The Route attributes in this example use the "ViewerCsrf" or "DesignerCsrf" values, respectively.
- Use the specified route values - "ViewerCsrf" and "DesignerCsrf" - to initialize the [DxDocumentViewerRequestOptions.InvokeAction](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxDocumentViewerRequestOptions.InvokeAction) and [DxReportDesignerRequestOptions.InvokeAction](https://docs.devexpress.com/XtraReports/DevExpress.Blazor.Reporting.DxReportDesignerRequestOptions.InvokeAction) properties. Refer to the [DesignerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCsrf.razor) and [ViewerCsrf.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCsrf.razor) files for code samples.
- Handle the reporting component's **BeforeRender** event to add the **RequestVerificationToken** to the request header. Refer to the [reporting_ConfigureCsrf.js](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/wwwroot/js/reporting_ConfigureCsrf.js) file for the code sample.

## Example: Document Viewer UI Customization
Related pages: [ViewerCustomization.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/ViewerCustomization.razor).

The *reporting_ViewerCustomization.js* file contains JavaScript functions that customize the Document Viewer in the following manner:

| Event | Handler Implementation |
|-----------|----------------|
| **CustomizeParameterEditors** |	Removes the time portion in the DateTime parameter editor. |
| **BeforeRender** |	Sets the default zoom level to "Page Width". |


## Example: End-User Report Designer UI Customization
Related pages: [DesignerCustomization.razor](CS/Reporting-Blazor-Customization-API/BlazorReportingEvents/BlazorReportingEvents/Pages/DesignerCustomization.razor).

The *reporting_DesignerCustomization.js* file contains JavaScript functions that customize the Report Designer in the following manner:

| Event | Handler Implementation |
|-----------|----------------|
| **CustomizeElements** | Removes the Menu button |
| **CustomizeMenuActions** | Moves the Save and New buttons from the Menu to the Toolbar. |
| **ReportOpened** | Creates a custom report when users press the New button. |
| **BeforeRender** | Runs the Wizard when the Report Designer starts. |
| **CustomizeWizard** | Removes certain report types from the Report Wizard. |
