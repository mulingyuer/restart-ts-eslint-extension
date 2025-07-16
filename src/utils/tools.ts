/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 22:04:49
 * @LastEditTime: 2025-07-16 17:06:32
 * @LastEditors: mulingyuer
 * @Description: 工具方法
 * @FilePath: \restart-vscode-server\src\utils\tools.ts
 * 怎么可能会有bug！！！
 */
import * as vscode from "vscode";
import {
  EXTENSION_NAME,
  LEFT_STATUS_BAR_PRIORITY,
  PACKAGE_JSON,
} from "@/constant";

/** 拼接带命名空间的字符串 */
export function joinNamespaceStr(str: string, namespace?: string) {
  namespace = namespace ?? EXTENSION_NAME;

  return `${namespace}.${str}`;
}

/** 通过key获取package中配置的extensionCommands命令 */
export function getExtensionCommand(
  key: keyof (typeof PACKAGE_JSON)["extensionCommands"]
): string {
  return PACKAGE_JSON.extensionCommands[key] ?? "";
}

/** 通过key获取package中配置的extensionConfig配置key */
export function getExtensionConfigFullPath(
  key: keyof (typeof PACKAGE_JSON)["extensionConfigFullPath"]
) {
  return PACKAGE_JSON.extensionConfigFullPath[key] ?? "";
}

/** 获取状态栏按钮优先级，最先调用谁优先级最大 */
export const getStatusBarPriority = (() => {
  let maxPriority = LEFT_STATUS_BAR_PRIORITY;

  return function getStatusBarPriority() {
    return maxPriority--;
  };
})();

/** 获取插件配置 */
export function getExtensionConfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration(EXTENSION_NAME);
}
