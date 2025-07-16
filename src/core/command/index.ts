/*
 * @Author: mulingyuer
 * @Date: 2025-07-16 14:21:01
 * @LastEditTime: 2025-07-16 16:34:31
 * @LastEditors: mulingyuer
 * @Description: 指令核心代码
 * @FilePath: \restart-vscode-server\src\core\command\index.ts
 * 怎么可能会有bug！！！
 */
import {
  getExtensionCommand,
  getExtensionConfig,
  getExtensionConfigFullPath,
} from "@/utils/tools";
import * as vscode from "vscode";
import type { Register } from "../types";
import {
  reloadWindow,
  restartEslintServer,
  restartTsServer,
  restartVueServer,
} from "./command.helper";

export class Command implements Register {
  /** 指令数组 */
  private commandList: Array<vscode.Disposable> = [];
  /** 插件配置 */
  private config: vscode.WorkspaceConfiguration;
  /** 上下文 */
  private readonly context: vscode.ExtensionContext;
  /** 事件订阅数组 */
  private eventList: Array<vscode.Disposable> = [];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.config = getExtensionConfig();

    this.createCommand();
    this.subscribeEvent();
  }

  /** 根据配置生成指令 */
  private generateCommand() {
    const commandList: Array<vscode.Disposable> = [];

    if (this.config.get("enableRestartTsServer")) {
      commandList.push(
        vscode.commands.registerCommand(
          getExtensionCommand("restartTsServer"),
          restartTsServer
        )
      );
    }

    if (this.config.get("enableRestartEslintServer")) {
      commandList.push(
        vscode.commands.registerCommand(
          getExtensionCommand("restartEslintServer"),
          restartEslintServer
        )
      );
    }

    if (this.config.get("enableRestartVueServer")) {
      commandList.push(
        vscode.commands.registerCommand(
          getExtensionCommand("restartVueServer"),
          restartVueServer
        )
      );
    }

    if (this.config.get("enableReloadWindow")) {
      commandList.push(
        vscode.commands.registerCommand(
          getExtensionCommand("reloadWindow"),
          reloadWindow
        )
      );
    }

    return commandList;
  }

  /** 创建指令 */
  private createCommand() {
    this.config = getExtensionConfig();
    this.commandList = this.generateCommand();
    this.context.subscriptions.push(...this.commandList);
  }

  /** 销毁指令 */
  private disposeCommand() {
    if (this.commandList.length === 0) {
      return;
    }

    // 过滤掉已经销毁的指令
    const newSubscriptions = this.context.subscriptions.filter((disposable) => {
      return !this.commandList.includes(disposable);
    });
    this.context.subscriptions.splice(
      0,
      this.context.subscriptions.length,
      ...newSubscriptions
    );

    // 销毁
    this.commandList.forEach((disposable) => disposable.dispose());
    this.commandList = [];
  }

  /** 事件订阅 */
  private subscribeEvent() {
    const listener = vscode.workspace.onDidChangeConfiguration((e) => {
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
        this.createCommand();
      }
    });

    // 本地存储
    this.eventList.push(listener);
    // 监听配置变化
    this.context.subscriptions.push(listener);
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
    this.disposeCommand();
    this.unsubscribeEvent();
  }
}
