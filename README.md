# restart-vscode-server

vscode一个用于重启服务的插件，支持一下功能：

1. 重启vscode服务
2. 重启ts服务
3. 重启eslint服务
4. 重启Vue服务

每个功能都有对应的配置，可以通过插件设置进行启用或禁用。

## 预览

![左侧状态按钮](./docs/images/左侧状态按钮.png)

![右侧状态按钮](./docs/images/右侧状态按钮.png)

## 插件设置

VSCode设置中搜索：`restart-vscode-server`

![插件设置](./docs/images/插件设置.png)

也可以json格式进行配置：

```json
{
  "restart-vscode-server.enableReloadWindow": false,
  "restart-vscode-server.enableRestartEslintServer": false,
  "restart-vscode-server.enableRestartTsServer": false,
  "restart-vscode-server.enableRestartVueServer": false
}
```

## 相关资料

1. vscode内置图标：[codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
2. 重启ts和eslint服务插件：[Restart TS/ESLint Server](https://marketplace.visualstudio.com/items?itemName=acoreyj.restart-ts-eslint-server)
3. 重启vscode插件：[Reload](https://marketplace.visualstudio.com/items?itemName=natqe.reload)
4. 插件发布网站：[manage](https://marketplace.visualstudio.com/manage)

## 鸣谢

感谢 Restart TS/ESLint Server 与 Reload 插件的作者，本插件参考了他们的实现，并在此基础上进行了改进。
