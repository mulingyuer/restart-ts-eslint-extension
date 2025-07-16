/*
 * @Author: mulingyuer
 * @Date: 2025-07-16 09:56:38
 * @LastEditTime: 2025-07-16 17:02:55
 * @LastEditors: mulingyuer
 * @Description: 重启vscode按钮
 * @FilePath: \restart-vscode-server\src\core\status-bar\buttons\ReloadWindowButton.ts
 * 怎么可能会有bug！！！
 */
import { getExtensionConfig } from "@/utils/tools";
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
    const config = getExtensionConfig();

    return (config.get("enableReloadWindow") as boolean) ?? true;
  }
}
