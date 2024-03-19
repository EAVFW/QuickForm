import { IQuickFormLogger, registerQuickFormService } from "../QuickFormServices";


class DefaultLogger implements IQuickFormLogger {


    private replaceLiteral(body: string, ...args: any[]) {
        var iterLiteral = "{(.*?)}";
        let i = 0;
        var re = new RegExp(iterLiteral, "g");

        return body.replace(re, (s) => {
            try {
                return s.startsWith("{@") ? JSON.stringify(args[i++]) : args[i++]
            } catch (e) {
                console.warn("Failed to serialize: ", [args[i - 1]]);
                return "..." + args[i - 1] + "..."
            }
        });
    }
    log(message: string, ...args: any[]): void {
        console.log(this.replaceLiteral(message, ...args),args);
    }
    warn(message: string, ...args: any[]): void {
        console.warn(this.replaceLiteral(message, ...args),args);
    }

}

registerQuickFormService("logger", new DefaultLogger());