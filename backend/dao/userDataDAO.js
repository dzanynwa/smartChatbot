import mongodb from "mongodb"
let userData

export default class UserDataDAO {
  static async injectDB(conn) {
    if (userData) {
      return
    }
    try {
      userData = await conn.db(process.env.USERDATA_NS).collection("userdata")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in userDataDAO: ${e}`,
      )
    }
  }
  static async addUserData(newUserData) {
    try {
      const userBody = { 
          fullName: newUserData.fullName,
          gender: newUserData.gender,
          dateOfBirth: newUserData.dateOfBirth,
          email: newUserData.email,
          phone: newUserData.phone,
          address: newUserData.address,
          position: newUserData.position,
          skillTestLink: newUserData.skillTestLink
      }
      return await userData.insertOne(userBody)
    } catch (e) {
      console.error(`Unable to post user: ${e}`)
      return { error: e }
    }
  }
  static async editUserData(newUserData) {
    try {
      const filter = { fullName: newUserData.fullName };
      const updateUser = {
        $set: {
          skillTestLink:
            newUserData.skillTestLink,
        },
      };
      const options = { upsert: true };
      const result = await userData.updateOne(filter, updateUser, options);
      return result
    } catch (e) {
      console.error(`Unable to post user: ${e}`)
      return { error: e }
    }
  }
  static async getUserData({
    filters = null,
    page = 0,
    userDataPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["fullName"] } }
      } 
    }

    let cursor
    
    try {
      cursor = await userData
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { userDataList: [], totalNumUserData: 0 }
    }

    const displayCursor = cursor.limit(userDataPerPage).skip(userDataPerPage * page)

    try {
      const userDataList = await displayCursor.toArray()
      const totalNumUserData = await userData.countDocuments(query)

      return { userDataList, totalNumUserData }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { userDataList: [], totalNumUserData: 0 }
    }
  }
}