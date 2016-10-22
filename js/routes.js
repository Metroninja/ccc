export default {
  //path: 'http://local.api.ccc',
  path: 'http://api.ninjabam.com',
  actions: {
    auth: 'cccAuth',
    add: 'cccAddTeam',
    get: 'cccGetTeams',
    remove: 'cccRemoveTeam',
    score: 'cccAddScore',
  }
}

let justifyYoSelf = (text, length) => {
  //some reasonable type checking and length
  //yes you could put in one really long single word string and break this still
  if(typeof text !== 'string' || typeof length != 'number' || length < 10 ){
    return "I see what you did there.  Quit testing edge cases";
  }
  //dump the words into an array so we can find out how many spaces needed (length -1)
  let wordArray = text.split(" ");
  //find out our total character length minus the spaces (i.e. wordcountlength)
  //if we assume we want at least one space
  let remainingSpace = length - text.length;
  //we could end up with a string larger than the buffer.  Gotta break it up then
  if(remainingSpace >= 0 ){
    //sweet, happy path this is easy.
    //I'm console logging because it's javascript and this is going on in a terminal
    let charLength = text.length - wordArray.length +1;
    //so we need to figure out if the string length is over the buffers
    let useable = length - charLength;
    console.log(makeLine(wordArray, useable));

  } else {
    //need to break it up into multiline
    let current = {size: 0, words: []};
    let lines = [];
    wordArray.forEach((word) => {
      if((current.size + word.length + (current.words.length - 1)) >= length) {
        lines.push(current);
        current = {size: 0, words: []};
      }
      current.words.push(word);
      //length plus trailing space
      current.size += word.length;
      console.log(current);
    });
    console.log('pushing', current);
    //push the remiaining item onto the stack;
    lines.push(current);
    //ok we have our sets now.
    console.log('foreach', lines);
    lines.forEach((line) => {
      console.log('foreach line', line.words, line.size);
      let useable = length - line.size;
      console.log(makeLine(line.words, useable));
    })
    //well now we need to create multiple 'lines' and recalculate stuff for each line
  }
  console.log(makeBuffer(length));
  return 'all done';
}

let makeLine = (wordArray, remainingSpace) => {
  console.log('makeLine', wordArray, remainingSpace);
  if(wordArray.length === 1){
    return wordArray[0];
  }
  let spaceCount = Math.floor(remainingSpace/(wordArray.length - 1));
  let spaceChars = '';
  if(spaceCount){
    for(let i = 0; i < spaceCount; i++) {
      //add a space if there is room for them
      spaceChars += "\u00A0";
    }
  }
  return wordArray.join(spaceChars);
}

let makeBuffer = (length) => {
  let line = '';
  for(let i = 1; i <= length; i++){
    let item = i%10;
    line += item ? item-1 : 9;
  }
  return line;
}