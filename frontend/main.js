

document.getElementById('shortenForm').addEventListener('submit', function (event) {
  event.preventDefault();
  shortenLink();
});
const token = localStorage.getItem("token")
function shortenLink() {
  console.log("button click")
  const original_url = document.getElementById('longUrl').value;
  const expiresAT = document.getElementById('expiry').value || null;
  fetch('https://practice-dmzg.onrender.com/url/shortit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `${token}`
    },
    body: JSON.stringify({ original_url, expiresAT })
  })
    .then(response => response.json())
    .then(data => {
      const shortUrl = data.shortUrl;
      document.getElementById('shortenedUrl').value = shortUrl;
      document.getElementById('urlBox').style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    });
}

// for QR code also
document.getElementById('qrButton').addEventListener('click', function () {
  // const qrImage = document.getElementById('qrImage');
  const original_url = document.getElementById('longUrl').value;
  const expiresAT = document.getElementById('expiry').value || null;
  fetch('https://practice-dmzg.onrender.com/url/shortit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `${token}`
    },
    body: JSON.stringify({ original_url, expiresAT })
  })
    .then(response => response.json())
    .then(data => {
      // console.log("qrCodeUrl", qrCodeUrl)
      // const qrImagePopup = document.getElementById('qrImage');
      const qrCodeBase64 = data.qrCode; // This should contain 'data:image/png;base64,...'

      if (qrCodeBase64.startsWith("data:image/png;base64,")) {
        document.getElementById('qrPopupImage').src = qrCodeBase64; // Set Base64 image
        document.getElementById('qrModal').style.display = "flex"; // Show modal
    } else {
        alert("QR code format is incorrect or not generated!");
    }

    }).catch(error => {
      console.error('Error fetching QR code:', error);
      alert("An error occurred while generating the QR code. Please try again.");
    });


});

// gr code logic open the modal
// Close modal when clicking '×' button
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('qrModal').style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener('click', function (event) {
  const modal = document.getElementById('qrModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById('copyButton').addEventListener('click', function () {
  const copyText = document.getElementById('shortenedUrl');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value)
    .then(() => {
      alert("Copied the URL: " + copyText.value);
    })
    .catch(err => {
      console.error('Error copying text: ', err);
    });
});

function updateCopyButtonVisibility() {
  var inputVal = document.getElementById('shortenedUrl').value;
  var copyButton = document.getElementById('copyButton');
  copyButton.style.display = inputVal.length > 0 ? 'inline-block' : 'none';
}

setTimeout(function () {
  document.getElementById('shortenedUrl').value = "https://example.com/short";
  updateCopyButtonVisibility();
}, 2000);

document.getElementById('copyButton').addEventListener('click', function () {
  var copyText = document.getElementById('shortenedUrl');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value)
    .then(() => alert("Copied the URL: " + copyText.value))
    .catch(err => console.error('Error copying text: ', err));
});

// fetch the link history
document.getElementById("myLinksButton").addEventListener("click", function (event) {
  event.preventDefault();

  // fetch("http://localhost:2103/url/history") // Replace with your actual API endpoint
  // .then(response => response.json())
  // .then(data => {
  //     console.log("Fetched Links:", data); // Debugging
  //     displayLinks(data);
  // })
  fetch("https://practice-dmzg.onrender.com/url/history", {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      "authorization": `${token}`
    },
    // body: JSON.stringify({ original_url, expiresAT })
  })
  .then(response => response.json())
    .then(data => {
      
      console.log("Fetched Links:", data); // Debugging
      displayShortUrls(data);
    })
  .catch(error => {
      console.error("Error fetching links:", error);
      alert("Failed to fetch links. Please try again.");
  });
});

function displayShortUrls(links) {
  const linksList = document.getElementById("linksList");
  linksList.innerHTML = ""; // Clear previous list

  if (links.length === 0) {
      linksList.innerHTML = "<p>No links found.</p>";
      return;
  }

  links.forEach(link => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${link.shorturls}" target="_blank">${link.shorturls}</a>`;
      linksList.appendChild(li);
  });
}