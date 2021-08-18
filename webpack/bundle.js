const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const generateDep = filename => {
  const content = fs.readFileSync(filename, 'utf8')

  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  const dependencies = {}

  traverse(ast, {
    ImportDeclaration ({ node }) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value) // 相对路径
      dependencies[node.source.value] = newFile
    }
  })

  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })

  return {
    filename,
    dependencies,
    code
  }
}


const generateDepMap = (entry) => {
  const entryModule = generateDep(entry)

  const graphArray = [entryModule]

  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    for (const f in dependencies) {
      graphArray.push(generateDep(dependencies[f]))
    }
  }

  const graph = {}

  graphArray.forEach(simple => {
    graph[simple.filename] = {
      dependencies: simple.dependencies,
      code: simple.code
    }
  })

  return graph
}

const generateCode = (entry) => {
  const graph = JSON.stringify(generateDepMap(entry))
  return `
      (function(graph) {
          //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
          function require(module) {
              //localRequire的本质是拿到依赖包的exports变量
              function localRequire(relativePath) {
                  return require(graph[module].dependencies[relativePath]);
              }
              var exports = {};
              (function(require, exports, code) {
                  eval(code);
              })(localRequire, exports, graph[module].code);
              return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
          }
          require('${entry}')
      })(${graph})`
}


const writeCode = code => {
  const dir = 'dist'
  const bundlePath = path.join(dir, 'bundle.js')

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, { recursive: false }, (err) => {
      if (err) throw err
    })

    fs.writeFileSync(`${bundlePath}`, code, "utf-8");
  } else {
    fs.writeFileSync(`${bundlePath}`, code, "utf-8");
  }

}


writeCode(generateCode('./src/console.js'))
