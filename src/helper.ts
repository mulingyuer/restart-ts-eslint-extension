/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 21:53:49
 * @LastEditTime: 2025-07-15 17:03:33
 * @LastEditors: mulingyuer
 * @Description: 帮助函数
 * @FilePath: \restart-vscode-server\src\helper.ts
 * 怎么可能会有bug！！！
 */
import {
  TYPE_SCRIPT_EXTENSION_ID,
  ES_LINT_EXTENSION_ID,
  VUE_EXTENSION_ID,
} from "./constant";
import * as vscode from "vscode";

/** 重启 TypeScript 服务 */
export async function restartTsServer(): Promise<void> {
  try {
    const tsExtension = vscode.extensions.getExtension(
      TYPE_SCRIPT_EXTENSION_ID
    );

    if (!tsExtension?.isActive) {
      vscode.window.showErrorMessage("TypeScript 扩展未激活，请先激活后再重试");
      return;
    }

    await vscode.commands.executeCommand("typescript.restartTsServer");

    // 通知
    vscode.window.showInformationMessage("TypeScript 服务已重启");
  } catch (error) {
    vscode.window.showErrorMessage("TypeScript 服务重启失败，请检查控制台输出");
    console.error(error);
  }
}

/** 重启 ESLint 服务 */
export async function restartEslintServer(): Promise<void> {
  try {
    const eslintExtension =
      vscode.extensions.getExtension(ES_LINT_EXTENSION_ID);

    if (!eslintExtension?.isActive) {
      vscode.window.showErrorMessage("ESLint 扩展未激活，请先激活后再重试");
      return;
    }

    await vscode.commands.executeCommand("eslint.restart");

    // 通知
    vscode.window.showInformationMessage("ESLint 服务已重启");
  } catch (error) {
    vscode.window.showErrorMessage("ESLint 服务重启失败，请检查控制台输出");
    console.error(error);
  }
}

/** 重启 Vue 服务 */
export async function restartVueServer(): Promise<void> {
  try {
    const vueExtension = vscode.extensions.getExtension(VUE_EXTENSION_ID);

    if (!vueExtension?.isActive) {
      vscode.window.showErrorMessage("Vue 扩展未激活，请先激活后再重试");
      return;
    }

    await vscode.commands.executeCommand("vue.action.restartServer");

    // 通知
    vscode.window.showInformationMessage("Vue 服务已重启");
  } catch (error) {
    vscode.window.showErrorMessage("Vue 服务重启失败，请检查控制台输出");
    console.error(error);
  }
}
