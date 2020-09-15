window.ReportingViewerCustomization = {
    onCustomizeParameterEditors: function(s, e) {
        //Remove time part from the DateTime parameter editor
        if(e.parameter.type === "System.DateTime") {
            e.info.editor = $.extend({}, e.info.editor);
            e.info.editor.extendedOptions = $.extend(e.info.editor.extendedOptions || {}, { type: 'date' });
        }
    },

    //Change default Zoom level
    onBeforeRender: function(s, e) {
        //-1: Page Width
        //0: Whole Page
        //1: 100%
        e.reportPreview.zoom(-1);
    }
}