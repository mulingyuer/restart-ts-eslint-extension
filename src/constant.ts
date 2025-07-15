/*
 * @Author: mulingyuer
 * @Date: 2025-07-14 21:55:20
 * @LastEditTime: 2025-07-15 16:16:27
 * @LastEditors: mulingyuer
 * @Description: 常量
 * @FilePath: \restart-vscode-server\src\constant.ts
 * 怎么可能会有bug！！！
 */
import packageJson from "../package.json";

/** packageJson数据 */
export const PACKAGE_JSON = packageJson;

/** 扩展名称（命名空间） */
export const EXTENSION_NAME = PACKAGE_JSON.name;

// 扩展ID
export const TYPE_SCRIPT_EXTENSION_ID = "vscode.typescript-language-features";
export const ES_LINT_EXTENSION_ID = "dbaeumer.vscode-eslint";
export const VUE_EXTENSION_ID = "Vue.volar";
