/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 22:04:49
 * @LastEditTime: 2025-07-14 22:08:03
 * @LastEditors: mulingyuer
 * @Description: 工具方法
 * @FilePath: \restart-ts-eslint\src\utils.ts
 * 怎么可能会有bug！！！
 */
import { EXTENSION_NAME } from "./constant";

/** 拼接带命名空间的字符串 */
export function joinNamespaceStr(str: string, namespace?: string) {
  namespace = namespace ?? EXTENSION_NAME;

  return `${namespace}.${str}`;
}
