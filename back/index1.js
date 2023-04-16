const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

app.use(cors());

// Set up middleware to serve the static files in the public directory
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// Set up route to serve the .m3u8 and .ts files
app.get('/video',(req, res) => {
    //const { filename } = req.params;
    //const filePath = path.join(__dirname,filename);
    const filePath="./output.m3u8"
  
    const stream = ffmpeg(filePath)
      .addOptions([
        '-profile:v baseline', // H.264 baseline profile
        '-level 3.0', // H.264 Level 3
        '-start_number 0', // start the first .ts segment at index 0
        '-hls_time 10', // segment length (in seconds)
        '-hls_list_size 0', // disable HLS playlist length limit
        '-f hls' // format to HLS
      ])
      .on('error', (err) => {
        console.log(`Error transcoding video: ${err.message}`);
        res.destroy()
      });
  
    
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    stream.pipe(res);
  });
  
app.use(express.static('public'));

// Set up server to listen for incoming requests
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
