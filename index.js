const express = require("express");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const app = express();
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// 配置S3
AWS.config.update({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: config.s3.region,
});

const s3 = new AWS.S3({ endpoint: config.s3.endpoint });

// 确保日志文件目录存在
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

// 添加控制台和文件日志记录
function log(message) {
    // 定义日志文件路径
    const logFile = path.join(
        "logs",
        `${DateTime.now().toFormat("yyyy-MM-dd")}.log`
    );
    console.log(
        `${DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")} - ${message}`
    );
    fs.appendFileSync(
        logFile,
        `${DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")} - ${message}\n`
    );
}

// 处理下载文件请求
app.get("*", (req, res) => {
    const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    const filePath = req.url.replace("/", "");
    const downloadPath = config.routing[filePath];

    if (!downloadPath) {
        const statusCode = 404;
        log(
            "Status Code: " +
                statusCode +
                ", Request URL: " +
                req.url +
                ", Target URL: " +
                "Request URL Not Found"
        );
        return res.status(statusCode).send("File not found");
    }

    const s3Params = {
        Bucket: config.s3.bucket,
        Key: downloadPath,
    };

    s3.getObject(s3Params, (err, data) => {
        if (err) {
            console.error("Failed to download file:", err);
            const statusCode = 500;
            log(
                "Status Code: " +
                    statusCode +
                    ", Request URL: " +
                    req.url +
                    ", Target URL: " +
                    downloadPath
            );
            return res.status(statusCode).send("Failed to download file");
        }

        const statusCode = 200;
        log(
            "Status Code: " +
                statusCode +
                ", Request URL: " +
                req.url +
                ", Target URL: " +
                downloadPath
        );

        res.attachment(downloadPath);
        res.send(data.Body);
    });
});

// 启动服务器
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});
