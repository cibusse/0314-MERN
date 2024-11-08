const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Use built-in body parsers to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

/* Home */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

/* Guestbook */
app.get('/guestbook', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(__dirname + '/guestbookdata.json', 'utf8'));

    let results = `
      <link rel="stylesheet" href="/stylesheets/guestbook.css">
      <button class="btn btn-link" onclick="history.back()"> &#8592;Go Back</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>`;

    data.forEach((entry) => {
      results += `
        <tr>
          <td>${entry.id}</td>
          <td>${entry.username}</td>
          <td>${entry.country}</td>
          <td>${entry.message}</td>
        </tr>`;
    });

    results += '</tbody></table>';
    res.send(results);
  } catch (error) {
    console.error("Error reading guestbook data:", error);
    res.status(500).send("Error: Unable to load guestbook data.");
  }
});

/* New Message */
app.get('/newmessage', (req, res) => {
  res.sendFile(__dirname + '/public/newmessage.html');
});

app.post('/newmessage', (req, res) => {
  const { username, country, message } = req.body;

  if (!username || !country || !message) {
    console.error("One or more fields are missing!");
    res.status(400).send("Error: All fields are required.");
    return;
  }

  console.log(`Username: ${username}\nCountry: ${country}\nMessage: ${message}`);
  res.redirect('/ajaxmessage');
});

/* Ajax Message */
app.get('/ajaxmessage', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./guestbookdata.json', 'utf8'));

    let results = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="/stylesheets/guestbook.css">
      </head>
      <body>
        <h3>Guestbook messages</h3>
        <table>
          <tr>
            <th>Username</th>
            <th>Country</th>
            <th>Date</th>
            <th>Message</th>
          </tr>`;

    data.forEach((entry) => {
      results += `
        <tr>
          <td>${entry.username}</td>
          <td>${entry.country}</td>
          <td>${entry.date}</td>
          <td>${entry.message}</td>
        </tr>`;
    });

    results += `
        </table>
      </body>
      </html>`;

    res.send(results);
  } catch (error) {
    console.error("Error reading guestbook data:", error);
    res.status(500).send("Error: Unable to load guestbook data.");
  }
});

app.post('/ajaxmessage', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./guestbookdata.json', 'utf8'));

    const newEntry = {
      username: req.body.username,
      country: req.body.country,
      message: req.body.message,
      date: new Date().toLocaleString(),
    };

    data.push(newEntry);

    fs.writeFile('./guestbookdata.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Failed to save message:', err);
        res.status(500).send("Error: Unable to save the message.");
        return;
      }
      console.log('Message saved successfully!');

      let results = `
      <h3>Guestbook messages</h3>  
      <table>
          <tr>
            <th>Username</th>
            <th>Country</th>
            <th>Date</th>
            <th>Message</th>
          </tr>`;

      data.forEach((entry) => {
        results += `
          <tr>
            <td>${entry.username}</td>
            <td>${entry.country}</td>
            <td>${entry.date}</td>
            <td>${entry.message}</td>
          </tr>`;
      });

      results += `</table>`;

      res.send(results);
    });
  } catch (error) {
    console.error("Error updating guestbook data:", error);
    res.status(500).send("Error: Unable to update guestbook data.");
  }
});

/* Page NOT found */
app.get('*', (req, res) => {
  res.status(404).send("Page not found");
});

/* localhost */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
