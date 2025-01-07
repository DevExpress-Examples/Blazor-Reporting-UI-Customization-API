window.ReportingConfigureCsrf = {
    onBeforeRender_configureCsrf: function (sender, e) {
        const token = document.getElementById('csrfToken').value;
       DevExpress.Analytics.Utils.fetchSetup.fetchSettings = {
            headers: {
                'RequestVerificationToken': `${token}`
            }
        };
    }
}
