# ConceptLab 10

A modular, static Class 10 Mathematics and Science learning website.

## Project rules

- The website shell is a single `index.html` with its HTML, CSS and JavaScript inline.
- Every experiment is a separate JavaScript ES module.
- There are intentionally **no bundled sample experiments, fake chapter cards, placeholder labs or prewritten demo modules**.
- The experiment list is created only from `.js` files that exist in the subject folders and pass module validation.
- Each experiment runs inside its own Shadow DOM, so its CSS cannot leak into the site or another experiment.
- When an experiment is closed or replaced, the site aborts its listener signal and calls its cleanup function.
- GitHub Actions scans the subject folders during deployment and generates `experiments-manifest.json`. No Python launcher, Node installation, package manager or local server is needed for the published website.

## Add an experiment

Place one finished `.js` file directly in the matching folder:

- `experiments/maths/` — Mathematics
- `experiments/science/` — Science

Each file must default-export one object with this contract:

| Property | Required | Meaning |
|---|---:|---|
| `id` | Yes | Unique lowercase slug, 2–64 characters; letters, numbers and hyphens |
| `key` | Yes | Unique uppercase identifier, e.g. `SCI-PHY-001` |
| `subject` | Yes | Exactly `maths` or `science`; must match its folder |
| `title` | Yes | Name shown in the experiment selector and workspace |
| `category` | Yes | Short topic/category label |
| `description` | Yes | Brief explanation shown in the selector and workspace |
| `styles` | No | CSS string, isolated to this experiment's Shadow DOM |
| `mount(context)` | Yes | Creates the complete working experiment UI and behavior; must return a cleanup function |

### Runtime context

`mount()` receives:

- `root`: the experiment's isolated DOM root; build all experiment HTML/SVG inside this element.
- `signal`: an `AbortSignal`; pass it to `addEventListener` options where possible so listeners are detached automatically when the experiment is closed.
- `reducedMotion`: `true` when the visitor has requested reduced motion. Respect it for non-essential animations.
- `announce(message)`: sends an accessible status announcement to the website's screen-reader live region.
- `key`: the experiment's unique key.

The `mount()` function must return a function. Use that function to stop animation frames, timers, observers, audio, or any other resources the experiment created. Even when there is nothing to clean up, return an empty function. Do not attach event listeners or change the page at module-import time; do that inside `mount()`.

### Module shape

```js
export default {
  id: "example-topic",
  key: "MTH-ALG-001",
  subject: "maths",
  title: "Example topic",
  category: "ALGEBRA",
  description: "A concise explanation of this experiment.",
  styles: `
    /* CSS for this experiment only. */
  `,
  mount({ root, signal, reducedMotion, announce, key }) {
    // Create the complete visualisation, controls and interactions in root.
    // Keep SVG/canvas responsive; avoid fixed pixel-sized experiment canvases.
    // Use signal for listeners and reducedMotion for animation preferences.
    // Return cleanup for requestAnimationFrame, timers, observers, etc.
    return () => {
      // Stop resources created by this experiment.
    };
  }
};
```

The snippet above documents the module interface; it is **not** an installed or discoverable experiment. Do not save it inside either subject folder until it has been replaced with a complete working implementation.

## Publish on GitHub Pages

1. Create a GitHub repository and upload the contents of this project to its root.
2. Keep the default branch named `main` (or edit the workflow branch filter if yours is different).
3. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
4. Push to `main`, or run the **Deploy ConceptLab 10 to GitHub Pages** workflow manually from the Actions tab.
5. When the workflow succeeds, open the Pages URL shown in the workflow's deployment environment.

Every subsequent push to `main` rebuilds the site and rediscovers all `.js` experiment modules. Adding a module requires no edit to `index.html`, no manually maintained manifest, and no separate button registration.

## Local preview note

The site shell can be opened as an HTML file, but browsers intentionally block some local-file module and `fetch()` operations. Automatic experiment discovery is provided by the GitHub Actions deployment, where the manifest is generated and served with the site. Published visitors do not need to install or run anything.
