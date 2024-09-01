const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  // Wrap the entire HTML content in backticks to use a multi-line string
  res.end(`
 <figure class="table" style="width:36.61%;">
    <table class="ck-table-resized" style="border-color:hsl(0, 0%, 0%);border-style:solid;">
        <colgroup>
            <col style="width:35.58%;">
            <col style="width:35.13%;">
            <col style="width:29.29%;">
        </colgroup>
        <tbody>
            <tr>
                <td>Name</td>
                <td>Address</td>
                <td>City</td>
            </tr>
            <tr>
                <td>Matti Meik&aumll&aumlinen</td>
                <td>Timotie 1, as 10</td>
                <td>Tampere</td>
            </tr>
            <tr>
                <td>Maija Virtanen</td>
                <td>Asematie 12</td>
                <td>Kiljava</td>
            </tr>
        </tbody>
    </table>
</figure>
<p>&nbsp;</p>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
