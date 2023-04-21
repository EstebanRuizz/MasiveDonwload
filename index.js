const express = require('express');
const app = express();
const PORT = 4000
const pool = require('./dbConnection');
const cors = require('cors')

app.use(cors())

app.get('/:id', async (req, res) => {
  const {id} = req.params
  console.log(await pool.query('SELECT * FROM database_paeducar.periodico where id_periodico = ?',[id]));
  
  return res.send( await pool.query('SELECT * FROM database_paeducar.periodico where id_periodico = ?',[id]) )
});

app.listen(PORT, () =>{
  console.log(`http://192.168.1.12:${PORT}`);
})
