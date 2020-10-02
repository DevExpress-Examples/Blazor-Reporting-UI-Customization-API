window.ReportingLocalization = {
    onCustomizeLocalization: function(s, e) {
        $.get("/js/localization/de.json").done(result => {
            e.WidgetLocalization.loadMessages(result);
        }).always(() => {
            e.WidgetLocalization.locale("de");
        })

        e.LoadMessages($.get("/js/localization/dx-analytics-core.de.json"));
        e.LoadMessages($.get("/js/localization/dx-reporting.de.json"));
    }
}