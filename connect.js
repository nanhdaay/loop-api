import mysql2 from "mysql2"

export const db = mysql2.createConnection({
    host:"containers-us-west-47.railway.app",
    port: 6719,
    user:"root",
    password:"Wkl9IdKX0A1cdpeWVhc7",
    database:"railway"
})