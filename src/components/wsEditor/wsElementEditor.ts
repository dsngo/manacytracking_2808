import Models from "../../models/models";
import WsEditorService from "../../services/wsEditorService";
import WsAssignmentService from "../../services/wsAssignmentService";
import ComponentBase from "../componentBase";

export default class WsElementEditor extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsElementEditor";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        super.setOptions(options);
        options.bindings = {
            element: "<",
        };
        options.templateUrl = "../components/wsEditor/wsElementEditor.html";
        options.transclude = true;
    }

    /**
     * BindingされたWsElementId
     */
    public element: Models.Dtos.WsElementDto;

    /**
     * InjectするService
     */
    public static $inject = [WsAssignmentService.IID, WsEditorService.IID, "$mdDialog"];

    /**
     * コンストラクタ
     * @param wsAssignmentService
     */
    public constructor(
        public wsAssignmentService: WsAssignmentService,
        public wsEditorService: WsEditorService,
        public $mdDialog: ng.material.IDialogService,
    ) {
        super();
    }

    /**
     * Element.Contentを取得
     */
    public get content(): Models.Dtos.WsElementContentDto {
        return this.element.content || null;
    }

    public onFocus(): void {
        this.wsEditorService.activeElement = this.element;
    }

    public onQuillSelectionChanged(editor, range, oldRange, source) {
        if (oldRange == null) { this.onFocus(); }
    }

    public get isSelected(): boolean {
        if (this.wsEditorService.activeElement && this.element) {
            return this.wsEditorService.activeElement === this.element;
        }
        return false;
    }

    public save() {
        this.wsEditorService.save();
    }

    public cancel() {
        this.wsEditorService.cancelChange();
    }

    public remove() {
        const confirm = this.$mdDialog.confirm()
            .title("要素の削除")
            .textContent("選択されている要素は削除されます。その要素に含まれる子要素も全て削除されます。")
            .ok("削除する")
            .cancel("キャンセル");

        this.$mdDialog.show(confirm).then(() => {
            this.wsEditorService.deleteElement();
        }, () => {
            return;
        });
    }
}
