/*
 * @Author: mulingyuer
 * @Date: 2025-07-16 16:35:12
 * @LastEditTime: 2025-07-16 17:27:40
 * @LastEditors: mulingyuer
 * @Description: 状态栏
 * @FilePath: \restart-vscode-server\src\core\status-bar\index.ts
 * 怎么可能会有bug！！！
 */
import { getExtensionConfigFullPath } from "@/utils/tools";
import * as vscode from "vscode";
import type { Register } from "../types";
import type { BaseStatusButton } from "./buttons";
import {
  ReloadWindowButton,
  RestartEslintServerButton,
  RestartTsServerButton,
  RestartVueServer,
} from "./buttons";

export class StatusBar implements Register {
  /** 上下文 */
  private readonly context: vscode.ExtensionContext;
  /** 状态栏按钮 */
  private buttons: BaseStatusButton[] = [];
  /** 事件订阅数组 */
  private eventList: Array<vscode.Disposable> = [];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;

    this.register();
    this.subscribeEvent();

    // 首次更新状态栏按钮可见性
    this.updateVisibility();
  }

  /** 根据配置生成状态栏按钮 */
  private generateButtons(): BaseStatusButton[] {
    const buttons: BaseStatusButton[] = [
      new RestartTsServerButton(),
      new RestartEslintServerButton(),
      new RestartVueServer(),
      new ReloadWindowButton(),
    ];

    return buttons;
  }

  /** 注册状态栏按钮 */
  private register(): void {
    this.buttons = this.generateButtons();
  }

  /** 取消注册状态栏按钮 */
  private unregister(): void {
    this.buttons.forEach((button) => button.dispose());
    this.buttons = [];
  }

  /** 更新状态栏按钮的可见性 */
  private updateVisibility() {
    console.log(12937131, this.buttons);
    this.buttons.forEach((btn) => btn.updateVisibility());
  }

  /** 事件订阅 */
  private subscribeEvent() {
    // 当活动文本编辑器发生变化时触发，例如用户从一个文件切换到另一个文件
    const activeTextEditorListener = vscode.window.onDidChangeActiveTextEditor(
      this.updateVisibility
    );
    this.context.subscriptions.push(activeTextEditorListener);
    this.eventList.push(activeTextEditorListener);

    // 当文本编辑器中的选区发生变化时触发，例如用户移动光标或选择文本
    const textEditorSelectionListener =
      vscode.window.onDidChangeTextEditorSelection(this.updateVisibility);
    this.context.subscriptions.push(textEditorSelectionListener);
    this.eventList.push(textEditorSelectionListener);

    // 当一个文档被关闭时触发
    const textDocumentCloseListener = vscode.workspace.onDidCloseTextDocument(
      this.updateVisibility
    );
    this.context.subscriptions.push(textDocumentCloseListener);
    this.eventList.push(textDocumentCloseListener);

    // 当一个文档被打开时触发
    const textDocumentOpenListener = vscode.workspace.onDidOpenTextDocument(
      this.updateVisibility
    );
    this.context.subscriptions.push(textDocumentOpenListener);
    this.eventList.push(textDocumentOpenListener);

    // 监听配置变化
    const configChangeListener = vscode.workspace.onDidChangeConfiguration(
      (e) => {
        const affectsEnableRestartTsServer = e.affectsConfiguration(
          getExtensionConfigFullPath("restartTsServer")
        );
        const affectsEnableRestartEslintServer = e.affectsConfiguration(
          getExtensionConfigFullPath("restartEslintServer")
        );
        const affectsEnableRestartVueServer = e.affectsConfiguration(
          getExtensionConfigFullPath("restartVueServer")
        );
        const affectsEnableReloadWindow = e.affectsConfiguration(
          getExtensionConfigFullPath("reloadWindow")
        );
        const isAffected =
          affectsEnableRestartTsServer ||
          affectsEnableRestartEslintServer ||
          affectsEnableRestartVueServer ||
          affectsEnableReloadWindow;

        if (isAffected) {
          this.updateVisibility();
        }
      }
    );
    this.context.subscriptions.push(configChangeListener);
    this.eventList.push(configChangeListener);
  }

  /** 取消事件订阅 */
  private unsubscribeEvent() {
    if (this.eventList.length === 0) {
      return;
    }

    // 过滤
    const newSubscriptions = this.context.subscriptions.filter((disposable) => {
      return !this.eventList.includes(disposable);
    });
    this.context.subscriptions.splice(
      0,
      this.context.subscriptions.length,
      ...newSubscriptions
    );

    // 取消订阅
    this.eventList.forEach((disposable) => disposable.dispose());
    this.eventList = [];
  }

  public dispose() {
    this.unregister();
    this.unsubscribeEvent();
  }
}
