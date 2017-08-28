import ComponentBase from "../componentBase";

// 仮ユーザインタフェース
interface IDummyUser {
    name: string;
    password: string;
    mail: string;
    color: string;
}

export default class UserSettings extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appUserSettings";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "../components/user/userSettings.html";
        options.bindings = {
            user: "=",
        };
    }

    /**
     * ユーザ情報
     */
    public dummyUser: IDummyUser = {
        name:     "谷本 啓太",
        password: null,
        mail:     "raku@anzas.net",
        color:    "ブルー",
    };

    public colors: string[] = ["ブルー", "イエロー", "レッド"];
}
