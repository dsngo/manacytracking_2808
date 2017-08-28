import * as _ from "lodash";
import * as restangular from "restangular";
import Models from "../models/models";
import ServiceBase from "./serviceBase";

export default class WsService extends ServiceBase {
    /**
     * 登録サービス名
     */
    public static readonly IID = "wsService";     // 定数で定義すること

    /**
     * インジェクトするサービス
     */
    private static $inject = ["Restangular", "$q"];

    /**
     * コンストラクタ
     */
    public constructor(
        protected Restangular: restangular.IService,
        protected $q: ng.IQService,
        protected wsService: WsService,
    ) {
        super();
    }

    /**
     * データ読み込み
     */
    public load(wsId: string): ng.IPromise<WsService> {
        this.busy(true);
        const thisService = this;
        let resultWs;
        let resultElements;

        const promise1 = this.Restangular
            .one("ws", wsId)
            .get<Models.Dtos.WsDto>()
            .then((ws) => {
                resultWs = ws;
                return;
            });

        const promise2 = this.Restangular
            .one("ws", wsId).all("elements")
            .getList<Models.Dtos.WsElementDto>()
            .then((elements) => {
                resultElements = elements;
                return;
            });

        return this.$q.all([promise1, promise2]).then(() => {
            thisService.InitiallizeData();
            return thisService;
        }).finally(() => {
            thisService.busy(false);
        });
    }

    /**
     * Element配列関連データの初期化
     */
    private InitiallizeData(): void {

    }

}