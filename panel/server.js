
/*
 * @Author: Jerrykuku https://github.com/jerrykuku
 * @Date: 2021-1-8
 * @Version: v0.0.2
 * @thanks: FanchangWang https://github.com/FanchangWang
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var { execSync, exec } = require('child_process');
const { createProxyMiddleware } = require('http-proxy-middleware');
const util = require('./util');
const shareCode = require('./shareCode');


var rootPath = process.env.JD_DIR;
// config.sh 文件所在目录
var confFile = path.join(rootPath, 'config/config.sh');
// config.sample.sh 文件所在目录
var sampleFile = path.join(rootPath, 'sample/config.sample.sh');
// crontab.list 文件所在目录
var crontabFile = path.join(rootPath, 'config/crontab.list');
// config.sh 文件备份目录
var confBakDir = path.join(rootPath, 'config/bak/');
// auth.json 文件目录
var authConfigFile = path.join(rootPath, 'config/auth.json');
// Share Code 文件目录
var shareCodeDir = path.join(rootPath, 'log/jd_get_share_code/');
// diy.sh 文件目录
var diyFile = path.join(rootPath, 'config/diy.sh');
// 日志目录
var logPath = path.join(rootPath, 'log/');
// 脚本目录
var ScriptsPath = path.join(rootPath, 'scripts/');

var authError = "错误的用户名密码，请重试";
var loginFaild = "请先登录!";

var configString = "config sample crontab shareCode diy";

var app = express();
// gzip压缩
app.use(compression({ level: 6, filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(session({
  secret: 'secret',
  name: `connect.${Math.random()}`,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 备份 config.sh 文件
 */
function bakConfFile(file) {
  mkdirConfigBakDir();
  let date = new Date();
  let bakConfFileName = confBakDir + file + '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getMilliseconds();
  let oldConfContent = "";
  switch (file) {
    case "config.sh":
      oldConfContent = util.getFileContentByName(confFile);
      fs.writeFileSync(bakConfFileName, oldConfContent);
      break;
    case "crontab.list":
      oldConfContent = util.getFileContentByName(crontabFile);
      fs.writeFileSync(bakConfFileName, oldConfContent);
      break;
    case "diy.sh":
      oldConfContent = util.getFileContentByName(diyFile);
      fs.writeFileSync(bakConfFileName, oldConfContent);
      break;
    default:
      break;
  }

}

/**
 * 将 post 提交内容写入 config.sh 文件（同时备份旧的 config.sh 文件到 bak 目录）
 * @param content
 */
function saveNewConf(file, content) {
  bakConfFile(file);
  switch (file) {
    case "config.sh":
      fs.writeFileSync(confFile, content);
      break;
    case "crontab.list":
      fs.writeFileSync(crontabFile, content);
      execSync('crontab ' + crontabFile);
      break;
    case "diy.sh":
      fs.writeFileSync(diyFile, content);
      break;
    default:
      break;
  }
}

/**
* 检查 config.sh 以及 config.sample.sh 文件是否存在
*/
function checkConfigFile() {
  if (!fs.existsSync(confFile)) {
    console.error('脚本启动失败，config.sh 文件不存在！');
    process.exit(1);
  }
  if (!fs.existsSync(sampleFile)) {
    console.error('脚本启动失败，config.sample.sh 文件不存在！');
    process.exit(1);
  }
}

/**
 * 检查 config/bak/ 备份目录是否存在，不存在则创建
 */
function mkdirConfigBakDir() {
  if (!fs.existsSync(confBakDir)) {
    fs.mkdirSync(confBakDir);
  }
}

// ttyd proxy
app.use('/shell', createProxyMiddleware({
  target: 'http://localhost:7681',
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/shell': '/',
  },
  onProxyReq(proxyReq, req, res) {
    if (!req.session.loggedin) {
      res.redirect('/');
    }
  }
}));

/**
 * 登录页面
 */
app.get('/', function (request, response) {
  if (request.session.loggedin) {
    response.redirect('./home');
  } else {
    response.sendFile(path.join(__dirname + '/public/auth.html'));
  }
});

/**
 * 用户名密码
 */
app.get('/changepwd', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/pwd.html'));
  } else {
    response.redirect('/');
  }
});

/**
 * terminal
 */
app.get('/terminal', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/terminal.html'));
  } else {
    response.redirect('/');
  }
});


/**
 * 获取二维码链接
 */

app.get('/qrcode', function (request, response) {
  if (request.session.loggedin) {
    (async () => {
      try {
        await util.step1();
        const qrurl = await util.step2();
        if (qrurl != 0) {
          response.send({ err: 0, qrcode: qrurl });
        } else {
          response.send({ err: 1, msg: "错误" });
        }
      } catch (err) {
        response.send({ err: 1, msg: err });
      }
    })();
  } else {
    response.send({ err: 1, msg: loginFaild });
  }
})

/**
 * 获取返回的cookie信息
 */

