/**
 * @file 添加版权声明的插件
 * @author sparklewhy@gmail.com
 */

'use strict';

/**
 * 渲染给定的模板
 *
 * @param {string} tpl 要渲染的模板
 * @param {Object} data 要渲染的模板数据
 * @return {string}
 */
function renderTpl(tpl, data) {
    return tpl.replace(/\$\{([^\}]+)\}/, function (match, key) {
        return data[key];
    });
}

/**
 * 插件入口
 *
 * @param {Object} ret 处理的资源信息全集
 * @param {Object} pack 打包信息
 * @param {Object} settings 设置选项
 * @param {Function|Object|string} settings.copyright 要输出的版权声明
 * @param {Object} opt 全局选项
 */
module.exports = exports = function (ret, pack, settings, opt) {
    var fileMap = ret.src;
    var copyright = settings.copyright;
    if (!copyright) {
        return;
    }

    if (fis.util.isFunction(copyright)) {
        copyright = copyright();
    }
    else if (copyright.file) {
        var fs = require('fs');
        copyright = renderTpl(
            fs.readFileSync(copyright.file, 'utf8'),
            copyright.data || {}
        );
    }

    if (copyright.charAt(copyright.length - 1) !== '\n') {
        copyright += '\n';
    }

    Object.keys(fileMap).forEach(function (id) {
        var file = fileMap[id];
        if (file.release === false || file.isPartial || file.copyright === false) {
            return;
        }

        if (file.copyright || file.isJsLike || file.isCssLike) {
            file.setContent(copyright + file.getContent());
        }
    });
};
