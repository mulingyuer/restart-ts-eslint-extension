/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 22:04:49
 * @LastEditTime: 2025-07-15 16:37:47
 * @LastEditors: mulingyuer
 * @Description: 工具方法
 * @FilePath: \restart-vscode-server\src\utils.ts
 * 怎么可能会有bug！！！
 */
import { EXTENSION_NAME, PACKAGE_JSON } from "./constant";

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