app.get('/cookie', function (request, response) {
  if (request.session.loggedin) {
    (async () => {
      try {
        const cookie = await util.checkLogin();
        if (cookie.body.errcode == 0) {
          let ucookie = util.getCookie(cookie);
          response.send({ err: 0, cookie: ucookie });
        } else {
          response.send({ err: cookie.body.errcode, msg: cookie.body.message });
        }
      } catch (err) {
        response.send({ err: 1, msg: err });
      }
    })();
  } else {
    response.send({ err: 1, msg: loginFaild });
  }
})

/**
 * 获取各种配置文件api
 */

app.get('/api/config/:key', function (request, response) {
  if (request.session.loggedin) {
    if (configString.indexOf(request.params.key) > -1) {
      switch (request.params.key) {
        case 'config':
          content = util.getFileContentByName(confFile);
          break;
        case 'sample':
          content = util.getFileContentByName(sampleFile);
          break;
        case 'crontab':
          content = util.getFileContentByName(crontabFile);
          break;
        case 'shareCode':
          let shareCodeFile = util.getLastModifyFilePath(shareCodeDir);
          content = util.getFileContentByName(shareCodeFile);
          break;
        case 'diy':
          content = util.getFileContentByName(diyFile);
          break;
        default:
          break;
      }
      response.setHeader("Content-Type", "text/plain");
      response.send(content);
    } else {
      response.send("no config");
    }
  } else {
    response.send(loginFaild);
  }
})

/**
 * 首页 配置页面
 */
app.get('/home', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/home.html'));
  } else {
    response.redirect('/');
  }

});

/**
 * 对比 配置页面
 */
app.get('/diff', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/diff.html'));
  } else {
    response.redirect('/');
  }

});

/**
 * Share Code 页面
 */
app.get('/shareCode', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/shareCode.html'));
  } else {
    response.redirect('/');
  }

});

/**
 * crontab 配置页面
 */
app.get('/crontab', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/crontab.html'));
  } else {
    response.redirect('/');
  }

});

/**
 * 自定义脚本 页面
 */
app.get('/diy', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/diy.html'));
  } else {
    response.redirect('/');
  }

});

/**
 * 手动执行脚本 页面
 */
app.get('/run', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/run.html'));
  } else {
    response.redirect('/');
  }
});

app.post('/runCmd', function (request, response) {
  if (request.session.loggedin) {
    if (!request.body.cmd ||
      (!request.body.cmd.startsWith('bash ') &&
        !request.body.cmd.startsWith('cat ') &&
        !request.body.cmd === 'ps')) {
      response.send({ err: 1, msg: '需要执行的命令暂不支持' });
      return;
    }
    const cmd = `cd ${rootPath};` + request.body.cmd;
    const delay = request.body.delay || 0;

    // console.log('before exec');
    // exec maxBuffer 20MB
    exec(cmd, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
      // console.log(error, stdout, stderr);
      // 根据传入延时返回数据，有时太快会出问题
      setTimeout(() => {
        if (error) {
          console.error(`执行的错误: ${error}`);
          response.send({ err: 1, msg: stdout ? `${stdout}${error}` : `${error}` });
          return;

        }

        if (stdout) {
          // console.log(`stdout: ${stdout}`)
          response.send({ err: 0, msg: `${stdout}` });
          return;

        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          response.send({ err: 1, msg: `${stderr}` });
          return;
        }

        response.send({ err: 0, msg: '执行结束，无结果返回。' });
      }, delay);
    });
  } else {
    response.redirect('/');
  }
});

/**
 * 使用jsName获取最新的日志
 */
app.get('/runLog/:jsName', function (request, response) {
  if (request.session.loggedin) {
    const jsName = request.params.jsName;
    let shareCodeFile = util.getLastModifyFilePath(path.join(rootPath, `log/${jsName}/`));
    if (jsName === 'jlog') {
      shareCodeFile = path.join(rootPath, `log/${jsName}.log`)
    }

    if (shareCodeFile) {
      const content = util.getFileContentByName(shareCodeFile);
      response.setHeader("Content-Type", "text/plain");
      response.send(content);
    } else {
      response.send("no logs");
    }
  } else {
    response.send(loginFaild);
  }
})


/**
 * auth
 */
app.post('/auth', function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  fs.readFile(authConfigFile, 'utf8', function (err, data) {
    if (err) console.log(err);
    var con = JSON.parse(data);
    if (username && password) {
      if (username == con.user && password == con.password) {
        request.session.loggedin = true;
        request.session.username = username;
        response.send({ err: 0 });
      } else {
        response.send({ err: 1, msg: authError });
      }
    } else {
      response.send({ err: 1, msg: "请输入用户名密码!" });
    }
  });

});

/**
 * change pwd
 */
app.post('/changepass', function (request, response) {
  if (request.session.loggedin) {
    let username = request.body.username;
    let password = request.body.password;
    let config = {
      user: username,
      password: password
    }
    if (username && password) {
      fs.writeFile(authConfigFile, JSON.stringify(config), function (err) {
        if (err) {
          response.send({ err: 1, msg: "写入错误请重试!" });
        } else {
          response.send({ err: 0, msg: "更新成功!" });
        }
      });
    } else {
      response.send({ err: 1, msg: "请输入用户名密码!" });
    }

  } else {
    response.send(loginFaild);

  }
});

