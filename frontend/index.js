function shortenLink() {
    let longUrl = document.getElementById("longUrl").value;
    let expiry = document.getElementById("expiry").value;

    if (!longUrl) {
        alert("Please enter a valid URL.");
        return;
    }
    if (!expiry) {
        alert("Please select an expiry date and time.");
        return;
    }

    // Simulating short URL (replace this with actual API call)
    let shortUrl = "https://short.ly/" + Math.random().toString(36).substr(2, 6);

    document.getElementById("shortenedUrl").innerHTML = `Shortened Link: <a href="${shortUrl}" target="_blank">${shortUrl}</a><br>Expires on: ${expiry}`;
}