# Password Generator

A secure, customizable password generator built with pure HTML, CSS, and JavaScript.  
Designed with a clean, accessible terminal-style interface for both desktop and mobile users.

## Status

**Status:** COMPLETE  
**Last Updated:** *(add date manually)*

## Tech Stack

- HTML (Semantic, Accessible)
- CSS (Dark cyan and yellow theme, responsive)
- JavaScript (Vanilla)

## Features

| Feature | Status |
|--------|--------|
| Generate secure passwords | Implemented |
| Select uppercase, lowercase, numbers, symbols | Implemented |
| Adjustable password length (4–20 characters) | Implemented |
| Copy to clipboard | Implemented |
| Password strength indicator | Implemented |
| Accessible ASCII-style checkboxes | Implemented |
| Responsive mobile and desktop layouts | Implemented |
| Terminal-style UI aesthetic | Implemented |
| Modular JavaScript structure | Implemented |

## Frontend Overview

### HTML

- Semantic structure with accessible labels and ARIA roles
- Clear separation between form controls and output display

### CSS

- Custom theme using dark cyan backgrounds and yellow text
- Fully responsive for mobile and desktop
- Separate `styles.css` (desktop) and `styles-mobile.css` (mobile)
- No scanlines, flicker, or unnecessary animations

### JavaScript

- Generates passwords based on user-selected options
- Form validation with input trimming
- Copy-to-clipboard functionality with visual feedback
- Password strength assessment
- Blinking cursor animation at the end of generated passwords
- Modular event-driven code for maintainability

## Accessibility Features

- ASCII-style checkboxes with proper ARIA attributes
- Semantic HTML structure
- High visual contrast for readability
- Focusable and accessible interactive elements

## Planned Improvements

- Add Progressive Web App (PWA) support
- Add favicon and branding
- Add preset generation modes (e.g., PINs, passphrases)

## Additional Notes

- Frontend-only application, no backend or database
- Mobile-first responsive design
- Modular and clean codebase for easy extension
- Developed using Git for version control from project start
- Focus on accessibility, usability, and clean UI principles

## How to Use

1. Select desired character options (uppercase, lowercase, numbers, symbols).
2. Set the password length between 4 and 20 characters.
3. Click "Generate Your Password."
4. Copy the generated password using the button or by clicking the text.