/**
 * change pwd
 */
app.get('/logout', function (request, response) {
  request.session.destroy()
  response.redirect('/');

});

/**
 * save config
 */

app.post('/api/save', function (request, response) {
  if (request.session.loggedin) {
    let postContent = request.body.content;
    let postfile = request.body.name;
    saveNewConf(postfile, postContent);
    response.send({ err: 0, title: "保存成功! ", msg: "将自动刷新页面查看修改后的 " + postfile + " 文件" });
  } else {
    response.send({ err: 1, title: "保存失败! ", msg: loginFaild });
  }

});

/**
 * 日志查询 页面
 */
app.get('/log', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/tasklog.html'));
  } else {
    response.redirect('/');
  }
});

/**
 * 日志列表
 */
app.get('/api/logs', function (request, response) {
  if (request.session.loggedin) {
    var fileList = fs.readdirSync(logPath, 'utf-8');
    var dirs = [];
    var rootFiles = [];
    for (var i = 0; i < fileList.length; i++) {
      var stat = fs.lstatSync(logPath + fileList[i]);
      // 是目录，需要继续
      if (stat.isDirectory()) {
        var fileListTmp = fs.readdirSync(logPath + '/' + fileList[i], 'utf-8');
        fileListTmp.reverse();
        var dirMap = {
          dirName: fileList[i],
          files: fileListTmp
        }
        dirs.push(dirMap);
      } else {
        rootFiles.push(fileList[i]);
      }
    }

    dirs.push({
      dirName: '@',
      files: rootFiles
    });
    var result = { dirs };
    response.send(result);

  } else {
    response.redirect('/');
  }

});

/**
 * 日志文件
 */
app.get('/api/logs/:dir/:file', function (request, response) {
  if (request.session.loggedin) {
    let filePath;
    if (request.params.dir === '@') {
      filePath = logPath + request.params.file;
    } else {
      filePath = logPath + request.params.dir + '/' + request.params.file;
    }
    var content = util.getFileContentByName(filePath);
    response.setHeader("Content-Type", "text/plain");
    response.send(content);
  } else {
    response.redirect('/');
  }

});


/**
 * 删除单个日志文件
 */
app.get('/api/rm_log/:dir/:file', function (request, response) {
  if (request.session.loggedin) {
    let filePath;
    if (request.params.dir === '@') {
      filePath = logPath + request.params.file;
    } else {
      filePath = logPath + request.params.dir + '/' + request.params.file;
    }
    fs.unlink(filePath, function (err) {
      if (err) {
        response.send({ err: 1, msg: "日志文件删除失败!" });
      } else {
        response.send({ err: 0, msg: "日志文件删除成功!" });
      }
    });
  } else {
    response.redirect('/');
  }

});


/**
 * 查看脚本 页面
 */
app.get('/viewScripts', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/public/viewScripts.html'));
  } else {
    response.redirect('/');
  }
});

/**
 * 脚本列表
 */
app.get('/api/scripts', function (request, response) {
  if (request.session.loggedin) {
    var fileList = fs.readdirSync(ScriptsPath, 'utf-8');
    var dirs = [];
    var rootFiles = [];
    var excludeRegExp = /(.git)|(node_modules)|(icon)/;
    for (var i = 0; i < fileList.length; i++) {
      var stat = fs.lstatSync(ScriptsPath + fileList[i]);
      // 是目录，需要继续
      if (stat.isDirectory()) {
        var fileListTmp = fs.readdirSync(ScriptsPath + '/' + fileList[i], 'utf-8');
        fileListTmp.reverse();

        if (excludeRegExp.test(fileList[i])) {
          continue;
        }

        var dirMap = {
          dirName: fileList[i],
          files: fileListTmp
        }
        dirs.push(dirMap);
      } else {
        if (excludeRegExp.test(fileList[i])) {
          continue;
        }

        rootFiles.push(fileList[i]);
      }
    }

    dirs.push({
      dirName: '@',
      files: rootFiles
    });
    var result = { dirs };
    response.send(result);

  } else {
    response.redirect('/');
  }

});

/**
 * 脚本文件
 */
app.get('/api/scripts/:dir/:file', function (request, response) {
  if (request.session.loggedin) {
    let filePath;
    if (request.params.dir === '@') {
      filePath = ScriptsPath + request.params.file;
    } else {
      filePath = ScriptsPath + request.params.dir + '/' + request.params.file;
    }
    var content = util.getFileContentByName(filePath);
    response.setHeader("Content-Type", "text/plain");
    response.send(content);
  } else {
    response.redirect('/');
  }

});


/**
 * 获取京东到家互助码
 */
app.get('/api/sharecode/jddj_fruit', function(req, res) {
  const page = req.query.page || '1';
  const content = shareCode.createJddjFruitCodeTxt(page);
  console.log(`京东到家互助码: ${content}`);
  res.setHeader("Content-Type", "text/plain");
  res.send(content);
});


checkConfigFile()

app.listen(5678, () => {
  console.log('应用正在监听 5678 端口!');
});