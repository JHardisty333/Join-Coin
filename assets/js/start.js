var trendingEl = document.getElementById("trending");
var searchedEl = document.getElementById("searched");

var searchedCoins = [];
var tempSearchedCoins = [];
var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
var keyWord = "";



var listOfCoins = function() {
    // List of all coins
    var apiUrl = "https://api.coingecko.com/api/v3/coins/list?include_platform=true";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data[1].name);
                // Loop through all coins
                for (i = 0; i < data.length; i++) {
                    var coinName = data[i].name

                    displayData(coinName);

                };
            });
        }
    });
};


var trendingCoins = function(bitcoinPrice) {
    // List of the top 7 trending coins
    var apiUrl = "https://api.coingecko.com/api/v3/search/trending";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // Loop through the seven trending coins
                for (i = 0; i < 7; i++) {
                    var coinName = data.coins[i].item.name
                    var coinPrice = data.coins[i].item.price_btc
                    var largePng = data.coins[i].item.large



                    // console.log(bitcoinPrice);


                    coinPrice = coinPrice * bitcoinPrice;
                    //console.log(coinName)
                    //console.log(coinPrice)

                    //console.log(largePng)

                    displayTrendingData(coinName, coinPrice, largePng);

                };
            });
        }
    });
};

var bitcoinPrice = function() {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin"

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //console.log(data);

                var bitcoin = data.market_data.current_price.usd
                    //console.log(date);
                    //console.log(bitcoin);
                trendingCoins(bitcoin);

            });
        }
    });
};

var coinInfo = function(coinName) {
    // Info on a specific coin and date
    var apiUrl = "https://api.coingecko.com/api/v3/coins/" + coinName

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // console.log("coinInfo response", data);

                var coinName = data.name
                var coinPrice = data.market_data.current_price.usd
                var coinMarketCap = data.market_data.market_cap.usd
                var coinVolume = data.market_data.total_volume.usd
                var pngLogo = data.image.small
                var aboutCoin = data.description.en


                displayChoosenData(coinName, coinPrice, coinMarketCap, coinVolume, pngLogo);
                displayAboutCoin(aboutCoin);
            });
        } else {
            console.log("Coin not found.");
        }
    });
};

var displayChoosenData = function(name, price = 0, marketCap = 0, volume = 0, logo = 0) {
    resetSearchedCoins();
    // create elements for the variables
    //var infoEl = document.createElement("li");
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var marketCapEl = document.createElement("p");
    var volumeEl = document.createElement("p");
    var logoEl = document.createElement("img");

    //var descEl = document.createElement("div");

    //var infoElLi = document.createElement("li");
    var nameElLi = document.createElement("li");
    var priceElLi = document.createElement("li");
    var marketCapElLi = document.createElement("li");
    var volumeElLi = document.createElement("li");
    var logoElLi = document.createElement("li");
    if (price > 0.001) {
        price = price.toFixed(2);
    } else {
        price = price.toFixed(8);
    }

    marketCap = marketCap.toFixed(2);
    volume = volume.toFixed(2);

    price = numberWithCommas(price);
    marketCap = numberWithCommas(marketCap);
    volume = numberWithCommas(volume);
    //change the values to strings
    price = price.toString();
    marketCap = marketCap.toString();
    volume = volume.toString();


    //description = description.toString();

    //description = insertTemplateLiteral(description);

    //add dollar signs
    price = "$" + price
    marketCap = "$" + marketCap
    volume = "$" + volume
        // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    marketCapEl.textContent = marketCap;
    volumeEl.textContent = volume;
    logoEl.src = logo;
    //descEl.textContent = description;

    // assign classes
    nameElLi.classList = ("coinList, col-2");
    priceElLi.classList = ("coinList, col-2");
    logoElLi.classList = ("coinList, col-2");
    marketCapElLi.classList = ("coinList, col-3");
    volumeElLi.classList = ("coinList, col-3");

    logoEl.height = 50;

    logoElLi.appendChild(logoEl);
    nameElLi.appendChild(nameEl);
    priceElLi.appendChild(priceEl);
    marketCapElLi.appendChild(marketCapEl);
    volumeElLi.appendChild(volumeEl);

    var El1 = document.createElement("li");
    var El2 = document.createElement("li");
    var El3 = document.createElement("li");
    var El4 = document.createElement("li");
    var El5 = document.createElement("li");

    El1.textContent = "Logo";
    El2.textContent = "Coin Name";
    El3.textContent = "Price";
    El4.textContent = "Market Cap";
    El5.textContent = "Volume";

    El1.classList = ("col-2");
    El2.classList = ("col-2");
    El3.classList = ("col-2");
    El4.classList = ("col-3");
    El5.classList = ("col-3");

    searchedEl.appendChild(El1);
    searchedEl.appendChild(El2);
    searchedEl.appendChild(El3);
    searchedEl.appendChild(El4);
    searchedEl.appendChild(El5);

    searchedEl.appendChild(logoElLi);
    searchedEl.appendChild(nameElLi);
    searchedEl.appendChild(priceElLi);
    searchedEl.appendChild(marketCapElLi);
    searchedEl.appendChild(volumeElLi);

    //descriptionEl.appendChild(descEl);
};

