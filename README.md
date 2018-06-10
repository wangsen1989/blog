### 目录结构
```

|-- dist  打包目录
├── src
│   |── client 前端代码
│   |         |
│   |         ├── index.jsx      前端入口文件
│   |         ├── components     基础组件
│   |         ├── container      页面容器组件
│   |         ├── utils          公共方法
│   |         └── redux          状态管理
│   |                 ├── action     Action、ActionType的定义
│   |                 ├── reducer    业务状态处理
│   |
│   |
│   |
|   |── server 后端node代码
│             |
│             ├── index.js       后端入口文件
│             ├── model          数据库模型
│             ├── router         后端路由
|
|
|
└── .babelrc
└── .gitignore
└── index.html 模板
└── package.json
└── README.md
└── webpack.dev.conf.js    
└── webpack.pro.conf.js  

  
```

>### 👉预览地址：[请点我！在线预览，手机浏览或切换浏览器移动调试](http://blog.wangjia.club)
![](http://chuantu.biz/t6/327/1528619511x-1566688419.png)
![](http://chuantu.biz/t6/327/1528619746x-1566688419.png)
![](http://chuantu.biz/t6/327/1528619837x-1566688419.png)

### 需要安装MongoDB后，并执行下面命令
```
>sudo mongod
```

### 首次打开项目，需要安装依赖
```
>npm install
```

### 启动前端
```
>npm run client
```

### 启动后端
###### 用户头像存放地，建在blog项目平级的目录：imageserver目录，此目录不会随项目迭代
###### 若imageserver文件目录不存在，将自动创建目录,
```
>npm run server
```

### 发布编译
```
>npm run build
```


