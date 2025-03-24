var express = require('express');
var router = express.Router();
const mysql = require("mysql2");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mytest', function(req, res, next) {
  res.send('This is my test 22.');
});

router.get('/phonelist', function(req, res, next) {
  responseUtil.returnJSON(req, res, "phones/phone-list.json");
});

router.get('/phonedata', function(req, res, next) {

  const sql = "SELECT phonedata._id ,phonedata.title , phonedata.price,itemtype.typename FROM phonedata JOIN itemtype ON phonedata.item_type_id = itemtype.id";

  const db = getDatabaseConnection("phonelistdata");

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("ส่งข้อมูลกลับ:", result);
    res.json(result);
  });
});


router.get('/webname', function(req, res, next) {

  const sql = "SELECT testColumn FROM testtable1 LIMIT 1;";
  
  const db = getDatabaseConnection("test");

  const data = db.query(sql, (err, result) => {
    if (err) {
    return res.status(500).json({ error: err.message });
    }
    console.log("ส่งข้อมูลกลับ:", result[0]);
    res.json(result[0]);
  });
});


router.put('/editphonedata', function(req, res, next){
  console.log("PUT Request Received");

  const { _id, title, price } = req.body;
  console.log("Received data:", req.body);
  if (!_id || !title || !price) {
    return res.status(400).json({ error: "กรุณาระบุ _id, title และ price" });
  }

  const sql = "UPDATE phonedata SET title = ?, price = ? WHERE _id = ?";

  const db = getDatabaseConnection("phonelistdata");

  db.query(sql, [title, price, _id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการอัปเดต" });
    }

    console.log("อัปเดตสำเร็จ:", result);
    res.json({ message: "อัปเดตข้อมูลสำเร็จ" });
  });

  db.end();
})


router.post('/savephonedata', function (req, res) {
  console.log("Received Request");

  const { _id, title, price } = req.body;

  console.log("Received data:", req.body);

  if (!title || !price) {
    return res.status(400).json({ error: "กรุณาระบุ title และ price" });
  }

  const db = getDatabaseConnection("phonelistdata");

  // ตรวจสอบ
  if (_id) {
    // ถ้ามี _id -> อัปเดตข้อมูล
    const updateSql = "UPDATE phonedata SET title = ?, price = ? WHERE _id = ?";
    db.query(updateSql, [title, price, _id], (err, updateResult) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "อัปเดตข้อมูลสำเร็จ", data: updateResult });
    });
  } else {
    // ถ้าไม่มี _id -> เพิ่มข้อมูลใหม่
    const insertSql = "INSERT INTO phonedata (title, price) VALUES (?, ?)";
    db.query(insertSql, [title, price], (err, insertResult) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ 
            message: "เพิ่มข้อมูลใหม่สำเร็จ", 
            data: { id: insertResult.insertId, title, price } 
        });
    });
  }

  
});


router.delete('/deletephonedata/:id', (req, res) => {
  console.log("Received _id:", req.params.id); // ดูค่าของ _id
  const _id = req.params.id;
  const db = getDatabaseConnection("phonelistdata");
  const sql = "DELETE FROM phonedata WHERE _id = ?";
  db.query(sql, [_id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ error: err.message });
    }

    // log to check the result from SQL query
    console.log("Delete result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    res.json({ message: "ลบข้อมูลสำเร็จ จาก backend1" });
  });
});

function getDatabaseConnection(databasename){

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: databasename,
    port: 3306 
  });

  console.log("db");

  db.connect((err) => {
    if (err) {
      console.error(" เชื่อมต่อ MySQL ล้มเหลว:", err);
    } else {
      console.log(" เชื่อมต่อ MySQL สำเร็จ");
    }
  });
  return db;
}

module.exports = router;
