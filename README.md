# Object Router

This is a Node.js server that allows you to customize the routing of files stored in an S3 bucket. It provides a simple way to access and download files stored in S3 using custom routes.

## Features

-   Customizable routing: Map S3 bucket files to custom routes in the server configuration file.
-   Simple S3 configuration: Store all S3 configurations, including bucket, endpoint, region, access key ID, and secret access key, in a single JSON file.
-   Dynamic configuration reloading: The server reloads the configuration file on each request.
-   Logging: All operations and access to the server are logged to separate log files for traceability.

## Prerequisites

Before running the server, make sure you have the following prerequisites installed on your machine:

-   Node.js (v14 or higher)
-   NPM (Node Package Manager)

## Installation

1. Clone this repository to your local machine or download the files as a ZIP.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command to install the project dependencies:

```
npm install
```

## Configuration

1. Open the `config-example.json` file located in the project root directory.
2. Update the S3 configuration properties according to your setup:
    - `port`: Port number on which the server should listen for incoming requests.
    - `bucket`: Name of the S3 bucket where your files are stored.
    - `endpoint`: The endpoint URL for your S3 service (e.g., `https://s3.amazonaws.com`).
    - `region`: The AWS region of your S3 bucket.
    - `accessKeyId`: The access key ID for your AWS account.
    - `secretAccessKey`: The secret access key for your AWS account.
    - `routing`: Custom routing configuration in `"Request URL": "Target Relative URL in bucket"` format. Map file paths in the S3 bucket to custom routes in the server (e.g., `"avatar": "avatar.png"`).

## Usage

1. Start the server by running the following command in the project directory:

```
npm index
```

2. Once the server is running, you can access the files stored in the S3 bucket using the custom routes defined in the configuration.
    - Example: If you have mapped `"avatar.png"` to `"avatar"`, you can download the file by accessing `http://localhost/avatar` in your browser.

## Logs

-   Server logs are stored in the `logs` directory.
-   Each log file is named with the date in the format `yyyy-MM-dd.log`.
-   Logs contain information about each operation, including status code, request URL, and target URL.

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue on the GitHub repository.
