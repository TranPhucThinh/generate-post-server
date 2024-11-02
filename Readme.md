project-root/
│
├── src/
│   ├── app.ts               # Main application entry point
│   ├── config/
│   │   ├── config.ts        # Configuration settings (e.g., dotenv, port settings)
│   │   └── database.ts      # Database connection setup
│   ├── routes/
│   │   └── articleRoutes.ts # Defines all article-related routes
│   ├── controllers/
│   │   └── articleController.ts # Controller logic for article scraping
│   ├── services/
│   │   ├── scrapeService.ts # Scraping logic using Puppeteer
│   │   └── aiService.ts     # AI generation logic using GoogleGenerativeAI
│   └── types/
│       └── article.d.ts     # TypeScript definitions for article structure
│
├── .env                     # Environment variables (e.g., API keys, PORT, DB credentials)
├── package.json
└── tsconfig.json            # TypeScript configuration
# generate-post-server
