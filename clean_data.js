var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('english_removed.txt')
});

lineReader.on('line', function (line) {

if (line.includes('?')){line = ''}
line = line.replace(/> </g,'><');
line = line.replace(/><.*>/g, '>')

line = line.replace(/</g,'');
line = line.replace(/>/g,'');

line = line.replace(/\[.*?\]/g, '')

if (line.toLowerCase().substring(0,4) == 'what'){line = ''}
if (line.toLowerCase().substring(0,6) == 'how to'){line = ''}

if (line.toLowerCase().substring(line.length-3,line.length) == '...'){line = ''}

if (line.toLowerCase().includes('grammar')){ line = ''}
if (line.toLowerCase().includes('pronunciation')){line = ''}
if (line.toLowerCase().includes('punctuation')){line = ''}
if (line.toLowerCase().includes('punctuate')){line = ''}
if (line.toLowerCase().includes('English')){line = ''}
if (line.toLowerCase().includes('sentence')){line = ''}
if (line.toLowerCase().includes('verb')){line = ''}
if (line.toLowerCase().includes('adjective')){line = ''}
if (line.toLowerCase().includes('noun')){line = ''}
if (line.toLowerCase().includes('question')){line = ''}
if (line.toLowerCase().includes(' or ')){line = ''}
if (line.toLowerCase().includes('gerund')){line = ''}
if (line.toLowerCase().includes('tense')){line = ''}
if (line.toLowerCase().includes(':')){line = ''}
if (line.toLowerCase().includes(' vs ')){line = ''}
if (line.toLowerCase().includes(' v ')){line = ''}
if (line.toLowerCase().includes('perfect')){line = ''}

line = line.replace(' / ','/');
line = line.replace(' /','/');
line = line.replace('/ ','/');
line = line.replace(/(/g,'');
line = line.replace(/)/g,'');
line = line.replace(/"/g,'');

if (line.indexOf('/') > 0){
	line = line.substring(0, line.indexOf('/'));}

if (line.indexOf('\\') > 0){
	line = line.substring(0, line.indexOf('/'));}

if (line.indexOf('vs') > 0){
	line = line.substring(0, line.indexOf('vs'));}

line = line.replace(/  /g,' ');

///if (line.toLowerCase().includes('church')){
console.log(line)
//}
});