const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new Schema({
     firstName: {
          type: String,
          required: true
     },
     lastName: {
          type: String,
          required: true
     },
     userName: {
          type: String,
          required: true
     },
     userPassword: {
          type: String,
          trim: true,
          minLength: 3,
          required: true
     },
     phone: {
          type: String,
          required: true
     },
     email: {
          type: String,
          unique: true,
          trim: true,
          lowercase: true,
          required: true
     },
     profilePhoto: {
          type: String,
          required: true
     },
     currentCity: {
          type: String,
          required: true
     },
     accountType: {
          type: String,
          required: true
     },
     coverPhoto: {
          type: String,
          required: true
     },
     birthday: {
          type: Date,
          required: true
     },
     createdDate: {
          type: Date,
          required: true
     },
     employer: {
          type: String
     },
     highSchool: {
          type: String
     },
     college: {
          type: String
     },
     hometown: {
          type: String
     },
     relationshipStatus: {
          type: String
     },
     interests: {
          type: String
     },
     friends: { 
          type: Schema.Types.ObjectId, ref: 'UserId' 
     },
     sentFriendsRequest: {
          type: String
     },
     receivedFriendRequests: {
          type: String
     },
     blockedFriends: {
          type: String
     }


// interests []
// friends[]
// sentFriendRequests[]
// receivedFriendRequests[]
// blockedFriends[]











}, {
     timestamps: true,
     toJSON: {
          transform(doc, ret) {
               delete ret.password
               return ret
          }
     }
})

userSchema.pre('save', async function (next) {
     // 'this' is the user doc
     if (!this.isModified('password')) return next()
     // update the password with the computed hash
     this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
     return next()
})

module.exports = model('User', userSchema)