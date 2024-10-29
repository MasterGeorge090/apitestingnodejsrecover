function scrapeInstead()
{
  GetCharacterImage();
  fetch("https://api-testing-node-port.glitch.me/", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    requestType: "article",
    title: chosenTitle,
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
    //alert(json[0].links)
    document.querySelector("#name").textContent = json[0].title
        FetchFandomPage(json[0].links);
        });

}
function GetCharacterImage()
{
    fetch("https://api-testing-node-port.glitch.me/", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    requestType: "image",
    title: chosenTitle,
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
    //alert(json[0].links)
      //alert(json[0].imgSrc);
        document.querySelector("img").src = json[0].imgSrc;
        });
}
function FetchFandomDebug()
{
 FetchFandomPage("https://spongebob.fandom.com/wiki/SpongeBob_SquarePants_(character)");
  /*fetch(`https://spongebob.fandom.com/api.php?action=parse&format=json&origin=*&prop=wikitext&page=SpongeBob_SquarePants_(character)`)
    .then(function(response){return response.json();})
    .then(function(response) {
        
      //alert(response.parse.wikitext["*"]);
    document.querySelector("#description").textContent = response.parse.wikitext["*"]; 
    })
    .catch(function(error){alert(error);});*/
  
}

function FetchFandomPage(url)
{
  let newUrl = `https://${url.split("/")[2]}/api.php?action=parse&format=json&origin=*&prop=wikitext&page=${url.split("/")[4]}`;
  //alert(newUrl);
  fetch(newUrl)
    .then(function(response){return response.json();})
    .then(function(response) {
        
//alert(response.parse.wikitext["*"])
    description = response.parse.wikitext["*"]
    document.querySelector("#description").textContent = description;
    GetInfoboxImageFandom(url);
    })
    .catch(function(error){alert(error);});
  
}
function GetInfoboxImageFandom(url)
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
      if (splitBars[part].toLowerCase().includes('image') && !splitBars[part].toLowerCase().includes("image_size") && !splitBars[part].toLowerCase().includes("imagetab") && splitBars[part].split('=').length == 1)
        {
         // alert(part+1)
         
          //alert(splitBars[parseInt(part)+1])
          let chosenFilename = splitBars[parseInt(part)+1].split("}")[0];
          chosenFilename = chosenFilename.replace("File:", "")
          while (chosenFilename.startsWith(" "))
            {
              chosenFilename = chosenFilename.replace(" ", "")
            }
          while (chosenFilename.endsWith(" "))
            {
              chosenFilename = chosenFilename.slice();
            }
         // alert(chosenFilename.replace("File:", ""))
              GetImageFromFandomHTMLAndDetectMatchingName(url, chosenFilename);
            
          break;
        }
      if (splitBars[part].toLowerCase().includes('image') && !splitBars[part].toLowerCase().includes("imagetab") && !splitBars[part].includes("image_size"))
        { 
      let splitPart = splitBars[part].split('=')
      //alert(splitPart[0]);
      ///alert(splitPart[1]);
          let chosenFilename = splitPart[1];
          //alert(chosenFilename)
          while (chosenFilename.startsWith(" "))
            {
              chosenFilename = chosenFilename.replace(" ", "")
            }
          while (chosenFilename.endsWith(" "))
            {
              chosenFilename = chosenFilename.slice();
            }
          if (chosenFilename.includes("<gallery>"))
           {
             chosenFilename = chosenFilename.replace("<gallery>", "");
           }
          chosenFilename = chosenFilename.replace(/(\r\n|\n|\r)/gm, "");
//alert(chosenFilename)
          chosenFilename = chosenFilename.replaceAll("[", "");
          chosenFilename = chosenFilename.replaceAll("]","");
          chosenFilename = chosenFilename.replace("Image:","");
          //alert(chosenFilename);
          if (splitPart[1].includes("File:"))
            {
              //GetImageWikimedia(chosenFilename);
              chosenFilename = chosenFilename.replace("File:","");
              //GetImageFromFandomHTMLAndDetectMatchingName(url, chosenFilename)
            }
          else
            {
             // GetImageFromFandomHTMLAndDetectMatchingName(url, chosenFilename);
            }
          break;
      }
      
    }
}
function GetImageFromFandomHTML(daTitle)
{
  fetch(`https://en.wikipedia.org/w/api.php?action=parse&formatversion=2&page=${daTitle}&prop=text&format=json&origin=*`)
    .then(function(response){return response.json();})
    .then(function(response) {
    splitParts = response.parse.text.split("<img")
    for (part in splitParts)
      {
        if (splitParts[part].includes("src"))
        {
          //alert(splitParts[part].split("src")[1])
          document.querySelector("img").src =  splitParts[part].split("src=")[1].split('"')[1]
          
        }
      }
    })
    .catch(function(error){alert(error);});
}


