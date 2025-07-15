/*
 * @Author: mulingyuer
 * @Date: 2025-07-15 21:27:51
 * @LastEditTime: 2025-07-15 23:24:59
 * @LastEditors: mulingyuer
 * @Description: 重启TypeScript服务按钮
 * @FilePath: \restart-vscode-server\src\status-bar-button\RestartTsServerButton.ts
 * 怎么可能会有bug！！！
 */
import { getExtensionCommand } from "../utils";
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
      command: getExtensionCommand("restartTsServer"),
      text: "重启TS",
    });
  }

  protected async shouldShow(): Promise<boolean> {
    const { activeTextEditor } = vscode.window;
    if (!activeTextEditor?.document) {
      return false;
    }

    // 是否是支持的语言
    if (
      this.SUPPORTED_LANGUAGES.includes(activeTextEditor.document.languageId)
    ) {
      return true;
    }

    // 如果语言不支持，则判断项目中是否有tsconfig.json文件
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return false;
    }
    const tsconfigFiles = await vscode.workspace.findFiles(
      "**/tsconfig.json", // 在工作区中查找 tsconfig.json
      "**/node_modules/**" // 排除 node_modules 文件夹
    );

    return tsconfigFiles.length > 0;
  }
}
