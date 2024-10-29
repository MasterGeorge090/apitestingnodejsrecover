/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});


const unirest = require("unirest");
const cheerio = require("cheerio");
let searchResults;
let fandomLink;
const getOrganicData = (searchItem) => {
  
  return unirest
    .get(`https://www.google.com/search?q=${searchItem} character site:fandom.com&gl=us&hl=en`)
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
      const organicResults = [];
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

      

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
    searchResults = organicResults;
    for (let e in links)
    {
      if (links[e].toLowerCase().includes("fandom"))
        {
          fandomLink = links[e];
          //getFandomPage(links[e]);
          break;
        }
    }
     console.log(searchResults)
    });
};
let googleImageResults;
const getImagesData = (searchItem) => {
        const selectRandom = () => {
        const userAgents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        ];
        var randomNumber = Math.floor(Math.random() * userAgents.length);
        return userAgents[randomNumber];
        };
        let user_agent = selectRandom();
        let header = {
        "User-Agent": `${user_agent}`,
        };
        return unirest
        .get(
            `https://www.google.com/search?q=${searchItem} character&sca_esv=5bf84f1c9db1b0c0&rlz=1C1GCEU_enUS1026US1026&udm=2&sxsrf=ADLYWIL88yBlG2Rnrh6ld5DCsZHlpvYP6Q:1728425177799&source=lnt&tbs=ic:trans&sa=X&ved=2ahUKEwiI0fjF5f-IAxXYFlkFHVfLFpkQpwV6BAgFEA8&biw=1680&bih=923&dpr=1`
        )
        .headers(header)
        .then((response) => {
            let $ = cheerio.load(response.body);
          
            let images_results = [];
            /*$(".eA0Zlc").each((i, el) => {
            let json_string = $(el).find(".rg_meta").text();
            images_results.push({
                title: $(el).find(".EZAeBe .JMWMJ .toI8Rb .OSrXXb").text(),
                source: $(el).find(".iKjWAf .FnqxG").text(),
                link: JSON.parse(json_string).ru,
                original: JSON.parse(json_string).ou,
                thumbnail: $(el).find(".rg_l img").attr("src") ? $(el).find(".rg_l img").attr("src") : $(el).find(".rg_l img").attr("data-src"),
            });
            });*/
            $(".ob5Hkd").each((i,el) => {
              images_results.push({
                source: $(el)['0'].children[0]
              });
            });
          googleImageResults = images_results;
            console.log(images_results);
        });
    };
    const axios = require('axios');

              async function getCharacterImage(keyword) {
	const url = `https://www.google.com/search?gl=us&q=${keyword} character&tbm=isch`;
	const { data } = await axios.get(url);
	
	const $ = cheerio.load(data);

	const results = [];
	$('table.RntSmf').each((i, elem) => {
		const imgSrc = $(elem).find('img').attr('src');
		const text = $(elem).find('span:first-child').text();
		results.push({ imgSrc, text });
	});
console.log(results)
	return results;
}
                  
const getCharacterInfo = async (characterName) => {
    try {
        const url = `https://www.google.com/search?q=${characterName} character site:fandom.com`;
        const response = await unirest.get(url).headers({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        }) 
        const $ = cheerio.load(response.body);
      console.log(response.status)
      let titles = [];
      let links = [];
      let snippets = [];
      let displayedLinks = [];
      const organicResults = [];
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

      

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
          snippet: snippets[i],
          displayedLink: displayedLinks[i],
        };
      }
    searchResults = organicResults;
    for (let e in links)
    {
      if (links[e].toLowerCase().includes("fandom"))
        {
          fandomLink = links[e];
          //getFandomPage(links[e]);
          break;
        }
    }
     //console.log(searchResults)
    } catch (e) {
        console.log(e);
    }
}


// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}
   //getImagesData("SpongeBob");    

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };

  // If someone clicked the option for a random color it'll be passed in the querystring
  if (request.query.randomize) {
    // We need to load our color data file, pick one at random, and add it to the params
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];

    // Add the color properties to the params object
    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };
  }

  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});
/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
let coolResults;
//console.log(`Outside of the thingy idk, \n ${searchResults}`)
fastify.post("/", function (request, reply) {
  // Build the params object to pass to the template
  let params = { seo: seo };
  // If the user submitted a color through the form it'll be passed here in the request body
let color = request.body.color;
  
  let characterTitle = request.body.title
  // If it's not empty, let's try to find the color
  if (characterTitle) {
    // ADD CODE FROM TODO HERE TO SAVE SUBMITTED FAVORITES

    // Load our color data file
    switch (request.body.requestType){
      case "article":
getCharacterInfo(characterTitle) 
        console.log(getCharacterInfo(characterTitle))
        break;
      case "image":

        console.log(googleImageResults);
        break;
    }
        // Now we see if that color is a key in our colors object
    /*if (colors[color]) {
      // Found one!
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
      };
    } else {
      // No luck! Return the user value as the error property
      params = {
        colorError: request.body.color,
        seo: seo,
      };
    }*/
  }

  // The Handlebars template will use the parameter values to update the page with the chosen color
  switch (request.body.requestType){
      case "article":
        return searchResults;
    break;
      case "image":
        return googleImageResults;
    }
});


/*fastify.post("/", function (request, reply) {
  // Build the params object to pass to the template
  let params = { seo: seo };
  // If the user submitted a color through the form it'll be passed here in the request body
  let color = request.body.color;
  
  console.log(request.body.title)
  // If it's not empty, let's try to find the color
  if (color) {
    // ADD CODE FROM TODO HERE TO SAVE SUBMITTED FAVORITES

    // Load our color data file
    const colors = require("./src/colors.json");

    // Take our form submission, remove whitespace, and convert to lowercase
    color = color.toLowerCase().replace(/\s/g, "");

    // Now we see if that color is a key in our colors object
    if (colors[color]) {
      // Found one!
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
      };
    } else {
      // No luck! Return the user value as the error property
      params = {
        colorError: request.body.color,
        seo: seo,
      };
    }
  }

  // The Handlebars template will use the parameter values to update the page with the chosen color
  return reply.view("/src/pages/index.hbs", params);
});*/

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
