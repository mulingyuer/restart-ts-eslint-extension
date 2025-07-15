import * as vscode from "vscode";
import { getExtensionCommand } from "./utils";
import { restartTsServer, restartEslintServer, restartVueServer } from "./helper";

/** 注册的命令数组 */
const commandList: Array<vscode.Disposable> = [
  vscode.commands.registerCommand(
    getExtensionCommand("restartTsServer"),
    restartTsServer
  ),
  vscode.commands.registerCommand(
    getExtensionCommand("restartEslintServer"),
    restartEslintServer
  ),
  vscode.commands.registerCommand(
    getExtensionCommand("restartVueServer"),
    restartVueServer
  ),
];

/** 插件激活钩子 */
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  context.subscriptions.push(...commandList);

  console.log("插件已经激活");
}

/** 插件卸载钩子 */
export function deactivate() {
  // 暂时没有什么卸载逻辑
}
