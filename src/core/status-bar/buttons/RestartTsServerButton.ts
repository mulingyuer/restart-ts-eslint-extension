/*
 * @Author: mulingyuer
 * @Date: 2025-07-15 21:27:51
 * @LastEditTime: 2025-07-16 17:04:46
 * @LastEditors: mulingyuer
 * @Description: 重启TypeScript服务按钮
 * @FilePath: \restart-vscode-server\src\core\status-bar\buttons\RestartTsServerButton.ts
 * 怎么可能会有bug！！！
 */
import {
  getExtensionCommand,
  getExtensionConfig,
  getStatusBarPriority,
} from "@/utils/tools";
import { BaseStatusButton } from "./BaseButton";
import * as vscode from "vscode";

export class RestartTsServerButton extends BaseStatusButton {
  /** 支持的语言 */
  private readonly SUPPORTED_LANGUAGES = [
    "typescript",
    "typescriptreact",
    "javascript",
    "javascriptreact",
    "vue",
    "svelte",
  ];

  constructor() {
    super({
      alignment: vscode.StatusBarAlignment.Left,
      priority: getStatusBarPriority(),
      command: getExtensionCommand("restartTsServer"),
      icon: "debug-restart",
      text: "重启TS",
    });
  }

  protected async shouldShow(): Promise<boolean> {
    try {
      const config = getExtensionConfig();
      const enable = config.get("enableRestartTsServer") as boolean;
      if (!enable) {
        return false;
      }

      const { activeTextEditor } = vscode.window;
      if (activeTextEditor?.document) {
        if (
          this.SUPPORTED_LANGUAGES.includes(
            activeTextEditor.document.languageId
          )
        ) {
          return true;
        }
      }

      // 检查项目中是否有tsconfig.json文件
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return false;
      }
      const tsconfigFiles = await vscode.workspace.findFiles(
        "**/tsconfig.json", // 在工作区中查找 tsconfig.json
        "**/node_modules/**" // 排除 node_modules 文件夹
      );

      return tsconfigFiles.length > 0;
    } catch {
      return false;
    }
  }
}
