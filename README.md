<img width="996" alt="screen shot 2018-12-03 at 8 17 08 pm" src="https://user-images.githubusercontent.com/11567025/49414370-c202e900-f738-11e8-875b-a0ce8eeeaa32.png">

<i>i've never picked a protected flower</i> is a book of concrete unicode poems, assembled each run by a program written in node.js. this is one example of output.

**the pdf;
[http://ifyoulived.org/never.pdf](http://ifyoulived.org/never.pdf)**

**the basic;**
-  the poems included in this book use titles scraped forum posts, from users of [wordreference.com](https://forum.wordreference.com/). their usernames are in the back of the book.
-  the font is [gnu unifont](http://unifoundry.com/unifont/index.html), and semantic grouping was based on [conceptnet](http://conceptnet.io/)
-  a hacked version of [jscii](https://github.com/EnotionZ/jscii) formed the base of the text field generation
-  some deterministic random functions borrowed from [loren schmidt](http://vacuumflowers.com/)

**the complicated;**
- this code for this book was written in a few parts.
- the full dataset was scraped from the wordreference forums with a python script. the compiled source material is hundreds of thousands of post titles, as well as the username associated.
- this data was then cleaned, removing phrases that did not meet certain standards (specific grammatical questions, or those that included slurs), as well as removing parts of phrases - things in brackets, etc. a fair amount of the work of this was mindfully cleaning this data to make it feel more lyrical.
- then, using 'related words' in the concept net api, i moved through this textual database, pulling specific lines that matched these words. for instance, the word 'ocean', may return 'boat', 'sea', 'fish', 'shark', etc- so the resultant poem fits a theme.
- then i pull the related words of one of these returned phrases, so the next poem may be about 'shark'. moving this way through the database, the poems slowly track and change.
- after assembling a long list of poems (in a node.js program), it generates the final product, an html page. to generate this page, it copies an html template into a new file with the poems as a variable, which has the text-field generator built in.
- this text field generator (the unicode patterns that the poems are embedded in) works like this; it generates small canvases of pattern, then converts them to ascii planes. the unicode is selected randomly from 17,000 characters of the unicode set.
- then, it embeds each line of the poem inside the pattern. monospace all-unicode fonts were important in this, so the patterns do not get terribly off register.
- these completed text fields are attached to the dom element as a div, with a page-break after each one.
- the pdf is saved off from an html page from the print dialog.
- i ended up running the program twice, once with the poem embedding turned on and once with it turned off, and auto-merging the two pdfs with automator because my browser couldn't render 400 pages at once

the whole project file/code is above. its under-commented but, viable. just add your own data set!
 
**and, again, here is the pdf!
[http://ifyoulived.org/never.pdf](http://ifyoulived.org/never.pdf)**

thank you!
-everest pipkin
