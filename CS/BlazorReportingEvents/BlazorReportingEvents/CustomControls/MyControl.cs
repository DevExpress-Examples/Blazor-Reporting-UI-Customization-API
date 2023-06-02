using DevExpress.Utils.Serializing;
using DevExpress.XtraPrinting;
using DevExpress.XtraReports.Localization;
using DevExpress.XtraReports;
using DevExpress.XtraReports.UI;
using System.ComponentModel;
using System.Drawing;

public enum MyEnum { One, Two, Three }

public class MyControl : XRLabel {
    public static readonly SizeF InitSizeF = new SizeF(200, 50);

    [XtraSerializableProperty,
    DefaultValue(true),
    Favorite(true),
    SRCategory(ReportStringId.CatBehavior)]
    public bool BoolProp { get; set; }

    [XtraSerializableProperty,
    DefaultValue(MyEnum.One)]
    public MyEnum EnumProp { get; set; }

    [XtraSerializableProperty]
    public Item[] ArrayProp { get; set; }

    protected override void PutStateToBrick(VisualBrick brick, PrintingSystemBase ps) {
        base.PutStateToBrick(brick, ps);
        brick.Text = EnumProp.ToString();
    }

    public class Item {
        [XtraSerializableProperty]
        public int PropA { get; set; }
    }
}
