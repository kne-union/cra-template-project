# cra-template-components
初始化一个项目

## 安装

```shell
npx create-react-app project-name --template=@kne/cra-template-project
```

## 注意

由于cra限制，模板不能拿到project-name，初始化完成后需要再手动进行一些修改，后期会替换掉cra

1. package.json

   将project-name替换为实际项目名
    ```json
    {
      "scripts": {
        "build": "cross-env COMPONENTS_NAME=project-name MODULES_DEV_PUBLIC_URL=/project-name  craco build"
      }
    }
    ```