var displayAboutCoin = function(aboutCoin) {
    var aboutTextEl = document.getElementById("about-coin");
    if (aboutCoin) {
        aboutTextEl.textContent = aboutCoin;
    } else {
        aboutTextEl.textContent = "Coin data not found.";
    }
};

var displayTrendingData = function(name, price = 0, logo = 0) {
    // create elements for the functions
    var coinEl = document.createElement("li");
    var nameEl = document.createElement("p");
    var priceEl = document.createElement("p");
    var logoEl = document.createElement("img");

    if (price > 0.001) {
        price = price.toFixed(2);
        price = numberWithCommas(price);
    } else {
        price = price.toFixed(8);
    }

    price = "$" + price

    // assign the values
    nameEl.textContent = name;
    priceEl.textContent = price;
    logoEl.src = logo;

    // assign classes
    nameEl.classList = ("coinList");
    priceEl.classList = ("coinList");
    logoEl.classList = ("coinList");
    logoEl.height = 25;

    // make them the right sizes
    // nameEl.classList("col-5");
    // priceEl.classList("col-5");
    // logoEl.classList("col-2");

    coinEl.appendChild(logoEl);
    coinEl.appendChild(nameEl);
    coinEl.appendChild(priceEl);

    trendingEl.appendChild(coinEl);
    //console.log(coinEl)

};

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//coinInfo("bitcoin")

bitcoinPrice();
//trendingCoins();

var resetSearchedCoins = function() {
    var searchedListEl = document.getElementById("searched");
    searchedListEl.innerHTML = "";
};







// Start of script, initial event listener on search button
var renderNews = function() {
    var searchCoinName = document.querySelector("#submit-search");
    searchCoinName.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "#quick-look"

        var inputText = document.querySelector("#coinName");
        var coinName = inputText.value;

        saveCoinName(coinName);
        resetArticles();
        fetchNYT(coinName);
        coinInfo(coinName);

        inputText.value = "";
    });
    getSavedCoins();
};

// save unique searches, up to 5 total, to localStorage
var saveCoinName = function(coinName) {
    getSavedCoins();
    var tempSearchedCoins = [];
    tempSearchedCoins.push(coinName);

    if (searchedCoins != null) {
        if (searchedCoins.includes(coinName)) {} else {
            searchedCoins.push(coinName);
        }
        if (searchedCoins.length > 5) {
            searchedCoins.shift();
        }

        localStorage.setItem("searchedCoins", JSON.stringify(searchedCoins));
    } else {
        localStorage.setItem("searchedCoins", JSON.stringify(tempSearchedCoins));
    }
};

