window.ReportingDesignerCustomization = {
    onCustomizeElements: function(s, e) {
        //Remove Menu button
        var menuButton = e.GetById(s.dx.Reporting.Designer.Utils.ReportDesignerElements.MenuButton)
        var menuButtonIndex = e.Elements.indexOf(menuButton);
        menuButtonIndex !== -1 && e.Elements.splice(menuButtonIndex, 1);
    },

    onCustomizeMenuActions: function(s, e) {
        //Custom New Report
        var newReportAction = e.GetById(s.dx.Reporting.Designer.Actions.ActionId.NewReport);
        if(newReportAction) {
            newReportAction.clickAction = function(report) {
                s.OpenReport("CustomNewReport");
            }

            //Move New button to the toolbar
            newReportAction.container = "toolbar";
            newReportAction.hasSeparator = true;
            e.Actions.splice(e.Actions.indexOf(newReportAction), 1);
            e.Actions.push(newReportAction);
        }

        //Move Save button to the toolbar
        var saveAction = e.GetById(s.dx.Reporting.Designer.Actions.ActionId.Save);
        saveAction.container = "toolbar";
        e.Actions.splice(e.Actions.indexOf(saveAction), 1);
        e.Actions.push(saveAction);
    },

    //If a custom new report was opened - Update its status
    onReportOpened: function(s, e) {
        if(e.Url === "CustomNewReport") {
            var tab = s.GetCurrentTab();
            tab.url("");
            tab.isModified(true);
        }
    },

    onBeforeRender: function(s, e) {
        s.RunWizard("NewViaReportWizard")
    },

    onCustomizeWizard: function(s, e) {
        if(e.Type === "ReportWizard") {
            e.Wizard.events.addHandler("beforePageInitialize", (args) => {
                if (args.pageId === s.dx.Reporting.Designer.Wizard.FullscreenReportWizardPageId.SelectReportTypePage) {
                    args.page.typeItems.splice(0, 1);
                    args.page.typeItems.pop();
                }
            })
        }
    }
}