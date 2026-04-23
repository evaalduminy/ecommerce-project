const fs = require('fs');
const https = require('https');

const screens = [
  { name: 'landing_page', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ1OTA2NDlkNTEzMDQ2ZmY5YTc3ZDQzOGEyNzA2OTJiEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'all_products', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE0MmY1MTcyZDFhMTQxNzM5N2JhYjViZmI1MzM0YTRhEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'product_details', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2EwNmE0NDBlZjVlYTQ1YTM4MDU0ZTQzZjdlNDM3OTAyEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'shopping_cart', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQxMDg5ZDVjNWRkZTRhN2JhNWVlNTYyYWZiZjE4NjE2EgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'order_confirmation', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNhZjc0ZGZjOGI4MTQ0YTRiOWZjOGRmYTE4ZmJkNDBmEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'vendor_dashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc2Mzg0ZmFlNjcyYzQwM2JiYWU0MjE3YmQyOGI5M2M2EgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'admin_dashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU3MzhkYzliODQxYTRkMGViNjY2OGFmNzEzMGJhNWU2EgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'manage_profile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzM1YzQ1YmI4YWNkOTQzMzU5YTlhMDQ0YjUzM2UzYzU0EgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'sneaker_shop_landing_page', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzgyMzE0MTAwOWVlNzQ5Njc4YmEwYTQwYTgyZDAwYzAzEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'sneaker_product_details', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQzMWMzMzQ4YTYxZDQ0NWRiMjQ5NzUzY2ZiNzhjMjcwEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'admin_analytics_dashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q3ZmYxOTZiZTE4ODRkMDY4MzQ3ZmIwYzdiNjdkMGI0EgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' },
  { name: 'vendor_product_management', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJhZTIyYWZiNzM5YjQwOWY5ZTU2ODJhZWRiNGVhNTFhEgsSBxDQ_ZTFiQYYAZIBIwoKcHJvamVjdF9pZBIVQhM1NjcwNDA0NTA5NTU2NTgwNzQ2&filename=&opi=89354086' }
];

if (!fs.existsSync('./frontend/src/StitchUI')){
    fs.mkdirSync('./frontend/src/StitchUI', { recursive: true });
}

screens.forEach(screen => {
  https.get(screen.url, (res) => {
    const file = fs.createWriteStream(`./frontend/src/StitchUI/${screen.name}.html`);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${screen.name}`);
    });
  });
});
