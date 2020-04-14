
class ScriptLoader {
    EvalScript_ErrMessage = "EvalScript error.";

    constructor() {
        //@ts-ignore
        this.cs = new CSInterface();
    }

    get cs(): any {
        return this.cs
    }
    set cs(val: any) {
        this.cs = val
    }

    loadJSX(fileName: string) {
        var cs = this.cs;
        //@ts-ignore
        var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/host/";

        cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }
}