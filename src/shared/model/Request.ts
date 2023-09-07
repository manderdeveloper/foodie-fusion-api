import { User } from "@domain/model/User"
import { Request } from "express"

export interface UserRequest extends Request {
  user: User
}