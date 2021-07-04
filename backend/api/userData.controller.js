import UserDataDAO from "../dao/userDataDAO.js";
import AWS from "aws-sdk";
import request from "request";
const s3 = new AWS.S3({
  endpoint: "s3-eu-central-1.amazonaws.com",
  signatureVersion: "v4",
  region: "eu-central-1",
});

export default class UserDataController {
  static async apiGetUserData(req, res, next) {
    try {
      let userDataRes = await UserDataDAO.getUserData();
      res.json(userDataRes);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiPutUserData(req, res, next) {
    try {
      const UserDataResponse = await UserDataDAO.editUserData(req.body);
      console.log(UserDataResponse);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiPostUserData(req, res, next) {
    try {
      const UserDataResponse = await UserDataDAO.addUserData(req.body);
      console.log(UserDataResponse);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetUploadURL(req, res, next) {
    try {
      const myBucket = "smartrecruiter";
      const myKey = req.query.title
      const signedUrlExpireSeconds = 60 * 5;
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl(
          "putObject",
          {
            Bucket: myBucket,
            Key: myKey,
            Expires: signedUrlExpireSeconds,
            // ContentType: "video/webm"
          },
          (err, url) => {
            err ? reject(err) : resolve(url);
          }
        );
      });
      res.json(url);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async apiGetURL(req, res, next) {
    try {
      const myBucket = "smartrecruiter";
      const myKey = req.query.title
      const signedUrlExpireSeconds = 60 * 5;
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl(
          "getObject",
          {
            Bucket: myBucket,
            Key: myKey,
            Expires: signedUrlExpireSeconds,
            // ContentType: "video/webm"
          },
          (err, url) => {
            err ? reject(err) : resolve(url);
          }
        );
      });
      res.json(url);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async apiSeeUploadURL(req, res, next) {
    try {
      const myBucket = "smartrecruiter";
      const myKey = "interviewAnswers";
      const signedUrlExpireSeconds = 60 * 5;
      const ress = await new Promise((resolve, reject) => {s3.getObject({ Bucket: myBucket,
        Key: myKey, }, (err, url) => {
          err ? reject(err) : resolve(url);
        }
      )})
      console.log(ress)
      res.json(ress)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUploadVideos(req, res, next) {
    try {
      const { url, data } = req.body;
      request(
        {
          method: "PUT",
          uri: url,
          body: data,
          headers: {
            "Content-Type": "video/webm",
            "Content-Encoding": 'base64',
          },
        },
        function (error, response, body) {
          if (error) {
            console.error(error);
          } else {
            console.log("upload successful:", body);
          }
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //get object sve isto ko gore umjesto putObject staviti getObject
}
