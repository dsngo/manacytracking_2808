import * as angular from "angular";
import ComponentBase from "../componentBase";
import { PathModel } from "../../Models/pathModel";
import { DrawModel } from "../../Models/drawModel";
import DrawService from "../../Services/drawService";
import Models from "../../models/models";

export default class appDrawingPaint extends ComponentBase {

  public static readonly IID: string = "paintComponent";

  protected static setOptions(options: ng.IComponentOptions) {
    super.setOptions(options);

    options.templateUrl = "../components/drawing/appDrawingPaint.html";
    options.controllerAs = "paintCtrl";
    options.bindings = {
      svgImgId: '@'
      //isNewPaint: '<'
    };
  }
  private drawModel: DrawModel = new DrawModel();
  private isNewPaint: boolean;
  private svgImgId: string;
  public static $inject = ["drawService", "$window"];
  
  public constructor(private drawService: DrawService, private window: ng.IWindowService) {
    super();
    if (this.svgImgId == ''){
      this.drawService.createSVGImage(this.window.innerWidth, this.window.innerHeight)
    } else {
      this.drawService.loadSVGImage(this.svgImgId);
    }
  }
}
