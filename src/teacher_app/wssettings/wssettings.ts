import * as uiRouter from "angular-ui-router";
import AuthorizedPage from "../../pages/authorizedPage";
import WsService from "../../services/wsService";
import app from "../app";


export default class WsPage extends AuthorizedPage {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "auth.wssettings";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "./wssettings/wssettings.html";
    }

    /**
     * bindings変数リストにResolvedを追加する
     * @param options
     */
    protected static setInheritOptions(options: ng.IComponentOptions): void {
        super.setInheritOptions(options);
        this.setResolveBindings(options, WsPage.state);
    }

    /**
     * ui-uiRouterにおけるstate
     */
    public static readonly state: uiRouter.Ng1StateDeclaration =
    {
        url: "/ws/:wsId/settings",
        abstract: true,
        resolve: {
            wsService: [WsService.IID, "$transition$", "$q", (wsService: WsService, $transition$: uiRouter.Transition, $q: ng.IQService) => {
                const wsId = $transition$.params().wsId;
                return $q.all([wsService.load(wsId)]).then(() => wsService);
            }],
        },
    };

    public wsService: WsService;

}

WsPage.register(app.getModule());