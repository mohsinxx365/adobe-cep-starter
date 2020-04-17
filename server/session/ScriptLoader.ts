
class ScriptLoader {
    EvalScript_ErrMessage = "EvalScript error.";

    constructor() {
        //@ts-ignore
        this.cs = new CSInterface();
    }

    get cs(): any {
        //@ts-ignore
        return this._cs
    }
    set cs(val: any) {
        //@ts-ignore
        this._cs = val
    }

    log(val: string) {
        console.log(`${this.name} ${val}`);
    }

    get name() {
        return "ScriptLoader:: ";
    }

    evalScript(functionName: string, params: string | object) {
        const params_string = typeof params === "string"
            ? params : typeof params === "object"
                ? JSON.stringify(params) : "";

        let eval_string = `${functionName}('${params_string}')`;
        let that = this;

        return new Promise((resolve, reject) => {
            let callback = function (eval_res: string) {
                if (typeof eval_res === "string") {
                    if (eval_res.toLowerCase().indexOf("error") != -1) {
                        that.log("err eval");
                        reject(eval_res)
                        return;
                    }
                }
                that.log("sucess eval\n")
                resolve(eval_res);
                return;
            };
            that.cs.evalScript(eval_string, callback);
        })
    }
}

let scriptLoader = new ScriptLoader();

export default scriptLoader;