import { Request } from "express"
import { User } from "../../domain/model/User"

export interface UserRequest extends Request {
  user: User
}