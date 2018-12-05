var fs = require('fs');
var request = require('request');
var lastArray = [];
var sentArr = [];
var counter = 0;

var wordset = ["dog", "flower", "windmill", "cliff", "forest", "city", "home", "light", "excess", "clean", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 'crossroads', 'horizon', 'road', 'settlement', 'boulder', 'outcropping', 'signpost', 'well', 'shelter', 'storm', 'scrub', 'railroad', 'truck stop', 'gas station', 'weigh station', 'crop field', 'farm', 'silo', 'bird flock', 'highway', 'sign', 'turnpike', 'construction site', 'detour', 'rest stop', 'traffic jam', 'traffic', 'tunnel', 'convenience store', 'mile marker', 'cave', 'windbreak', 'billboard', 'street', 'path', 'river', 'hill', 'land', 'line', 'house', 'bank', 'bridge', 'highway', 'rock', 'valley', 'wind', 'sky', 'landscape', 'ocean', 'cloud', 'cliff', 'expanse', 'shore', 'peak', 'sphere', 'lake', 'moon', 'background', 'darkness', 'desert', 'twilight', 'boundary', 'surface', 'colony', 'village', 'trade', 'district', 'territory', 'province', 'cliff', 'pebble', 'crag', 'ledge', 'slab', 'rubble', 'mound', 'ravine', 'pillar', 'brick', 'bluff', 'bush', 'sand', 'stump', 'chunk', 'crater', 'timber', 'gravestone', 'railway', 'canal', 'mill', 'farm', 'undergrowth', 'shrub', 'thicket', 'shrubbery', 'brush', 'birch', 'estate', 'garden', 'field', 'plant', 'crop', 'drink', 'trust', 'trace', 'sky', 'cross', 'road', 'railway', 'roadway', 'lane', 'route', 'trail', 'ridge', 'coast', 'beach', 'canyon', 'travel', 'stream', 'refuge', 'comfort', 'shadow', 'shade', 'roof', 'outcrop', 'mountainside', 'wasteland', 'boulder', 'pinnacle', 'rain', 'weather', 'fire', 'breeze', 'ice', 'sea', 'garden', 'sky', 'bird', 'sunset', 'dam', 'river', 'wash', 'ocean', 'hill', 'valley', 'tree', 'flower', 'flame', 'fire', 'tree'] //for use when we get in a corner
//var enData = fs.readFileSync('english_removed.txt', { encoding: 'utf8' });
//parseData(enData);

going(wordset[Math.floor(Math.random()*wordset.length)]);

function going(startTerm){

relatedGen('http://api.conceptnet.io/c/en/'+startTerm+'?filter=/c/en&limit=200'); 

function relatedGen(relatedURL) {request(relatedURL,function(error, response, body){
if (!error && response.statusCode == 200 && body != "[]") {
var parsed = JSON.parse(body);
var conceptArray = []
for (x=0;x<parsed.edges.length;x++){
if (parsed.edges[x].start.language == 'en')
{
	var newterm = parsed.edges[x].start.term.replace('/c/en/','')
	conceptArray.push(newterm)
}
}

var cleanedArray = conceptArray.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]); //remove duplicates from array

var collectArr = [];

for (d=0;d<lastArray.length;d++){
sentArr.push(lastArray[d].replace(/\_/g, ' '))
}
//console.log(counter)
counter ++;

sentArr = sentArr.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]); //remove duplicates from array

if (sentArr.length>45){
//console.log("matches array is " + sentArr.length + " words long, first word is " + sentArr[0])
console.log("\n\n")
makePoem(sentArr);
sentArr = [];
}

if (cleanedArray.length>8){
going (cleanedArray[Math.floor(Math.random()*cleanedArray.length)]);
lastArray=cleanedArray;
counter = 0;
}
else if (counter>8){
	//console.log("!!!!! new go !!!!!! ")
	going(wordset[Math.floor(Math.random()*wordset.length)]);
}
else {
going (lastArray[Math.floor(Math.random()*lastArray.length)]);
}

}
}
  ,"json");
}
}

