/*
 * @Author: mulingyuer
 * @Date: 2025-07-16 09:56:38
 * @LastEditTime: 2025-07-16 10:12:34
 * @LastEditors: mulingyuer
 * @Description: 重启vscode按钮
 * @FilePath: \restart-vscode-server\src\status-bar-button\ReloadWindowButton.ts
 * 怎么可能会有bug！！！
 */
import { BaseStatusButton } from "./BaseButton";
import * as vscode from "vscode";

export class ReloadWindowButton extends BaseStatusButton {
  constructor() {
    super({
      alignment: vscode.StatusBarAlignment.Right,
      priority: 0,
      command: "workbench.action.reloadWindow",
      text: "重启",
      tooltip: "重启 VSCode",
    });
  }

  protected shouldShow(): boolean {
    return true;
  }
}
