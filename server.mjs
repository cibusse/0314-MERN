import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* import { createServer } from "http";

createServer (function(request, response) {
  response.writeHead(200,{ "Content-Type": text/html});
  console.log (request.url);

  if (request.url === "/"){
    response.write ("Visitor's guestbook");
  } else if (request.url === "/newmessage"){
    response.write ("Leave a message");
  } else if (request.url === "/guestbook"){
    response.write ("Saving your message");
  } else if (request.url === "/ajaxmessage"){
    response.write ("Message successfully saved!");
  } else   {
    response.write("Wrong page!");
  }

  response.end();

})
.listen(8081);
 */