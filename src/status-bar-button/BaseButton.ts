/*
 * @Author: mulingyuer
 * @Date: 2025-07-15 21:20:32
 * @LastEditTime: 2025-07-15 22:40:16
 * @LastEditors: mulingyuer
 * @Description: 状态按钮基类
 * @FilePath: \restart-vscode-server\src\status-bar-button\baseButton.ts
 * 怎么可能会有bug！！！
 */
import * as vscode from "vscode";
import { EXTENSION_NAME } from "../constant";

export interface BaseStatusButtonOptions {
  /** 位置 */
  alignment: vscode.StatusBarAlignment;
  /** 优先级 */
  priority?: number;
  /** 指令 */
  command: string;
  /** 显示的图标 */
  icon?: string;
  /** 显示的文本 */
  text: string;
}

export abstract class BaseStatusButton {
  /** 按钮实例 */
  protected button: vscode.StatusBarItem;

  constructor(options: BaseStatusButtonOptions) {
    this.button = vscode.window.createStatusBarItem(
      options.alignment,
      options.priority ?? 1
    );
    this.button.command = options.command;
    options.icon = options.icon ?? "debug-restart";
    this.button.text = `$(${options.icon}) ${options.text}`;
  }

  public getButton(): vscode.StatusBarItem {
    return this.button;
  }

  public show(): void {
    this.button.show();
  }

  public hide(): void {
    this.button.hide();
  }

  /** 是否显示按钮 */
  protected abstract shouldShow(): boolean | Promise<boolean>;

  /** 更新按钮显示 */
  public async updateVisibility() {
    try {
      const visible = await this.shouldShow();
      if (visible) {
        this.show();
      } else {
        this.hide();
      }
    } catch (error) {
      this.hide();

      console.error(`${EXTENSION_NAME} 更新按钮显示出错：`, error);
    }
  }
}
