window.ReportingConfigureCsrf = {
    onBeforeRender_configureCsrf: function (sender, e) {
        const token = document.getElementById('csrfToken').value;
        e.dx.Analytics.Utils.ajaxSetup.ajaxSettings = {
            headers: {
                'RequestVerificationToken': `${token}`
            }
        };
    }
}