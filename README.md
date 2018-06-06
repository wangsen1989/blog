### 目录结构
```

|-- dist    打包目录
├── src
│   └── server    后端node server代码
│   └── client    前端代码
│       ├── components     基础组件
│       ├── container      页面容器组件
│       ├── utils          公共方法
│       └── redux          状态管理
│           ├── action     Action、ActionType的定义
│           ├── reducer    业务状态处理
└── .babelrc
└── .gitignore
└── index.html             html模板
└── package.json
└── README.md
└── webpack.dev.conf.js    
└── webpack.pro.conf.js  

  
```

### 首次打开项目，需要安装依赖
```
npm install
```

### 启动前端
```
npm run client
```

### 启动后端
###### 用户头像存放地，建在blog项目平级的目录：imageserver目录，此目录不会随项目迭代
###### 若imageserver文件目录不存在，将自动创建目录,
```
npm run server
```

### 发布编译
```
npm run build
```
