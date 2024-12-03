import fs from 'fs';
//If input is a string that can be converted to an integer, return the integer. Otherwise return false.
export function inputToNumber(input: string): number | false {
  const num = parseInt(input, 10);
  return isNaN(num) ? false : num;
}

//Get data file contents as string
export function getFileContents(path: string, _options: {
  flatten?: boolean;
} = {}): string {
  // Default Options
  const options = {
    flatten: false,
    ..._options,
  };
  
  let str = '';
  str = fs.readFileSync(path, 'utf-8');
  if (options.flatten) {
    //remove newlines
    str = str.replace(/[\n\r]+/g, '');
  } else {
    str = str.replace(/(\r\n|\n|\r)/g, '\n');
  }

  return str;
}

