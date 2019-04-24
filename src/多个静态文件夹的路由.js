// 修改静态文件的 URL
/* 通常情况下，我们会把站点的静态文件 URL 路径直接挂在域名后面，
例如：jokes.edu 站点中的 jokes.txt 文件 URL 样式应该是 jokes.edu/jokes.txt 。

当然，你可可以按照自己的习惯给这些静态文件提供 URL 。
例如，将一些无序但有趣的图片存放在文件夹 offensive 中并将其中图片的 URL 设置为 jokes.edu/offensive/p… 这种形式。那么该样式 URL 如何实现呢？

在 Express 中，我们可以使用指定前缀的中间件来对静态文件  
URL 进行自定义。所以上面问题的代码实现如下： */

// ... 
var photoPath = path.resolve(__dirname, "offensive-photos-folder");
app.use("/offensive", express.static(photoPath));
// ...


// 多个静态文件夹的路由
/*
实际上砸真实项目中可能户存在多个静态文件夹，
例如：一个存放 CSS 等公用文件的 public 文件夹，一个存放用户上传文件的 user_uploads 文件夹。那么对于这种情况又该如何处理呢？

首先 epxress.static 本身作为中间件是可以在代码中多次调用的： 
 */
// ...
var publiscPath = path.resolve(__dirname, "public");
var userUploadPath = path.resove(__dirname, "user_uploads");
app.use("/public", express.static(publicPath));
app.use("/uploads", express.static(userUploadsPath));
// ...