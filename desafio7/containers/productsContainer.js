import { sqlClient } from "../src/sqlClient.js"
import ContainerMysql from "./ContainerMysql.js"

export const ProductsContainer = new ContainerMysql(sqlClient, "products")
