const loadJsonFromStdin = () => {
  return new Promise((resolve, reject) => {
    let data = '';
    
    process.stdin.on('data', chunk => {
        data += chunk;
    });

    process.stdin.on('end', () => {
        try {
            const jsonArray = JSON.parse(data);
            resolve(jsonArray);
        } catch (err) {
            reject(`Error parsing JSON from stdin: ${err}`);
        }
    });

    process.stdin.on('error', err => {
        reject(`Error reading from stdin: ${err}`);
    });
  });
};

const main = async () => {
  try {
    const dpgArray = await loadJsonFromStdin();
    for (const dpg of dpgArray) {
      const sdgArray = Array(17).fill('');
      const sdgNumberList = dpg.sdgs.split(',');
      for (const sdgNumber of sdgNumberList) {

        sdgArray[parseInt(sdgNumber) - 1] = 'X';
      }
      for (let sdgNumber = 1; sdgNumber <= 17; sdgNumber++) {
        dpg[sdgNumber] = sdgArray[sdgNumber - 1];
      }
    }
    console.log(JSON.stringify(dpgArray));
  } catch (err) {
      console.error(err);
      process.exit(1);
  }
};

main();