// retrieve saved searches, if any 
var getSavedCoins = function() {
    resetSearchedBtns();

    searchedCoins = JSON.parse(localStorage.getItem("searchedCoins"));

    if (searchedCoins) {
        var lastSearch = searchedCoins[searchedCoins.length - 1];
        fetchNYT(lastSearch);
    }

    // render the list of previous searches as button
    if (searchedCoins) {
        var listEl = document.querySelector("#recent-searches");

        for (var i = 0; i < searchedCoins.length; i++) {
            var listItem = document.createElement("li");

            var listButton = document.createElement("button");
            listButton.className = "btn btn-outline-success my-2 my-sm-0";
            listButton.setAttribute("type", "submit");
            listButton.setAttribute("id", "coin-" + [i]);
            listButton.textContent = searchedCoins[i];

            listItem.append(listButton);
            listEl.append(listItem);
        }

        var index = searchedCoins.length - 1;
        coinInfo(searchedCoins[index]);
    } else {
        var listItem = document.createElement("li");
        listItem.textContent = "No recently saved searches."

        var listEl = document.getElementById("recent-searches");
        listEl.appendChild(listItem);
    }

    var coin1 = document.getElementById("coin-0");
    var coin2 = document.getElementById("coin-1");
    var coin3 = document.getElementById("coin-2");
    var coin4 = document.getElementById("coin-3");
    var coin5 = document.getElementById("coin-4");

    // Set button event listeners, refresh all page info with the coin info for the past search selected
    if (coin1) {
        coin1.addEventListener("click", function(event) {
            fetchNYT(coin1.textContent);
            coinInfo(coin1.textContent);
        });
    }
    if (coin2) {
        coin2.addEventListener("click", function(event) {
            fetchNYT(coin2.textContent);
            coinInfo(coin2.textContent);
        });
    }
    if (coin3) {
        coin3.addEventListener("click", function(event) {
            fetchNYT(coin3.textContent);
            coinInfo(coin3.textContent);
        });
    }
    if (coin4) {
        coin4.addEventListener("click", function(event) {
            fetchNYT(coin4.textContent);
            coinInfo(coin4.textContent);
        });
    }
    if (coin5) {
        coin5.addEventListener("click", function(event) {
            fetchNYT(coin5.textContent);
            coinInfo(coin5.textContent);
        });
    }
    return searchedCoins;
};

var resetSearchedBtns = function() {
    var listEl = document.querySelector("#recent-searches");
    listEl.innerHTML = "";
};

// Clear articles before rendering more articles
var resetArticles = function() {
    var articles = document.querySelector("#news");
    articles.innerHTML = "";
}

// Render list and anchor elements to news articles
var displayNytArticles = function(article) {
    resetArticles();

    var articles = document.querySelector("#news");

    for (var i = 0; i < 5; i++) {
        var articleLink = document.createElement("li");
        articleLink.setAttribute("id", "article-list-item-" + [i]);
        var articleHeadline = document.createElement("a");

        if (article.response.docs.length > 0) {
            if (article.response.docs[i].headline.print_headline) {
                articleHeadline.setAttribute("href", article.response.docs[i].web_url);
                articleHeadline.textContent = article.response.docs[i].headline.print_headline;
            } else if (article.response.docs[i].snippet) {
                articleHeadline.setAttribute("href", article.response.docs[i].web_url);
                articleHeadline.textContent = article.response.docs[i].snippet;
            }
        } else {
            articleHeadline.textContent = "No recent articles found.";
            return;
        }

        articleLink.append(articleHeadline);
        articles.append(articleLink);
    }
};

// Fetch cryptocurrency related news articles
var fetchNYT = function(coinName) {
    var nytApiKey = "LCyA6VYEUWEMBexw7HmmAlPdPJopvG9G";
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=financial&q=" + coinName + "&api-key=" + nytApiKey;

    fetch(apiUrl).then(function(response) {
        return response.json();
    }).then(function(article) {
        displayNytArticles(article);
    })
};

// start news portion of the script
renderNews();