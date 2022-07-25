const fs = require('fs')
const axios = require('axios')

function fileProcessor(path){
    try{
    fs.readFile(path, 'utf8', async function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`file contents: ${data}`);
    });} 
    catch(err){
    console.error(`Cannot write to ${path}: ${err}`);
    }

    let urls = data.split('\n').filter(url => url !== '');

    for (let url of urls) {
        let res;

        try {
        res = await axios.get(url);
        } catch(err){
            console.error(`Couldn't connect to ${url}`);
            continue;
        }
    }

    let file = new URL(url).hostname;

    fs.writeFile(file, res.data, 'utf8', err => {
        if (err) {
            console.error(`Couldnt write file: ${file}, ${err}`);
        }
        console.log((`Results:: ${file}`));
    });
}

fileProcessor(process.argv[2]);
