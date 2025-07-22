/*
 * @Author: mulingyuer
 * @Date: 2025-07-15 21:30:20
 * @LastEditTime: 2025-07-22 11:07:45
 * @LastEditors: mulingyuer
 * @Description: 重启ESLint服务按钮
 * @FilePath: \restart-vscode-server\src\core\status-bar\buttons\RestartEslintServerButton.ts
 * 怎么可能会有bug！！！
 */
import { BaseStatusButton } from "./BaseButton";
import * as vscode from "vscode";
import {
  getExtensionCommand,
  getExtensionConfig,
  getStatusBarPriority,
} from "@/utils/tools";
import { ES_LINT_EXTENSION_ID } from "@/constant";

export class RestartEslintServerButton extends BaseStatusButton {
  /** 状态缓存，防止重复触发耗时的判断 */
  private showStatus: boolean | null = null;

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
    try {
      const config = getExtensionConfig();
      const enable = config.get("enableRestartEslintServer") as boolean;
      if (!enable) {
        return false;
      }

      // 使用缓存，减少重复判断
      if (this.showStatus !== null) {
        return this.showStatus;
      }

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
      this.showStatus = eslintConfigFiles.length > 0;

      return this.showStatus;
    } catch {
      return false;
    }
  }
}
