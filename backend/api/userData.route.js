import express from 'express'
import UserDataController from './userData.controller.js'
const router = express.Router()

router.route("/").get(UserDataController.apiGetUserData)
router.route("/").post(UserDataController.apiPostUserData)
router.route("/").put(UserDataController.apiPutUserData)
router.route("/getUploadURL").get(UserDataController.apiGetUploadURL)
router.route("/getURL").get(UserDataController.apiGetURL)
router.route("/seeUploadURL").get(UserDataController.apiSeeUploadURL)
router.route("/uploadVideos").post(UserDataController.apiUploadVideos)

export default router