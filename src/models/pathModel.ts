import Models from './models';
import { PointModel } from './pointModel';
export class PathModel {
  constructor(
    public points: string = '',
    public strokeWidth: string = '',
    public stroke: string = '',
    public fill: string = 'none',
    public fontSize: number = 20,
    public isText: boolean = false,
    public textPoint: PointModel = new PointModel(),
    public textValue: string[] = [],
    public textBold: string = 'none',
    public svgElementDto: Models.Dtos.SvgElementDto = null,
  ) {}

  public getSVGElement(): string {
    let elm: string = '';
    if (this.isText) {
      elm = `<text x="${this.textPoint.x}" y="${this.textPoint.y}" fill="${this
        .stroke}" font-size="${this.fontSize}" stroke="${this
        .textBold}" stroke-width="1px">`;
      for (let index = 0; index < this.textValue.length; index++) {
        const element = this.textValue[index];
        elm += `<tspan x="${this.textPoint.x}" y="${this.textPoint.y +
          index * this.fontSize}" >${element}</tspan>`;
      }
      elm += '</text>';
    } else {
      elm = `<path stroke-linecap="round" d="${this
        .points}" fill="none" stroke="${this.stroke}" stroke-width="${this
        .strokeWidth}"></path>`;
    }
    return elm;
  }
  public static parseString(data: Models.Dtos.SvgElementDto): PathModel {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.element, 'text/xml');
    const path = new PathModel();
    path.svgElementDto = data;
    if (doc.documentElement.localName === 'path') {
      path.isText = false;
      path.points = doc.documentElement.attributes['d'].value;
      path.stroke = doc.documentElement.attributes['stroke'].value;
      path.strokeWidth = doc.documentElement.attributes['stroke-width'].value;
    } else {
      path.isText = true;
      path.stroke = doc.documentElement.attributes['fill'].value;
      path.fontSize = doc.documentElement.attributes['font-size'].value * 1;
      path.textBold = doc.documentElement.attributes['stroke'].value;
      path.textPoint.x = doc.documentElement.attributes['x'].value * 1;
      path.textPoint.y = doc.documentElement.attributes['y'].value * 1;
      for (
        let index = 0;
        index < doc.documentElement.childElementCount;
        index++
      ) {
        const element = doc.documentElement.children[index];
        path.textValue.push(element.textContent);
      }
    }
    return path;
  }
}
