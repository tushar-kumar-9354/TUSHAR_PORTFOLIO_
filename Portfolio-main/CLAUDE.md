# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based 3D portfolio website built with Create React App, featuring interactive 3D models and animations using Three.js and React Three Fiber.

## Commands

### Development
```bash
npm start          # Start development server on http://localhost:3000
npm run build      # Create production build in ./build directory
npm test           # Run tests with Jest
```

### Installation
```bash
npm install        # Install all dependencies
```

## Architecture

### Core Stack
- **React 18.2.0** with React Router DOM for SPA routing
- **Three.js** ecosystem (@react-three/fiber, @react-three/drei) for 3D graphics
- **Tailwind CSS** for styling with custom configuration
- **EmailJS** for contact form functionality
- **Material-UI** components for UI elements

### Project Structure
```
src/
├── components/       # UI components and page components
│   ├── HomeInfo.jsx # Homepage info boxes
│   ├── Navbar.jsx   # Navigation component
│   ├── CTA.jsx      # Call-to-action sections
│   ├── Alert.jsx    # Alert notification system
│   └── Loader.jsx   # Loading spinner
├── models/          # 3D model components
│   ├── Bird.jsx     # Animated bird model
│   ├── Dragon.jsx   # Dragon model for contact page
│   ├── Island.jsx   # Main island scene
│   ├── Plane.jsx    # Animated plane model
│   └── Sky.jsx      # Sky background model
├── pages/           # Route page components
│   ├── Home.jsx     # Landing page with 3D island
│   ├── About.jsx    # About section with timeline
│   ├── Project.jsx  # Projects showcase
│   └── Contact.jsx  # Contact form with EmailJS
├── assets/          # Static resources
│   ├── 3d/         # GLTF/GLB 3D models
│   ├── icons/      # SVG and PNG icons
│   ├── images/     # Project screenshots and logos
│   └── sound/      # Audio files (theme.mp3)
└── hooks/          # Custom React hooks
    └── useAlert.js  # Alert state management
```

### Key Patterns

1. **3D Model Loading**: Uses `useGLTF` from @react-three/drei to load .glb files
2. **Responsive Design**: Screen size detection in components for adaptive rendering
3. **Animation**: React Spring for 3D animations, CSS transitions for UI
4. **State Management**: Local component state, no global state management
5. **Routing**: Client-side routing with React Router v6

### Important Configurations

**Tailwind Config** (tailwind.config.js):
- Custom colors: blue, black, night variations
- Custom font: Poppins
- Extended shadows for 3D card effects

**EmailJS Integration** (Contact.jsx):
- Service ID: `service_3wdqgrx`
- Template ID: `template_m7xxkab`
- Public Key: `CQHEgBBdazlz0FNeG`

### Development Notes

1. **3D Performance**: Heavy 3D models may impact performance on lower-end devices
2. **Mobile Optimization**: Components check `isMobile` for reduced complexity
3. **Audio**: Background music with user-controlled playback
4. **No TypeScript**: Project uses JavaScript with PropTypes for some components
5. **No Environment Variables**: Credentials are hardcoded (consider using .env)

### Common Tasks

- **Adding a new project**: Update the projects array in Project.jsx
- **Modifying 3D models**: Replace .glb files in assets/3d/ and update corresponding model components
- **Changing contact form**: Modify Contact.jsx and update EmailJS template
- **Adding new routes**: Update App.js with new Route components
- **Customizing styles**: Edit tailwind.config.js or add classes to index.css