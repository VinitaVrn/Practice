

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
      
      const qrCodeBase64 = data.qrCode; 

      if (qrCodeBase64.startsWith("data:image/png;base64,")) {
        document.getElementById('qrPopupImage').src = qrCodeBase64; 
        document.getElementById('qrModal').style.display = "flex"; 
    } else {
        alert("QR code format is incorrect or not generated!");
    }

    }).catch(error => {
      console.error('Error fetching QR code:', error);
      alert("An error occurred while generating the QR code. Please try again.");
    });

});

// gr code logic open the modal

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
}, 4000);

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

 
  fetch("https://practice-dmzg.onrender.com/url/history", {
    method: 'GET',
    headers: {
      
      "authorization": `${token}`
    },
    
  })
  .then(response => response.json())
    .then(data => {
      
      console.log("Fetched Links:", data); 
      displayShortUrls(data);
    })
  .catch(error => {
      console.error("Error fetching links:", error);
      alert("Failed to fetch links. Please try again.");
  });
});

function displayShortUrls(data) {
  const linksList = document.getElementById("linksList");
  linksList.innerHTML = ""; 

  if (data.length === 0) {
      linksList.innerHTML = "<p>No links found.</p>";
      return;
  }

  data.forEach(link => {
      // Create a container for each link
      const box = document.createElement("div");
      box.classList.add("link-box"); // Add CSS class for styling

      // Format last_clicked date
      const lastClicked = link.last_clicked 
          ? new Date(link.last_clicked).toLocaleString() 
          : "Never Clicked";

      // Create the inner HTML structure
      box.innerHTML = `
          <p><strong>Short URL:</strong> <a href="${link.shorturls}" target="_blank">${link.shorturls}</a></p>
          <p><strong>Clicks:</strong> ${link.clicks}</p>
          <p><strong>Last Clicked:</strong> ${lastClicked}</p>
      `;

      // Append box to the links list container
      linksList.appendChild(box);
  });
}
