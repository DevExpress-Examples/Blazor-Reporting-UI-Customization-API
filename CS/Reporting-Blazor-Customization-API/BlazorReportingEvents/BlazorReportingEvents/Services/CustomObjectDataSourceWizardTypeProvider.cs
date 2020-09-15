using BlazorReportingEvents.Data;
using DevExpress.DataAccess.Web;
using System;
using System.Collections.Generic;

namespace BlazorReportingEvents.Services {
    public class CustomObjectDataSourceWizardTypeProvider : IObjectDataSourceWizardTypeProvider {
        public IEnumerable<Type> GetAvailableTypes(string context) {
            return new[] {
                typeof(EmployeesDataSource),
            };
        }
    }
}
