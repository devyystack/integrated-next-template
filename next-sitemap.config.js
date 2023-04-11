/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITEURL || 'https://www.lainaraumalingerie.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
};

export default config;
