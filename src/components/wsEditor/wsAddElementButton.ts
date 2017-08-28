import * as angular from "angular";
import Models from "../../models/models";
import WsEditorService from "../../services/wsEditorService";
import WsAssignmentService from "../../services/wsAssignmentService";
import ComponentBase from "../componentBase";
import WsSelectOrigins from "../wsEditor/wsSelectOrigins";

export default class WsAddElementButton extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsAddElementButton";

    /**
     * InjectするService
     */
    public static $inject = ["$mdDialog", WsEditorService.IID, WsAssignmentService.IID, "$mdMenu"];

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.bindings = {
            baseElement: "<",
            position: "@",      // before / after / firstChild / lastChild 新しいElementの挿入位置
        };
        options.templateUrl = "../components/wsEditor/wsAddElementButton.html";
    }

    private static CopyWsElementPositionEnum = {
        firstchild: Anzas.Manacy.Logic.Worksheet.WsExtensions.CopyWsElementPositionEnum.FirstChild,
        lastchild: Anzas.Manacy.Logic.Worksheet.WsExtensions.CopyWsElementPositionEnum.LastChild,
        after: Anzas.Manacy.Logic.Worksheet.WsExtensions.CopyWsElementPositionEnum.After,
        before: Anzas.Manacy.Logic.Worksheet.WsExtensions.CopyWsElementPositionEnum.Before,
    };

    public baseElement: Anzas.Manacy.Models.Dtos.WsElementDto;
    public position: string;

    /**
     * コンストラクタ
     * @param wsAssignmentService
     */
    public constructor(
        public $mdDialog: ng.material.IDialogService,
        public wsEditorService: WsEditorService,
        public wsAssignmentService: WsAssignmentService,
        public $mdMenu: ng.material.IMenuService,
    ) {
        super();
    }

    public get enableCopyAfter(): boolean {
        return this.baseElement.wsElementId !== this.baseElement.rootId && this.position.toLocaleLowerCase() === "after";
    }

    public get enableCopyBefore(): boolean {
        return this.baseElement.wsElementId !== this.baseElement.rootId && this.position.toLocaleLowerCase() === "before";
    }

    /**
     * エレメントをコピー
     */
    public copyElement(): void {
        this.wsEditorService.addElement({
            sourceElementId: this.baseElement.wsElementId,
            positionBaseElementId: this.baseElement.wsElementId,
            position: WsAddElementButton.CopyWsElementPositionEnum[this.position.toLowerCase()],
        });
    }

    public addElement($event): void {
        const thisComponent = this;

        // parentElementパラメーターをダイアログに渡す
        const dialogOption = WsSelectOrigins.getDialogOptions($event);
        const position = this.position.toLowerCase();
        if (position === "after" || position === "before") {
            dialogOption.locals = { parentElement: this.wsAssignmentService.elements[this.baseElement.property.parentId] };
        } else {
            dialogOption.locals = { parentElement: this.baseElement };
        }

        this.$mdDialog.show(dialogOption)
            .then((origin: Models.Dtos.WsOriginDtoForEditor) => {
                // Elementを追加
                thisComponent.wsEditorService.addElement({
                    sourceElementId: origin.wsElementId,
                    positionBaseElementId: thisComponent.baseElement.wsElementId,
                    position: WsAddElementButton.CopyWsElementPositionEnum[thisComponent.position.toLowerCase()],
                });
            }, () => {
                // キャンセル
            });

    }
}
