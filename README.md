# MS Discord Community Website

A modern web application built with Next.js that serves as the official website for the MS Discord community. This website provides information about our community, displays member status, and tracks voice activity statistics.

## Features

- **Dynamic Theme Switching**: Support for light and dark modes with smooth transitions
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Real-time Member Status**: 
  - View online/offline status of community members
  - See member activities and Spotify integration
  - Platform indicators (desktop, web, mobile)
- **Voice Activity Tracking**:
  - Leaderboard for voice channel participation
  - Detailed statistics with duration tracking
- **Interactive UI Components**:
  - Progressive text reveal animations
  - Smooth scrolling indicators
  - Motion-based transitions and effects

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **Icons**: React Icons
- **Analytics**: Vercel Analytics

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
```env
API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the site

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── members/       # Members page
│   └── top-voice/     # Voice stats page
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   └── ...           # Feature-specific components
└── lib/              # Utility functions
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is private and maintained by the MS Discord community.

## Credits

Built with 🐈 by [iaMJ](https://github.com/idMJA) using Next.js and Tailwind CSS
