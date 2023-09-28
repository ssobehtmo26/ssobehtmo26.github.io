const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Initialize the count variable
let count = 0;

// Create an HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Serve the HTML page
    if (parsedUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    
    // Handle form submission
    else if (parsedUrl.pathname === '/submit' && req.method === 'POST') {
        let requestBody = '';
        
        req.on('data', (data) => {
            requestBody += data;
        });
        
        req.on('end', () => {
            const formData = querystring.parse(requestBody);
            
            // Handle the form data (e.g., save it, process it)
            
            // Increment the count variable
            count++;
            
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Form submitted. Total submissions: ${count}`);
        });
    }
    
    // Handle other routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
