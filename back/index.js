const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
    const filepath=path.join(__dirname, 'public','videos','output.m3u8')
    console.log(filepath)
    res.sendFile(path.join(__dirname, 'public','videos','output.m3u8'));
  });

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
