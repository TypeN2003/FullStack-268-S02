// Description: Node Express REST API with Sequelize and SQLite CRUD Book
// Date: 03/29/2020
// npm install express sequelize sqlite3
// Run this file with node SequlizeSQLiteCRUDBook.js
// Test with Postman
require("dotenv").config();

const express = require('express');
const Sequelize = require('sequelize');
const app = express();
// parse incoming requests
app.use(express.json());

// set db url
const dbUrl = 'postgres://webadmin:AVAmak85910@node85117-typen.proen.app.ruk-com.cloud:11804/Books'

// create a connection to the database
const sequelize = new Sequelize(dbUrl);

//create model หนังสือ (Book) 
const Book = sequelize.define("Book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// เส้นทาง API ต่างๆ 
app.get("/", (req, res) => {
  res.send("Hello Fewkung keepcool handsome and smart! :D file PGCRUD.js");
});

// ซิงค์โมเดลกับฐานข้อมูล
sequelize.sync();

// ดึงข้อมูลหนังสือทั้งหมด
app.get("/books", (req, res) => {
    // ใช้ Book model ในการดึงข้อมูลหนังสือทั้งหมดจากฐานข้อมูล
  Book.findAll()
    // ส่งข้อมูลหนังสือในรูปแบบ JSON
    .then((books) => {
    // ส่งข้อมูลหนังสือทั้งหมดกลับไปยังผู้ร้องขอ
      res.json(books);
    })
    // จัดการข้อผิดพลาดที่อาจเกิดขึ้น
    .catch((err) => {
    // ส่งสถานะข้อผิดพลาด 500 พร้อมข้อความข้อผิดพลาด
      res.status(500).send(err);
    });
});

// ดึงข้อมูลหนังสือตาม ID 
app.get("/books/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("ไม่พบหนังสือที่มี ID นี้");
      } else {
        res.json(book);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// สร้างหนังสือใหม่ 
app.post("/books", (req, res) => {
  // ใช้ Book model ในการสร้างหนังสือใหม่ในฐานข้อมูล
  Book.create(req.body)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// อัปเดตหนังสือตาม ID
app.put("/books/:id", (req, res) => {
  // ค้นหาหนังสือตาม ID ที่ระบุในพารามิเตอร์ของ URL
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("ไม่พบหนังสือที่มี ID นี้");
      } else {
        book
          .update(req.body)
          .then(() => {
            res.send(book);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// ลบหนังสือตาม ID
app.delete("/books/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("ไม่พบหนังสือที่มี ID นี้");
      } else {
        book
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    // .catch block for findByPk
    .catch((err) => {
      res.status(500).send(err);
    });
});

// เริ่มต้นเซิร์ฟเวอร์ 
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);