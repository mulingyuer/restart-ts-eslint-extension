import * as vscode from "vscode";
import { Command, StatusBar } from "@/core";

/** 指令实例 */
let command: Command;
/** 状态栏实例 */
let statusBar: StatusBar;

/** 插件激活钩子 */
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  command = new Command(context);
  // 注册状态栏
  statusBar = new StatusBar(context);
}

/** 插件卸载钩子 */
export function deactivate() {
  command.dispose();
  statusBar.dispose();
}
