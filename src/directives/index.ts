import Recurse from "./recurse/recurse";
import RecurseNode from "./recurse/recurseNode";
import VgCustomize from "./videogular/vgCustomize";
import VgPlay from "./videogular/vgPlay";

export default function registerDirectives(app: ng.IModule) {
    // 再帰ディレクティブ
    Recurse.register(app);
    RecurseNode.register(app);

    // videogular拡張ディレクティブ
    VgCustomize.register(app);
    VgPlay.register(app);
}
