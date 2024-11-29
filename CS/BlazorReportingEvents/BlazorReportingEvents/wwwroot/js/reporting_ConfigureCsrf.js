window.ReportingConfigureCsrf = {
    onBeforeRender_configureCsrf: function (sender, e) {
        const token = document.getElementById('csrfToken').value;
        sender.dx.Analytics.Utils.fetchSetup.fetchSettings = {
            headers: {
                'RequestVerificationToken': `${token}`
            }
        };
    }
}
