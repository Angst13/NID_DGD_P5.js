# Copilot Instructions for PlayfulMedia

This project is a simple p5.js sketch setup for creative coding in the browser. It uses the p5.js and p5.sound.js libraries, loaded from the local `libraries/` directory. The main entry point is `index.html`, which loads `sketch.js` for all custom code and `style.css` for basic styling.

## Project Structure
- `index.html`: Loads p5.js, p5.sound.js, and the main sketch. Minimal HTML, all logic is in JS.
- `sketch.js`: Main code file. Defines `setup()` and `draw()` for p5.js. Add all interactive or generative code here.
- `libraries/`: Contains local copies of `p5.min.js` and `p5.sound.min.js`.
- `style.css`: Basic CSS for layout. Canvas is set to `display: block` and no page margins.
- `jsconfig.json`: Configures JS language features and includes p5.js type definitions for better editor support.

## Key Conventions
- All custom code should go in `sketch.js`. Use p5.js lifecycle functions (`setup`, `draw`, etc.).
- To add new libraries, place them in `libraries/` and load them in `index.html`.
- Use only relative paths for scripts and styles in `index.html`.
- No build step: edit files directly and open `index.html` in a browser to run.
- For type hints in VS Code, ensure the p5 type definitions path in `jsconfig.json` is correct.

## Developer Workflow
- **Edit**: Change `sketch.js` and `style.css` as needed.
- **Run**: Open `index.html` in a browser. No server or build tools required.
- **Add libraries**: Download JS files to `libraries/` and add `<script src="libraries/yourlib.js"></script>` to `index.html`.
- **Debug**: Use browser dev tools. Console logs and breakpoints work as expected.

## Examples
- To add a new shape, edit `draw()` in `sketch.js`:
  ```js
  function draw() {
    background(220);
    ellipse(250, 500, 100, 100);
  }
  ```
- To use p5.sound, call its functions in `sketch.js` after loading `p5.sound.min.js` in `index.html`.

## References
- [p5.js Reference](https://p5js.org/reference/)
- [p5.sound Reference](https://p5js.org/reference/#/libraries/p5.sound)

---
If you add new files or change the structure, update this file to help future AI agents and developers.
