/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.laperitum.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/admin',
    '/admin/*',
    '/signup',
    '/update-password',
    '/providers',
    '/login',
    '/api',
    '/api/*'
  ], // Exclude admin and auth-related pages and API routes from sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/admin',
          '/admin/*',
          '/signup',
          '/update-password',
          '/providers',
          '/login',
          '/api',
          '/api/*'
        ], // Block these pages from all crawlers
      },
      {
        userAgent: 'Googlebot',
        allow: '/', // Allow Googlebot everywhere else
      },
    ],
  },
};