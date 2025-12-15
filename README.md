# FRAM - Sustainable Food Delivery

A simple website where people can order fresh food from local farms.

## What You Need

- **Node.js** - Download from https://nodejs.org
- **A code editor** - VS Code is good for beginners: https://code.visualstudio.com

## How to Run

1. Open PowerShell and go to the project folder:
   ```powershell
   cd C:\Users\ramin\Desktop\Nazila\food-webshop
   ```

2. Install everything needed:
   ```powershell
   npm install
   ```

3. Start the website:
   ```powershell
   npm start
   ```

4. Open your browser and go to: **http://localhost:8080**

That's it! The website should now be running.

## If Port 8080 is Busy

```powershell
$env:PORT=3000
npm start
```

Then open http://localhost:3000

## Files in This Project

- **index.html** - Home page
- **products.html** - Products page  
- **chat.html** - Chat page
- **css/style.css** - All the colors and styling
- **js/main.js** - Shopping cart and menu code
- **server.js** - Makes the website run

## Shopping Cart

Click "Add to basket" on any product. The green circle shows how many items you added. Click it to reset.

## Chat Feature (Optional)

The chat needs an API key from OpenAI. To use it:

```powershell
$env:OPENAI_API_KEY="your-key-here"
npm start
```

Get a key at: https://platform.openai.com

**Don't have a key?** No problem! Everything else still works.

## Problems?

- **"npm is not recognized"** - Install Node.js first
- **Port error** - Use a different port (see "If Port 8080 is Busy")
- **Chat doesn't work** - You need an API key (see above)
- **Page won't load** - Make sure you ran `npm install` first

## Want to Change Something?

- **Colors**: Edit `:root` section in `css/style.css`
- **Text**: Edit the .html files
- **Products**: Copy a product card in `products.html` and change the details

That's all you need to know!