function makePoem(matches){
	sents = shuffle(sents);
	for (c=0; c< matches.length; c++){
	pullLines(matches[c])
	if (c>22) break;
}

}

function pullLines(match){

for (var i=sents.length; i--;) {
     if (sents[i].indexOf(match)>=0){
     	console.log(sents[i].toLowerCase());
     	//console.log(match + " ---> " +sents[i]);
     	sents.splice(i, 1);
     break;
 }
}

}


function shuffle(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

/* //COMMENT THIS IN AND RUN IT TO SCRUB YOUR DATA
function parseData(engData){

engData = engData.split(/\n/)


for (x=0;x<engData.length;x++){

if (engData[x].includes('?')){engData[x] = ''}
engData[x] = engData[x].replace(/> </g,'><');
engData[x] = engData[x].replace(/><.*>/g, '>')

engData[x] = engData[x].replace(/</g,'');
engData[x] = engData[x].replace(/>/g,'');

engData[x] = engData[x].replace(/\[.*?\]/g, '')

if (engData[x].toLowerCase().substring(0,4) == 'what'){engData[x] = ''}
if (engData[x].toLowerCase().substring(0,6) == 'how to'){engData[x] = ''}

if (engData[x].toLowerCase().substring(engData[x].length-3,engData[x].length) == '...'){engData[x] = ''}

if (engData[x].toLowerCase().includes('grammar')){ engData[x] = ''}
if (engData[x].toLowerCase().includes('pronunciation')){engData[x] = ''}
if (engData[x].toLowerCase().includes('punctuation')){engData[x] = ''}
if (engData[x].toLowerCase().includes('punctuate')){engData[x] = ''}
if (engData[x].toLowerCase().includes('English')){engData[x] = ''}
if (engData[x].toLowerCase().includes('sentence')){engData[x] = ''}
if (engData[x].toLowerCase().includes('verb')){engData[x] = ''}
if (engData[x].toLowerCase().includes('adjective')){engData[x] = ''}
if (engData[x].toLowerCase().includes('noun')){engData[x] = ''}
if (engData[x].toLowerCase().includes('question')){engData[x] = ''}
if (engData[x].toLowerCase().includes(' or ')){engData[x] = ''}
if (engData[x].toLowerCase().includes('gerund')){engData[x] = ''}
if (engData[x].toLowerCase().includes('tense')){engData[x] = ''}
if (engData[x].toLowerCase().includes(':')){engData[x] = ''}
if (engData[x].toLowerCase().includes(' vs ')){engData[x] = ''}
if (engData[x].toLowerCase().includes(' v ')){engData[x] = ''}
if (engData[x].toLowerCase().includes('perfect')){engData[x] = ''}

engData[x] = engData[x].replace(' / ','/');
engData[x] = engData[x].replace(' /','/');
engData[x] = engData[x].replace('/ ','/');
engData[x] = engData[x].replace(/\(/g,'');
engData[x] = engData[x].replace(/\)/g,'');
engData[x] = engData[x].replace(/\"/g,'');

if (engData[x].indexOf('/') > 0){
	engData[x] = engData[x].substring(0, engData[x].indexOf('/'));}

if (engData[x].indexOf('\\') > 0){
	engData[x] = engData[x].substring(0, engData[x].indexOf('/'));}

if (engData[x].indexOf('vs') > 0){
	engData[x] = engData[x].substring(0, engData[x].indexOf('vs'));}


var deadwords = /\b(?:put|slurs|etc|here)\b/ //our many avoidant phrases. remove sentences that include these.

if (engData[x].toLowerCase().search(deadwords) > -1){
//console.log(engData[x])
engData[x] = '';
}

engData[x] = engData[x].replace(/  /g,' ');

//if (engData[x].toLowerCase().includes(match)){
//console.log(" ---- > " + engData[x])
console.log(x)

//sentArr.push(line);

if (x == engData.length-1){
	console.log(engData)
}

//}
}
}
*/

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


var sents = []//our data goes here in array format