# Dusk

Custom Ghost theme based on Dawn with a dark-first approach.

## Custom Features

- **Custom background colors** - Set your own site background color via theme settings
- **White logo for dark mode** - Separate logo option that displays when dark mode is active  
- **Changelog section** - Optional changelog/updates section on homepage (toggleable)
- **Dark mode enhancements** - Improved dark mode icons and styling

## Development

Styles are compiled using Gulp/PostCSS. We use mise to manage Node versions and npm for package management. From the theme's root directory:

```bash
# Install dependencies
npm install

# Run build & watch for changes
npm run dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

## License

MIT
