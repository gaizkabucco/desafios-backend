import { sqlClient } from "../src/sqlClient.js"
import ContainerMysql from "./ContainerMysql.js"

export const MessagesContainer = new ContainerMysql(sqlClient, "messages")
