/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");
/* 
Make the "Click me!" button move when the visitor clicks it:
- 
First add the button to the page by following the steps in the TODO 🚧
*/
let chosenIndex = 0;
let chosenTitle = "PLACEDAHOLDER";
let description = "PLACERHODLER";
let wikidataID = "NoID";
let imageID = "NoID";
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    if (Math.round(Math.random()) == 0)
    {
    FetchMaleCategory();
    }
    else
    {
    FetchFemaleCategory();
    }
    
    //FetchDebug("Mr. Weatherbee");
    //FetchDebug("Alfred J. Kwak");
    //FetchDebug("Baba Looey")
    //FetchDebug("Charlie Brown")
    //FetchDebug("Alfie Atkins")
    //FetchDebug("Lippy the Lion and Hardy Har Har");
    //FetchDebug("Sylvester Jr.");
    //FetchDebug("Shere Khan")
    //FetchDebug("Archie Andrews")
    //FetchDebug("Baloo")
    //FetchDebug("Krang")
    //FetchDebug("Talking Cricket")
    //FetchDebug("Sniffles (Merrie Melodies)")
    //FetchDebug("Shaggy Rogers")
    //FetchDebug("Goofy")
    //FetchDebug("Bouli")
    //FetchDebug("Monica (Monica and Friends)")
    //FetchDebug("Black Panther (character)");
    //FetchDebug("Laura Carrot")
    //FetchDebug("Judy Jetson");
    //FetchDebug("Junior Asparagus");
    //FetchDebug("Mr. Lunt");
    //FetchDebug("Toothy");
    //FetchDebug("Gumball Watterson")
    //FetchDebug("Mordecai and Rigby")
    //FetchDebug("Betty Cooper")
    //FetchDebug("Arnold Shortman");
  };
}
async function FetchHtml() 
                {
                    let response = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=20&srsearch=SpongeBob');
                    return await response.text(); // Returns it as Promise
                }
        
        
                // Usaing the HTML
                async function Do()
                {
                   let html = await FetchHtml().then(text => {return text}); // Get html from the promise
                    alert(html);
                }
function FetchMaleCategory()
{
  
  chosenIndex = Math.round(Math.random()*335);
  var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:Male_characters_in_animated_television_series",
    cmlimit: "335",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.categorymembers;
  
            chosenTitle = pages[chosenIndex].title
           // alert(chosenTitle)
  //alert(pages[chosenIndex].pageid)
    document.querySelector("#name").textContent = chosenTitle;
            FetchPage(pages[chosenIndex].pageid);
    })
    .catch(function(error){console.log(error);});
}
function FetchFemaleCategory()
{
  var url = "https://en.wikipedia.org/w/api.php"; 
chosenIndex = Math.round(Math.random()*145);
var params = {
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:Female_characters_in_animation",
    cmlimit: "145",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.categorymembers;
  
            chosenTitle = pages[chosenIndex].title
            //alert(chosenTitle)
  //alert(pages[chosenIndex].pageid)
    document.querySelector("#name").textContent = chosenTitle;
            FetchPage(pages[chosenIndex].pageid);
    })
    .catch(function(error){console.log(error);});
}

function FetchPage(daID)
{
  document.querySelector("#pfp").src = "";
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=wikitext&pageid=${daID}`)
    .then(function(response){return response.json();})
    .then(function(response) {
        
//alert(response.parse.wikitext["*"])
    description = response.parse.wikitext["*"]
    document.querySelector("#description").textContent = description;
    if (response.parse.wikitext["*"].toLowerCase().includes("#redirect"))
      {
        scrapeInstead();
       // FetchMaleCategory();
      }
      else{
        
      GetInfoboxImage(daID);
          //FetchThumbnail(daID);
        //GetImageFromHTMLAndDetectMatchingName(chosenTitle);
      }
    })
    .catch(function(error){alert(error);});
  
}
function GetImageFromHTML(daTitle)
{
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&formatversion=2&page=${daTitle}&prop=text&format=json&origin=*`)
    .then(function(response){return response.json();})
    .then(function(response) {
    splitParts = response.parse.text.split("<img")
    for (part in splitParts)
      {
        if (splitParts[part].includes("src"))
        {
          alert(splitParts[part].split("src")[1])
          document.querySelector("img").src =  splitParts[part].split("src=")[1].split('"')[1]
          
        }
      }
    })
    .catch(function(error){alert(error);});
}
function removeExtension(stringVar) {
         let regex = new RegExp(/\.[^/.]+$/)
         let fileName = stringVar.replace(regex, "");
         return fileName;
      }

