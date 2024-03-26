const puppeteer = require('puppeteer');

async function fetchGeeksforGeeksContent(topic) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to GeeksforGeeks search page
  console.log(`https://www.geeksforgeeks.org/?s=${topic}`)
  await page.goto(`https://www.geeksforgeeks.org/?s=${topic}`);
  

  // Wait for search results to load
  await page.waitForSelector('.ResultArticle_articleContainer__headerLink___pap7');

  // Click the first search result
  await page.click('.ResultArticle_articleContainer__headerLink___pap7');

  // Wait for article content to load
  await page.waitForSelector('.text');

  // Extract the text content of the article
  const articleContent = await page.$$eval('p', content =>{
    return content.slice(0,5).map(p=>p.textContent.trim()).join(' ')}
  );
 

  // Close the browser
  await browser.close();

  return articleContent;
}

// Example usage:
const c="Chemistry"
fetchGeeksforGeeksContent(c)
  .then(content => {
    // Display the content on your website
    console.log("\nDisplaying "+c+" content:\n");
    console.log(content);
  })
  .catch(error => console.error(error));
