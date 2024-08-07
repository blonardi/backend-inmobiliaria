import mongoose from 'mongoose'

import { userSchema } from '../schemas/userSchema.js'

export const UserModel = mongoose.model('User', userSchema)
