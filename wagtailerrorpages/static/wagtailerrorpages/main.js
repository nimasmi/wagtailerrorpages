(function(){

  var getReferrerDomain = function() {
    var referrer = document.referrer;
    if (referrer == "") return referrer;
    referrer = referrer.split('/')[2].toLowerCase();
    if (referrer.substring(0, 4) == "www.") {
      referrer = referrer.substring(4, referrer.length);
    }
    return referrer;
  }

  var setMessageText = function(message) {
    var messageElement = document.getElementById(messageId);
    messageElement.innerHTML = message;
  }

  var determineMessage = function() {
    var referrer = getReferrerDomain();
    var mySite = window.location.host;

    if (referrer == "") {
      return messages["direct"];
    }

    if (referrer == mySite) {
      return messages["internal"];
    }

    for (i in searchEngines) {
      if (searchEngines[i] == referrer) {
        return messages["search"];
      }
    }

    return messages["external"];
  }

  var messages = {
    "internal": "We&rsquo;re sorry! There&rsquo;s something wrong with our site right now, and we&rsquo;ve sent you to a page that doesn&rsquo;t exist.",
    "external": "You seem to have visited an outdated link from <strong>" + getReferrerDomain() + "</strong>.",
    "search": "It seems that <strong>" + getReferrerDomain() + "</strong> has an outdated index of the page you&rsquo;re looking for.",
    "direct": "You may have visited an outdated bookmark or mistyped the URL for this page."
  }

  var searchEngines = [
    "google.com",
    "search.yahoo.com",
    "duckduckgo.com",
    "bing.com",
    "ask.com",
    "search.aol.com"
  ]

  var messageId = "error-404";

  var message = determineMessage();
  if (message) {
    setMessageText(message);
  }

})();
