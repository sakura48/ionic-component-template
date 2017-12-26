#!/usr/bin/env node

console.log('==================== Chin_you-cliへ　ようこそ ====================')
console.log('初期化 スタート')

const fs = require('fs')
const path = require('path')

const BASE_PATH = process.cwd()

let config = {}

config.name = process.argv.slice(2)[0]
config.path = BASE_PATH + '/' + config.name

console.log('component name is ' + config.name)
console.log('path is ' + config.path)

function copyTemplate(from, to) {
    if (!fs.existsSync(config.path)) {
        fs.mkdirSync(config.path)
    }
    read(from, to)
}

function read(from, to) {
    from = path.join(__dirname, 'templates', from)
    fs.readFile(from, function (err, data) {
        if (!err) {
            write(to, data.toString().replace(/templates/g, config.name))
        }
    })
}

function write(path, str) {
    fs.writeFile(path, str, (error) => {
        if (error) {
            console.log('writeFile error :' + error)
        } else {
            console.log(path + ' done')
        }
    })
}

copyTemplate('templates.html', config.path + '/' + config.name + '.html')
copyTemplate('templates.scss', config.path + '/' + config.name + '.scss')
copyTemplate('templates.ts', config.path + '/' + config.name + '.ts')
