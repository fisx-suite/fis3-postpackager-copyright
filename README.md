fis3-postpackager-copyright
========

> A plugin for fis3 to prepend copyright to release files


## How to use
 
### Install
 
```shell
npm install fis3-postpackager-copyright -g
```

### Add configure to `fis-conf.js`

默认，`css`、`js` 文件会添加版权声明。

```javasciprt
fis.match('::package', {
    postpackager: fis.plugin('copyright', {
        copyright: '/*your copyright*/'
        // copyright: function () {
        //     return '/*your copyright*/';
        // }
        // copyright: {
        //     file: 'xx/xx', // copyright file template
        //     data: {} // the data to apply to template, template variable syntax: ${xx}
        // }
    })
});
```

指定某些文件输出或不输出版权声明：

```javasciprt
fis.match('/dep/**.{js,css}', {
    copyright: false // don't prepend the copyright to dependence files
});
```

