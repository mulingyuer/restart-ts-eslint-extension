/*
 * @Author: mulingyuer
 * @Date: 2025-07-15 21:30:20
 * @LastEditTime: 2025-07-16 10:10:22
 * @LastEditors: mulingyuer
 * @Description: 重启ESLint服务按钮
 * @FilePath: \restart-vscode-server\src\status-bar-button\RestartEslintServerButton.ts
 * 怎么可能会有bug！！！
 */
import { BaseStatusButton } from "./BaseButton";
import * as vscode from "vscode";
import { getExtensionCommand, getStatusBarPriority } from "../utils";
import { ES_LINT_EXTENSION_ID } from "../constant";

export class RestartEslintServerButton extends BaseStatusButton {
  constructor() {
    super({
      alignment: vscode.StatusBarAlignment.Left,
      priority: getStatusBarPriority(),
      command: getExtensionCommand("restartEslintServer"),
      icon: "debug-restart",
      text: "重启ESLint",
    });
  }

  protected async shouldShow(): Promise<boolean> {
    // eslint插件是否激活
    const eslintExtension =
      vscode.extensions.getExtension(ES_LINT_EXTENSION_ID);
    if (!eslintExtension?.isActive) {
      return false;
    }

    // 如果插件已激活，则判断是否有eslint配置文件
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return false;
    }
    const eslintConfigFiles = await vscode.workspace.findFiles(
      "**/{.eslintrc,.eslintrc.json,.eslintrc.js,.eslintrc.yaml,.eslintrc.yml,.eslintrc.cjs,eslint.config.js,eslint.config.mjs,eslint.config.cjs,eslint.config.ts,eslint.config.mts,eslint.config.cts}", // 支持的 ESLint 配置文件类型
      "**/node_modules/**" // 排除 node_modules 文件夹
    );

    return eslintConfigFiles.length > 0;
  }
}
