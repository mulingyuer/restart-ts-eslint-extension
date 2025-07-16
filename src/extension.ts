import * as vscode from "vscode";
import { getExtensionCommand } from "./utils";
import {
  restartTsServer,
  restartEslintServer,
  restartVueServer,
  reloadWindow,
} from "./helper";
import {
  RestartTsServerButton,
  RestartEslintServerButton,
  RestartVueServer,
  ReloadWindowButton,
} from "./status-bar-button";
import type { BaseStatusButton } from "./status-bar-button";

/** 注册命令 */
function registerCommand(context: vscode.ExtensionContext) {
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
    vscode.commands.registerCommand(
      getExtensionCommand("reloadWindow"),
      reloadWindow
    ),
  ];

  context.subscriptions.push(...commandList);
}

/** 创建状态栏按钮 */
const statusBarBtnList: Array<BaseStatusButton> = [];
function createStatusBarBtns() {
  statusBarBtnList.push(
    new RestartTsServerButton(),
    new RestartEslintServerButton(),
    new RestartVueServer(),
    new ReloadWindowButton()
  );
}
function updateStatusBarBtnVisibility() {
  statusBarBtnList.forEach((btn) => btn.updateVisibility());
}

/** 插件激活钩子 */
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  registerCommand(context);

  // 创建状态栏按钮
  createStatusBarBtns();

  // 订阅事件
  /** 当活动文本编辑器发生变化时触发，例如用户从一个文件切换到另一个文件 */
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarBtnVisibility)
  );
  /** 当文本编辑器中的选区发生变化时触发，例如用户移动光标或选择文本 */
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarBtnVisibility)
  );
  /** 当一个文档被关闭时触发 */
  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument(updateStatusBarBtnVisibility)
  );
  /** 当一个文档被打开时触发 */
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(updateStatusBarBtnVisibility)
  );

  // 首次更新状态栏按钮可见性
  updateStatusBarBtnVisibility();
}

/** 插件卸载钩子 */
export function deactivate() {
  // 暂时没有什么卸载逻辑，事件订阅的全是 vscode.Disposable 类型，不需要手动取消订阅
}
