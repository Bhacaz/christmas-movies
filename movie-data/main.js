const jw_ids =
  "tm31297\n" +
  "tm281935\n" +
  "tm327380\n" +
  "tm1179760\n" +
  "tm840126\n" +
  "tm974117\n" +
  "tm56602\n" +
  "tm78713\n" +
  "tm375883\n" +
  "tm76868\n" +
  "tm231788\n" +
  "tm115014\n" +
  "tm177964\n" +
  "tm139700\n" +
  "tm66657\n" +
  "tm319217\n" +
  "tm424851\n" +
  "tm1088977\n" +
  "tm340212\n" +
  "tm142053\n" +
  "tm675820\n" +
  "tm46480";

const fs = require("fs");
const JustWatch = require("justwatch-api");
let jw = new JustWatch({ locale: "en_CA" });

// const movieData = {};

function posterUrl(baseUrl) {
  return (
    "https://images.justwatch.com" + baseUrl.replace("/{profile}", "/s592")
  );
}

function backdropUrl(baseUrl) {
  return (
    "https://images.justwatch.com" + baseUrl.replace("/{profile}", "/s1440")
  );
}

function iconUrl(baseUrl) {
  return (
    "https://images.justwatch.com" + baseUrl.replace("/{profile}", "/s100")
  );
}

let providers;

async function getProviders() {
  providers = await jw.getProviders();
}

function providerById(id) {
  return providers.find((provider) => provider.id === id);
}

async function getMovieData(titleId) {
  return await jw.getTitle("movie", titleId).then((data) => {
    // console.log(data);
    let movieData = {
      title: data.title,
      full_path: data.full_path,
      short_description: data.short_description,
      release_year: data.original_release_year,
      poster: posterUrl(data.poster),
      backdrop: backdropUrl(data.backdrops[0].backdrop_url),
    };

    if (typeof data.offers === "undefined") {
      return movieData;
    }

    let streamingOffersFull = data.offers.filter((offer) => {
      return (
        offer.monetization_type === "flatrate" ||
        offer.monetization_type === "ads"
      );
    });

    let streamingOffers = streamingOffersFull.filter(
      (a, i) =>
        streamingOffersFull.findIndex(
          (s) => a.provider_id === s.provider_id
        ) === i
    );

    movieData.streamingOffers = streamingOffers.map((offer) => {
      let provider = providerById(offer.provider_id);
      provider.full_icon_url = iconUrl(provider.icon_url);
      return {
        provider: provider,
        offer: offer,
      };
    });

    return movieData;
  });
}

async function mapMovieData() {}

async function main() {
  await getProviders();
  let movieDataPromises = jw_ids.split("\n").map((id) => {
    let data = getMovieData(id.replace("tm", ""));
    // console.log(data);
    return data;
  });
  let movieData = await Promise.all(movieDataPromises);
  fs.writeFileSync(
    "src/models/movies.json",
    JSON.stringify(movieData, null, 2)
  );
}

main();
