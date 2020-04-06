const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_pkk"
});
db.connect(err => {
  if (err) throw err;
  console.log("Database connected");
});

// CRUD Lokasi Kemah

app.post("/tambah",  function (request, result) {
  let data = request.body;

  var alat_kemah = { 
    nama_alat: data.nama_alat,
    deskripsi: data.deskripsi,  
    stok: data.stok,
    harga_sewa: data.harga_sewa
  }

  db.query("insert into alat_kemah set ?", alat_kemah, (err, result) => {
    if (err) throw err;
  });

  result.json({
    success: true,
    message: "Data has been added"
  });
});

app.put("/edit/:id",  function (req, res) {
  let data = // membuat variabel data yang berisi sintaks untuk mengupdate tabel di database
    'UPDATE alat_kemah SET nama_alat="' +
    req.body.nama_alat +
    '", deskripsi="' +
    req.body.deskripsi +
    '", stok="' +
    req.body.stok +
    '", harga_sewa="' +
    req.body.harga_sewa +
    '" where id=' +
    req.params.id;
  db.query(data, function (err, result) { // mengupdate data di database
    if (err) throw err;
    // jika gagal maka akan keluar error
    else {
      res.json({
        success: true,
        message: "Data has been updated"
      });
    }
  });
});

app.delete("/delete/:id",  function (req, res) { // membuat end point delete
  let id = "delete from alat_kemah where id=" + req.params.id;

  db.query(id, function (err, result) { // mengupdate data di database
    if (err) throw err;
    // jika gagal maka akan keluar error
    else {
      res.json({
        success: true,
        message: "Data has been Deleted"
      });
    }
  });
});

app.listen(port, () => {
  console.log('Aplikasi berjalan di ' + port)
})