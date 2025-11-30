# Screenshot Capture

A modern web application built with Next.js that captures screenshots of websites with customizable options including theme selection, image format, and viewport dimensions.

## Features

- 📸 Capture screenshots of any website
- 🎨 Theme support (light/dark mode)
- 🖼️ Multiple image formats (PNG, JPEG, WebP)
- 📐 Custom viewport dimensions
- 🖥️ Full-page or viewport-based screenshots
- ⚡ Built with Next.js 16 and React 19
- 🎯 Powered by Puppeteer for reliable screenshot capture
- 💅 Styled with Tailwind CSS and Radix UI components

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Screenshot Engine:** Puppeteer
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Theme:** next-themes
- **Package Manager:** pnpm

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 20 or higher recommended)
- **pnpm** (version 8 or higher)

If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
```

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/octacn/screenshot-capture.git
cd screenshot-capture
```

### 2. Install Dependencies

Install all required dependencies using pnpm:

```bash
pnpm install
```

This will install all the necessary packages including Puppeteer, which will automatically download the required Chromium browser.

### 3. Run the Development Server

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production (Optional)

To create a production build:

```bash
pnpm build
```

To run the production build:

```bash
pnpm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter the URL of the website you want to capture
3. Configure the screenshot options:
   - **Theme:** Choose between light or dark mode
   - **Image Format:** Select PNG, JPEG, or WebP
   - **Viewport Dimensions:** Set custom width and height
   - **Full Page:** Toggle to capture the entire page or just the viewport
4. Click the capture button to generate your screenshot
5. Preview and download the captured image

## Project Structure

```
screenshot-capture/
├── app/                    # Next.js app directory
│   ├── (app)/             # App routes
│   │   ├── page.tsx       # Home page
│   │   └── preview/       # Preview page
│   ├── api/               # API routes
│   │   └── screenshot/    # Screenshot capture endpoint
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components (buttons, inputs, etc.)
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## API Endpoints

### POST `/api/screenshot`

Captures a screenshot of the provided URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "theme": "light",
  "imageType": "png",
  "width": 1920,
  "height": 1080,
  "fullPage": false
}
```

**Response:**
Returns the screenshot image as a buffer with appropriate content-type header.

## Environment Variables

Currently, this project does not require any environment variables to run locally. All configuration is done through the UI.

## Troubleshooting

### Puppeteer Installation Issues

If you encounter issues with Puppeteer installation:

```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
pnpm dev -- -p 3000
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not currently licensed for public use.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Screenshots powered by [Puppeteer](https://pptr.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)