function GetImageFromFandomHTMLAndDetectMatchingName(url,filename)
{
  //https://en.wikipedia.org/w/api.php?action=parse&formatversion=2&pageid=${daID}&prop=text&format=json&origin=*
  let newUrl = `https://${url.split("/")[2]}/api.php?action=parse&formatversion=2&&prop=text&format=json&origin=*&page=${url.split("/")[4]}`
 // console.log(newUrl)
  fetch(newUrl)
    .then(function(response){return response.json();})
    .then(function(response) {
    splitParts = response.parse.text.split("<img")
    for (part in splitParts)
      {
        if (splitParts[part].includes("src") || splitParts[part].includes("data-image-name"))
        {
         
          let newFilename = encodeRFC3986URIComponent(filename.replaceAll(" ", "_").latinize()).replaceAll("%0A","");
          newFilename = removeExtension(newFilename).toLowerCase()
          //alert(splitParts[part].split("src=")[1].split('"')[1].toLowerCase().replace("/scale-to-width-down/350", "") + "GOOGOAALLOOOO    " + newFilename)
          if (splitParts[part].split("src=")[1].split('"')[1].toLowerCase().split("/revision")[0].includes(newFilename))
            {
               document.querySelector("img").src =  splitParts[part].split("src=")[1].split('"')[1].split("/revision")[0];
              //alert("APOSPIAPSIOPOIA")
              break;
            }
          
          //alert(splitParts[part].split("data-image-name")[1].split('"')[1].toLowerCase().split("/revision")[0])
          if (splitParts[part].split("data-image-name").length > 1)
            {
          if (splitParts[part].split("data-image-name")[1].split('"')[1].toLowerCase().split("/revision")[0].includes(filename.toLowerCase()))
            {
              document.querySelector("img").src = splitParts[part].split("data-src=")[1].split('"')[1].split("/revision")[0];
              //alert("APOSPIAPSIOPOIA")
              break;
            }
            }
        }
      }
    })
    .catch(function(error){alert(error);});
}
function isAudioType(s) { 
    var audioTypes = [".mp3", ".adp", ".au", ".snd", ".mid", ".midi", ".kar", ".rmi", ".m4a", ".mp4a", ".mpga", ".mpg2", ".mp2", ".mp2a", ".m2a", ".m3a", ".oga", ".spx", ".s3m", ".sil", ".uva", ".weba", ".aac", ".aif", ".aiff", ".aifc", ".flac", ".mka", ".wax", ".wma", ".rma", ".ra", ".rmp", ".wav", ".xm"], // Add as many extensions you like here...
        audioExt = s.replace(/^.+(?=\.)/i, '');

    return (audioTypes.indexOf(audioExt.toLowerCase()) > -1); 
}
//alert("hi")
//const unirest = require("unirest");
//const cheerio = require("cheerio");
//alert("no error :)")
/*const getOrganicData = () => {
  return unirest
    .get("https://www.google.com/search?q=javascript&gl=us&hl=en")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);
      console.log(response.status)
      let titles = [];
      let links = [];
      let snippets = [];
      let displayedLinks = [];

      $(".g .yuRUbf h3").each((i, el) => {
        titles[i] = $(el).text();
      });
      $(".yuRUbf a").each((i, el) => {
        links[i] = $(el).attr("href");
      });
      $(".g .VwiC3b ").each((i, el) => {
        snippets[i] = $(el).text();
      });
      $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
        displayedLinks[i] = $(el).text();
      });

      const organicResults = [];

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
      console.log(organicResults)
    });
};

getOrganicData();
*/