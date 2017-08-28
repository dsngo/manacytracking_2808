import WsAssignmentService from "../../services/wsAssignmentService";
import ComponentBase from "../componentBase";

export default class WsEditorView extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsEditorView";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.bindings = {
            ownerUserId: "<",
        };
        options.templateUrl = "../components/wsEditor/wsEditorView.html";
    }

    /**
     * InjectするService
     */
    public static $inject = [WsAssignmentService.IID];

    /**
     * コンストラクタ
     * @param wsAssignmentService
     */
    public constructor(
        public wsAssignmentService: WsAssignmentService,
    ) {
        super();
    }

    /**
     * WSが白紙かどうか
     */
    public get isBlank() {
        return this.wsAssignmentService.getChildElements(this.wsAssignmentService.rootElement).length === 0;
    }

}