function GetImageFromHTMLAndDetectMatchingName(daID,filename)
{
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&formatversion=2&pageid=${daID}&prop=text&format=json&origin=*`)
    .then(function(response){return response.json();})
    .then(function(response) {
    splitParts = response.parse.text.split("<img")
    for (part in splitParts)
      {
        if (splitParts[part].includes("src"))
        {
          //alert(filename.split("File:")[1]);
          
          let newFilename = encodeRFC3986URIComponent(filename.split("File:")[1].replaceAll("  ", " ").replaceAll(" ", "_").latinize()).replaceAll("%0A","");
          newFilename = removeExtension(newFilename).toLowerCase()
         // alert(splitParts[part].split("src=")[1].split('"')[1].toLowerCase() + "GOOGOAALLOOOO    " + newFilename)
          if (splitParts[part].split("src=")[1].split('"')[1].toLowerCase().includes(newFilename))
            {
              document.querySelector("img").src =  splitParts[part].split("src=")[1].split('"')[1]
              //alert("APOSPIAPSIOPOIA")
              break;
            }
        }
      }
    })
    .catch(function(error){alert(error);});
}

function encodeRFC3986URIComponent(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function FetchDebug(daTitle)
{
  document.querySelector("#pfp").src = "";
  document.querySelector("#name").textContent = daTitle;
  chosenTitle = daTitle;
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=wikitext&page=${daTitle}`)
    .then(function(response){return response.json();})
    .then(function(response) {
//alert(response.parse.wikitext["*"])
    description = response.parse.wikitext["*"]
    document.querySelector("#description").textContent = description;
    
        //GetImageFromHTML(daTitle);
    if (response.parse.wikitext["*"].toLowerCase().includes("#redirect"))
      {
        scrapeInstead();
       // FetchMaleCategory();
      }
    else
      {
        GetInfoboxImage(response.parse.pageid);
          //FetchThumbnail(daID);
      }
      
    })
    .catch(function(error){alert(error);});
}
function notSvg(value) {
    return !value.title.includes('svg');
}
function GetWikidataID(daID)
{
  fetch(`https://en.wikipedia.org/w/api.php?action=query&ppprop=wikibase_item&prop=pageprops&redirects=1&titles=${chosenTitle}&format=json&origin=*`)
    .then(function(response){return response.json();})
    .then(function(response) {
    
    //alert(JSON.stringify(response.query.pages[`${daID}`]))
        wikidataID = response.query.pages[`${daID}`].pageprops.wikibase_item;
    })
    .catch(function(error){alert(error);});
}
function GetInfoboxImage(daID)
{
  /*GetWikidataID(daID);
  fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&sites=enwiki&props=claims&titles=${chosenTitle}&origin=*`)
    .then(function(response){return response.json();})
    .then(function(response) {
        //alert(response.entities[`${wikidataID}`].claims["P18"][0].mainsnak.datavalue.value)
    GetImageFromWikipedia("File:" + response.entities[`${wikidataID}`].claims["P18"][0].mainsnak.datavalue.value)
    })
    .catch(function(error){alert(error);});*/
  let filename = '';
  let splitBars = description.split('|')
  for (part in splitBars)
    {
      if (splitBars[part].includes('image') && !splitBars[part].includes("image_size"))
        { 
      let splitPart = splitBars[part].split('= ')
      //alert(splitPart[0]);
      //alert(splitPart[1]);
          let chosenFilename = splitPart[1];
          while (chosenFilename.startsWith(" "))
            {
              chosenFilename = chosenFilename.replace(" ", "")
            }
          while (chosenFilename.endsWith(" "))
            {
              chosenFilename = chosenFilename.slice();
            }
          chosenFilename = chosenFilename.replaceAll("[", "");
          chosenFilename = chosenFilename.replaceAll("]","");
          chosenFilename = chosenFilename.replace("Image:","");
          //alert(chosenFilename);
          if (splitPart[1].includes("File:"))
            {
              //GetImageWikimedia(chosenFilename);
              GetImageFromHTMLAndDetectMatchingName(daID, chosenFilename)
            }
          else
            {
              GetImageFromHTMLAndDetectMatchingName(daID, "File:" + chosenFilename);
            }
          break;
      }
      
    }
}
function FetchThumbnail(daID)
{
  fetch(`https://en.wikipedia.org/w/api.php?action=query&pageids=${daID}&origin=*&format=json&prop=images`)
    .then(function(response){return response.json();})
    .then(function(response) {
        
//alert(response.parse.wikitext["*"])
    let imglist = response.query.pages[`${daID}`].images
    //let imglist = [];
    //for (i in imgjson)
    //{
    //  imglist.push(imgjson[i].title)
    //}
    //alert(imglist)
    /*for (daImg in imglist)
    {
        if (imglist[daImg].title.includes('.svg'))
        {
          imglist.splice(daImg,1)
        }
    }*/
    imglist = imglist.filter(notSvg);
    
    GetImageFromWikipedia(imglist[0].title);
   // alert(response.query.pages[`${daID}`].original.source)
    //document.querySelector("#description").textContent = description;
    //if (response.parse.wikitext["*"].toLowerCase().includes("#redirect"))
      //{
      //  FetchMaleCategory();
      //}
          
    })
    .catch(function(error){alert(error);});
}
function GetImageWikimedia(filename)
{
 fetch(`https://api.wikimedia.org/core/v1/commons/file/${filename}`)
    .then(function(response){return response.json();})
    .then(function(response) {
    document.querySelector("img").src = response.original.url;
    
    })
    .catch(function(error){alert(error);}); 
}
function GetImageID(filename)
{
  alert(filename)
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=wikitext&page=${filename}`)
    .then(function(response){return response.json();})
    .then(function(response) {
    imageID = response.parse.pageid;
    GetImageFromWikipedia(filename)
    //alert(imageID)
    })
    .catch(function(error){alert(error);});
}
function GetImageFromWikipedia(filename)
{
  //GetImageID(filename);
  //alert(imageID)
  fetch(`https://en.wikipedia.org/w/api.php?action=query&iiend=2007-12-31T23%3A59%3A59Z&iilimit=50&iiprop=timestamp%7Cuser%7Curl&prop=imageinfo&titles=${filename}&origin=*&format=json`)
    .then(function(response){return response.json();})
    .then(function(response) {
    document.querySelector("img").src =  response.query.pages[`${imageID}`].imageinfo[0].url;   
    
    })
    .catch(function(error){alert(error);});
}
async function GetWiki()
{
  let numQuestions = 5;
  let difficulty = "easy";
    let url = `https://en.wikipedia.org/w/api.php?action=query&cmlimit=335&cmtitle=Category%3AMale_characters_in_animation&list=categorymembers&format=json`;

  // Init response vars
  let response, responseJson;

  try {
    // Make the request
    response = await fetch(url);
    responseJson = await response.json();
    alert(response.text());
  } catch (e) {
    alert(e);
    return;
  }

  // Get the results from the request
  let results = responseJson.results;
}
var Latinise={};Latinise.latin_map={"Á":"A",
"Ă":"A",
"Ắ":"A",
"Ặ":"A",
"Ằ":"A",
"Ẳ":"A",
"Ẵ":"A",
"Ǎ":"A",
"Â":"A",
"Ấ":"A",
"Ậ":"A",
"Ầ":"A",
"Ẩ":"A",
"Ẫ":"A",
"Ä":"A",
"Ǟ":"A",
"Ȧ":"A",
"Ǡ":"A",
"Ạ":"A",
"Ȁ":"A",
"À":"A",
"Ả":"A",
"Ȃ":"A",
"Ā":"A",
"Ą":"A",
"Å":"A",
"Ǻ":"A",
"Ḁ":"A",
"Ⱥ":"A",
"Ã":"A",
"Ꜳ":"AA",
"Æ":"AE",
"Ǽ":"AE",
"Ǣ":"AE",
"Ꜵ":"AO",
"Ꜷ":"AU",
"Ꜹ":"AV",
"Ꜻ":"AV",
"Ꜽ":"AY",
"Ḃ":"B",
"Ḅ":"B",
"Ɓ":"B",
"Ḇ":"B",
"Ƀ":"B",
"Ƃ":"B",
"Ć":"C",
"Č":"C",
"Ç":"C",
"Ḉ":"C",
"Ĉ":"C",
"Ċ":"C",
"Ƈ":"C",
"Ȼ":"C",
"Ď":"D",
"Ḑ":"D",
"Ḓ":"D",
"Ḋ":"D",
"Ḍ":"D",
"Ɗ":"D",
"Ḏ":"D",
"ǲ":"D",
"ǅ":"D",
"Đ":"D",
"Ƌ":"D",
"Ǳ":"DZ",
"Ǆ":"DZ",
"É":"E",
"Ĕ":"E",
"Ě":"E",
"Ȩ":"E",
"Ḝ":"E",
"Ê":"E",
"Ế":"E",
"Ệ":"E",
"Ề":"E",
"Ể":"E",
"Ễ":"E",
"Ḙ":"E",
"Ë":"E",
"Ė":"E",
"Ẹ":"E",
"Ȅ":"E",
"È":"E",
"Ẻ":"E",
"Ȇ":"E",
"Ē":"E",
"Ḗ":"E",
"Ḕ":"E",
"Ę":"E",
"Ɇ":"E",
"Ẽ":"E",
"Ḛ":"E",
"Ꝫ":"ET",
"Ḟ":"F",
"Ƒ":"F",
"Ǵ":"G",
"Ğ":"G",
"Ǧ":"G",
"Ģ":"G",
"Ĝ":"G",
"Ġ":"G",
"Ɠ":"G",
"Ḡ":"G",
"Ǥ":"G",
"Ḫ":"H",
"Ȟ":"H",
"Ḩ":"H",
"Ĥ":"H",
"Ⱨ":"H",
"Ḧ":"H",
"Ḣ":"H",
"Ḥ":"H",
"Ħ":"H",
"Í":"I",
"Ĭ":"I",
"Ǐ":"I",
"Î":"I",
"Ï":"I",
"Ḯ":"I",
"İ":"I",
"Ị":"I",
"Ȉ":"I",
"Ì":"I",
"Ỉ":"I",
"Ȋ":"I",
"Ī":"I",
"Į":"I",
"Ɨ":"I",
"Ĩ":"I",
"Ḭ":"I",
"Ꝺ":"D",
"Ꝼ":"F",
"Ᵹ":"G",
"Ꞃ":"R",
"Ꞅ":"S",
"Ꞇ":"T",
"Ꝭ":"IS",
"Ĵ":"J",
"Ɉ":"J",
"Ḱ":"K",
"Ǩ":"K",
"Ķ":"K",
"Ⱪ":"K",
"Ꝃ":"K",
"Ḳ":"K",
"Ƙ":"K",
"Ḵ":"K",
"Ꝁ":"K",
"Ꝅ":"K",
"Ĺ":"L",
"Ƚ":"L",
"Ľ":"L",
"Ļ":"L",
"Ḽ":"L",
"Ḷ":"L",
"Ḹ":"L",
"Ⱡ":"L",
"Ꝉ":"L",
"Ḻ":"L",
"Ŀ":"L",
"Ɫ":"L",
"ǈ":"L",
"Ł":"L",
"Ǉ":"LJ",
"Ḿ":"M",
"Ṁ":"M",
"Ṃ":"M",
"Ɱ":"M",
"Ń":"N",
"Ň":"N",
"Ņ":"N",
"Ṋ":"N",
"Ṅ":"N",
"Ṇ":"N",
"Ǹ":"N",
"Ɲ":"N",
"Ṉ":"N",
"Ƞ":"N",
"ǋ":"N",
"Ñ":"N",
"Ǌ":"NJ",
"Ó":"O",
"Ŏ":"O",
"Ǒ":"O",
"Ô":"O",
"Ố":"O",
"Ộ":"O",
"Ồ":"O",
"Ổ":"O",
"Ỗ":"O",
"Ö":"O",
"Ȫ":"O",
"Ȯ":"O",
"Ȱ":"O",
"Ọ":"O",
"Ő":"O",
"Ȍ":"O",
"Ò":"O",
"Ỏ":"O",
"Ơ":"O",
"Ớ":"O",
"Ợ":"O",
"Ờ":"O",
"Ở":"O",
"Ỡ":"O",
"Ȏ":"O",
"Ꝋ":"O",
"Ꝍ":"O",
"Ō":"O",
"Ṓ":"O",
"Ṑ":"O",
"Ɵ":"O",
"Ǫ":"O",
"Ǭ":"O",
"Ø":"O",
"Ǿ":"O",
"Õ":"O",
"Ṍ":"O",
"Ṏ":"O",
"Ȭ":"O",
"Ƣ":"OI",
"Ꝏ":"OO",
"Ɛ":"E",
"Ɔ":"O",
"Ȣ":"OU",
"Ṕ":"P",
"Ṗ":"P",
"Ꝓ":"P",
"Ƥ":"P",
"Ꝕ":"P",
"Ᵽ":"P",
"Ꝑ":"P",
"Ꝙ":"Q",
"Ꝗ":"Q",
"Ŕ":"R",
"Ř":"R",
"Ŗ":"R",
"Ṙ":"R",
"Ṛ":"R",
"Ṝ":"R",
"Ȑ":"R",
"Ȓ":"R",
"Ṟ":"R",
"Ɍ":"R",
"Ɽ":"R",
"Ꜿ":"C",
"Ǝ":"E",
"Ś":"S",
"Ṥ":"S",
"Š":"S",
"Ṧ":"S",
"Ş":"S",
"Ŝ":"S",
"Ș":"S",
"Ṡ":"S",
"Ṣ":"S",
"Ṩ":"S",
"Ť":"T",
"Ţ":"T",
"Ṱ":"T",
"Ț":"T",
"Ⱦ":"T",
"Ṫ":"T",
"Ṭ":"T",
"Ƭ":"T",
"Ṯ":"T",
"Ʈ":"T",
"Ŧ":"T",
"Ɐ":"A",
"Ꞁ":"L",
"Ɯ":"M",
"Ʌ":"V",
"Ꜩ":"TZ",
"Ú":"U",
"Ŭ":"U",
"Ǔ":"U",
"Û":"U",
"Ṷ":"U",
"Ü":"U",
"Ǘ":"U",
"Ǚ":"U",
"Ǜ":"U",
"Ǖ":"U",
"Ṳ":"U",
"Ụ":"U",
"Ű":"U",
"Ȕ":"U",
"Ù":"U",
"Ủ":"U",
"Ư":"U",
"Ứ":"U",
"Ự":"U",
"Ừ":"U",
"Ử":"U",
"Ữ":"U",
"Ȗ":"U",
"Ū":"U",
"Ṻ":"U",
"Ų":"U",
"Ů":"U",
"Ũ":"U",
"Ṹ":"U",
"Ṵ":"U",
"Ꝟ":"V",
"Ṿ":"V",
"Ʋ":"V",
"Ṽ":"V",
"Ꝡ":"VY",
"Ẃ":"W",
"Ŵ":"W",
"Ẅ":"W",
"Ẇ":"W",
"Ẉ":"W",
"Ẁ":"W",
"Ⱳ":"W",
"Ẍ":"X",
"Ẋ":"X",
"Ý":"Y",
"Ŷ":"Y",
"Ÿ":"Y",
"Ẏ":"Y",
"Ỵ":"Y",
"Ỳ":"Y",
"Ƴ":"Y",
"Ỷ":"Y",
"Ỿ":"Y",
"Ȳ":"Y",
"Ɏ":"Y",
"Ỹ":"Y",
"Ź":"Z",
"Ž":"Z",
"Ẑ":"Z",
"Ⱬ":"Z",
"Ż":"Z",
"Ẓ":"Z",
"Ȥ":"Z",
"Ẕ":"Z",
"Ƶ":"Z",
"Ĳ":"IJ",
"Œ":"OE",
"ᴀ":"A",
"ᴁ":"AE",
"ʙ":"B",
"ᴃ":"B",
"ᴄ":"C",
"ᴅ":"D",
"ᴇ":"E",
"ꜰ":"F",
"ɢ":"G",
"ʛ":"G",
"ʜ":"H",
"ɪ":"I",
"ʁ":"R",
"ᴊ":"J",
"ᴋ":"K",
"ʟ":"L",
"ᴌ":"L",
"ᴍ":"M",
"ɴ":"N",
"ᴏ":"O",
"ɶ":"OE",
"ᴐ":"O",
"ᴕ":"OU",
"ᴘ":"P",
"ʀ":"R",
"ᴎ":"N",
"ᴙ":"R",
"ꜱ":"S",
"ᴛ":"T",
"ⱻ":"E",
"ᴚ":"R",
"ᴜ":"U",
"ᴠ":"V",
"ᴡ":"W",
"ʏ":"Y",
"ᴢ":"Z",
"á":"a",
"ă":"a",
"ắ":"a",
"ặ":"a",
"ằ":"a",
"ẳ":"a",
"ẵ":"a",
"ǎ":"a",
"â":"a",
"ấ":"a",
"ậ":"a",
"ầ":"a",
"ẩ":"a",
"ẫ":"a",
"ä":"a",
"ǟ":"a",
"ȧ":"a",
"ǡ":"a",
"ạ":"a",
"ȁ":"a",
"à":"a",
"ả":"a",
"ȃ":"a",
"ā":"a",
"ą":"a",
"ᶏ":"a",
"ẚ":"a",
"å":"a",
"ǻ":"a",
"ḁ":"a",
"ⱥ":"a",
"ã":"a",
"ꜳ":"aa",
"æ":"ae",
"ǽ":"ae",
"ǣ":"ae",
"ꜵ":"ao",
"ꜷ":"au",
"ꜹ":"av",
"ꜻ":"av",
"ꜽ":"ay",
"ḃ":"b",
"ḅ":"b",
"ɓ":"b",
"ḇ":"b",
"ᵬ":"b",
"ᶀ":"b",
"ƀ":"b",
"ƃ":"b",
"ɵ":"o",
"ć":"c",
"č":"c",
"ç":"c",
"ḉ":"c",
"ĉ":"c",
"ɕ":"c",
"ċ":"c",
"ƈ":"c",
"ȼ":"c",
"ď":"d",
"ḑ":"d",
"ḓ":"d",
"ȡ":"d",
"ḋ":"d",
"ḍ":"d",
"ɗ":"d",
"ᶑ":"d",
"ḏ":"d",
"ᵭ":"d",
"ᶁ":"d",
"đ":"d",
"ɖ":"d",
"ƌ":"d",
"ı":"i",
"ȷ":"j",
"ɟ":"j",
"ʄ":"j",
"ǳ":"dz",
"ǆ":"dz",
"é":"e",
"ĕ":"e",
"ě":"e",
"ȩ":"e",
"ḝ":"e",
"ê":"e",
"ế":"e",
"ệ":"e",
"ề":"e",
"ể":"e",
"ễ":"e",
"ḙ":"e",
"ë":"e",
"ė":"e",
"ẹ":"e",
"ȅ":"e",
"è":"e",
"ẻ":"e",
"ȇ":"e",
"ē":"e",
"ḗ":"e",
"ḕ":"e",
"ⱸ":"e",
"ę":"e",
"ᶒ":"e",
"ɇ":"e",
"ẽ":"e",
"ḛ":"e",
"ꝫ":"et",
"ḟ":"f",
"ƒ":"f",
"ᵮ":"f",
"ᶂ":"f",
"ǵ":"g",
"ğ":"g",
"ǧ":"g",
"ģ":"g",
"ĝ":"g",
"ġ":"g",
"ɠ":"g",
"ḡ":"g",
"ᶃ":"g",
"ǥ":"g",
"ḫ":"h",
"ȟ":"h",
"ḩ":"h",
"ĥ":"h",
"ⱨ":"h",
"ḧ":"h",
"ḣ":"h",
"ḥ":"h",
"ɦ":"h",
"ẖ":"h",
"ħ":"h",
"ƕ":"hv",
"í":"i",
"ĭ":"i",
"ǐ":"i",
"î":"i",
"ï":"i",
"ḯ":"i",
"ị":"i",
"ȉ":"i",
"ì":"i",
"ỉ":"i",
"ȋ":"i",
"ī":"i",
"į":"i",
"ᶖ":"i",
"ɨ":"i",
"ĩ":"i",
"ḭ":"i",
"ꝺ":"d",
"ꝼ":"f",
"ᵹ":"g",
"ꞃ":"r",
"ꞅ":"s",
"ꞇ":"t",
"ꝭ":"is",
"ǰ":"j",
"ĵ":"j",
"ʝ":"j",
"ɉ":"j",
"ḱ":"k",
"ǩ":"k",
"ķ":"k",
"ⱪ":"k",
"ꝃ":"k",
"ḳ":"k",
"ƙ":"k",
"ḵ":"k",
"ᶄ":"k",
"ꝁ":"k",
"ꝅ":"k",
"ĺ":"l",
"ƚ":"l",
"ɬ":"l",
"ľ":"l",
"ļ":"l",
"ḽ":"l",
"ȴ":"l",
"ḷ":"l",
"ḹ":"l",
"ⱡ":"l",
"ꝉ":"l",
"ḻ":"l",
"ŀ":"l",
"ɫ":"l",
"ᶅ":"l",
"ɭ":"l",
"ł":"l",
"ǉ":"lj",
"ſ":"s",
"ẜ":"s",
"ẛ":"s",
"ẝ":"s",
"ḿ":"m",
"ṁ":"m",
"ṃ":"m",
"ɱ":"m",
"ᵯ":"m",
"ᶆ":"m",
"ń":"n",
"ň":"n",
"ņ":"n",
"ṋ":"n",
"ȵ":"n",
"ṅ":"n",
"ṇ":"n",
"ǹ":"n",
"ɲ":"n",
"ṉ":"n",
"ƞ":"n",
"ᵰ":"n",
"ᶇ":"n",
"ɳ":"n",
"ñ":"n",
"ǌ":"nj",
"ó":"o",
"ŏ":"o",
"ǒ":"o",
"ô":"o",
"ố":"o",
"ộ":"o",
"ồ":"o",
"ổ":"o",
"ỗ":"o",
"ö":"o",
"ȫ":"o",
"ȯ":"o",
"ȱ":"o",
"ọ":"o",
"ő":"o",
"ȍ":"o",
"ò":"o",
"ỏ":"o",
"ơ":"o",
"ớ":"o",
"ợ":"o",
"ờ":"o",
"ở":"o",
"ỡ":"o",
"ȏ":"o",
"ꝋ":"o",
"ꝍ":"o",
"ⱺ":"o",
"ō":"o",
"ṓ":"o",
"ṑ":"o",
"ǫ":"o",
"ǭ":"o",
"ø":"o",
"ǿ":"o",
"õ":"o",
"ṍ":"o",
"ṏ":"o",
"ȭ":"o",
"ƣ":"oi",
"ꝏ":"oo",
"ɛ":"e",
"ᶓ":"e",
"ɔ":"o",
"ᶗ":"o",
"ȣ":"ou",
"ṕ":"p",
"ṗ":"p",
"ꝓ":"p",
"ƥ":"p",
"ᵱ":"p",
"ᶈ":"p",
"ꝕ":"p",
"ᵽ":"p",
"ꝑ":"p",
"ꝙ":"q",
"ʠ":"q",
"ɋ":"q",
"ꝗ":"q",
"ŕ":"r",
"ř":"r",
"ŗ":"r",
"ṙ":"r",
"ṛ":"r",
"ṝ":"r",
"ȑ":"r",
"ɾ":"r",
"ᵳ":"r",
"ȓ":"r",
"ṟ":"r",
"ɼ":"r",
"ᵲ":"r",
"ᶉ":"r",
"ɍ":"r",
"ɽ":"r",
"ↄ":"c",
"ꜿ":"c",
"ɘ":"e",
"ɿ":"r",
"ś":"s",
"ṥ":"s",
"š":"s",
"ṧ":"s",
"ş":"s",
"ŝ":"s",
"ș":"s",
"ṡ":"s",
"ṣ":"s",
"ṩ":"s",
"ʂ":"s",
"ᵴ":"s",
"ᶊ":"s",
"ȿ":"s",
"ɡ":"g",
"ᴑ":"o",
"ᴓ":"o",
"ᴝ":"u",
"ť":"t",
"ţ":"t",
"ṱ":"t",
"ț":"t",
"ȶ":"t",
"ẗ":"t",
"ⱦ":"t",
"ṫ":"t",
"ṭ":"t",
"ƭ":"t",
"ṯ":"t",
"ᵵ":"t",
"ƫ":"t",
"ʈ":"t",
"ŧ":"t",
"ᵺ":"th",
"ɐ":"a",
"ᴂ":"ae",
"ǝ":"e",
"ᵷ":"g",
"ɥ":"h",
"ʮ":"h",
"ʯ":"h",
"ᴉ":"i",
"ʞ":"k",
"ꞁ":"l",
"ɯ":"m",
"ɰ":"m",
"ᴔ":"oe",
"ɹ":"r",
"ɻ":"r",
"ɺ":"r",
"ⱹ":"r",
"ʇ":"t",
"ʌ":"v",
"ʍ":"w",
"ʎ":"y",
"ꜩ":"tz",
"ú":"u",
"ŭ":"u",
"ǔ":"u",
"û":"u",
"ṷ":"u",
"ü":"u",
"ǘ":"u",
"ǚ":"u",
"ǜ":"u",
"ǖ":"u",
"ṳ":"u",
"ụ":"u",
"ű":"u",
"ȕ":"u",
"ù":"u",
"ủ":"u",
"ư":"u",
"ứ":"u",
"ự":"u",
"ừ":"u",
"ử":"u",
"ữ":"u",
"ȗ":"u",
"ū":"u",
"ṻ":"u",
"ų":"u",
"ᶙ":"u",
"ů":"u",
"ũ":"u",
"ṹ":"u",
"ṵ":"u",
"ᵫ":"ue",
"ꝸ":"um",
"ⱴ":"v",
"ꝟ":"v",
"ṿ":"v",
"ʋ":"v",
"ᶌ":"v",
"ⱱ":"v",
"ṽ":"v",
"ꝡ":"vy",
"ẃ":"w",
"ŵ":"w",
"ẅ":"w",
"ẇ":"w",
"ẉ":"w",
"ẁ":"w",
"ⱳ":"w",
"ẘ":"w",
"ẍ":"x",
"ẋ":"x",
"ᶍ":"x",
"ý":"y",
"ŷ":"y",
"ÿ":"y",
"ẏ":"y",
"ỵ":"y",
"ỳ":"y",
"ƴ":"y",
"ỷ":"y",
"ỿ":"y",
"ȳ":"y",
"ẙ":"y",
"ɏ":"y",
"ỹ":"y",
"ź":"z",
"ž":"z",
"ẑ":"z",
"ʑ":"z",
"ⱬ":"z",
"ż":"z",
"ẓ":"z",
"ȥ":"z",
"ẕ":"z",
"ᵶ":"z",
"ᶎ":"z",
"ʐ":"z",
"ƶ":"z",
"ɀ":"z",
"ﬀ":"ff",
"ﬃ":"ffi",
"ﬄ":"ffl",
"ﬁ":"fi",
"ﬂ":"fl",
"ĳ":"ij",
"œ":"oe",
"ﬆ":"st",
"ₐ":"a",
"ₑ":"e",
"ᵢ":"i",
"ⱼ":"j",
"ₒ":"o",
"ᵣ":"r",
"ᵤ":"u",
"ᵥ":"v",
"ₓ":"x"};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}
