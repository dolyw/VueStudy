# SBAPI

#### 项目介绍

1. SpringBoot整合Mybatis + 分页插件PageHelper + 通用Mapper插件 + Maven集成Mybatis Geneator示例
2. RESTful API

#### 软件架构

1. SpringBoot + FreeMarker + Mybatis + PageHelper + 通用Mapper

#### 安装教程

1. 解压后执行src\main\resources\sql\MySQL.sql脚本创建数据库和表
2. 在pom.xml这一级目录(即项目根目录下)的命令行窗口执行(前提是配置了mvn)(IDEA可以直接在Maven窗口Plugins中双击执行)，创建Entity和Mapper后正常启动即可
```
mvn mybatis-generator:generate
```

#### 使用说明

1. SpringBoot整合系列

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
