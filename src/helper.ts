/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 21:53:49
 * @LastEditTime: 2025-07-14 21:58:38
 * @LastEditors: mulingyuer
 * @Description: 帮助函数
 * @FilePath: \restart-ts-eslint\src\helper.ts
 * 怎么可能会有bug！！！
 */
import { TYPE_SCRIPT_EXTENSION_ID, ES_LINT_EXTENSION_ID } from "./constant";
import * as vscode from "vscode";

/** 重启 TypeScript 服务 */
export async function restartTsServer(): Promise<void> {
  const tsExtension = vscode.extensions.getExtension(TYPE_SCRIPT_EXTENSION_ID);

  if (!tsExtension?.isActive) {
    vscode.window.showErrorMessage("TypeScript 扩展未激活，请先激活后再重试");
    return;
  }

  await vscode.commands.executeCommand("typescript.restartTsServer");
}
