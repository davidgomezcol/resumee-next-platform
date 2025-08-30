# David Gómez - Personal Portfolio

A modern, responsive personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This portfolio showcases David Gómez's work experience, skills, and services as a Full-Stack Developer and AI Enthusiast.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive layout that works on all devices
- **Multi-language Support**: English and Spanish language support
- **Dynamic Content**: Work experience, skills, and services sections
- **Contact Form**: Functional contact form with Netlify integration
- **Theme Support**: Multiple color themes (Light, Dark, Aqua, Retro)
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Built-in SEO features with Next.js

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Deployment**: Netlify with Edge Functions
- **Content Management**: JSON-based content structure
- **Icons**: Custom SVG icons and icon system
- **Animations**: CSS animations and React hooks for smooth interactions

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── Contact/        # Contact form components
│   ├── Hero/           # Hero section components
│   ├── Navbar/         # Navigation components
│   ├── Services/       # Services section components
│   ├── Skills/         # Skills display components
│   ├── WorkExperience/ # Work experience components
│   └── UI/             # Basic UI components
├── contexts/           # React contexts (Language)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and translations
├── services/           # Data fetching services
└── utils/              # Helper utilities

content/                # JSON content files
├── work-experience/    # Work experience data
├── projects/           # Project showcase data
└── testimonials/       # Testimonial data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resumee-next-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is optimized for deployment on Netlify with the following features:

- **Netlify Edge Functions**: For server-side functionality
- **Image Optimization**: Using Next.js Image component
- **Static Generation**: Optimized for performance
- **Form Handling**: Netlify Forms integration

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

## 📝 Content Management

The portfolio content is managed through JSON files in the `content/` directory:

- **Work Experience**: Edit `content/work-experience/` files
- **Projects**: Edit `content/projects/` files  
- **Testimonials**: Edit `content/testimonials/` files

## 🎨 Customization

### Themes
The site supports multiple themes defined in `src/appData/index.ts`:
- Light
- Dark  
- Aqua
- Retro

### Languages
Currently supports English and Spanish. Add new languages in `src/lib/translations.ts`.

### Skills & Services
Update skills and services in `src/appData/index.ts`.

## 📧 Contact

- **LinkedIn**: [David Gómez](https://www.linkedin.com/in/davidgomezm7/)
- **GitHub**: [davidgomezcol](https://github.com/davidgomezcol)

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ using Next.js and Tailwind CSS
