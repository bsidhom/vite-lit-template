import { type LitElement } from "lit";

import globalStyles from "../styles.css?inline";

type Constructor<T = {}> = new (...args: any[]) => T;

// Unfortunately, I was not able to export and share these styles among multiple
// components via Lit's unsafeCSS(globalStyles) and stuffing the imported value
// into `static styles`. Weirdly, it _did_ work when I did so in-line for each
// component, but this leads to JS bloat and parsing
// inefficiency.

// Instead, this exports a style sheet object which can then be adopted by the
// render root of each component that wants to use it.

// TODO: Figure out if there's a clean way to replicate the technique used by
// the material web components library. Specifically, generate a .js file (a
// module which will be imported by Lit components) which itself exports a
// single css`style literal` constant, where the style literal is the expanded
// file contents of the postprocessed tailwind css file. This likely needs to
// be implemented as a Vite plugin, but I'm not sure where to plug in such that
// we don't _re_-invoke postcss; instead, we want to use the pregenerated output
// to produce our JS module.

export const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(globalStyles);

export const TailwindMixin = <T extends Constructor<LitElement>>(
  superClass: T,
) =>
  class extends superClass {
    override createRenderRoot() {
      const root = super.createRenderRoot();
      if (!(root instanceof ShadowRoot)) {
        throw new Error("TailwindMixin only works with shadow DOM");
      }
      root.adoptedStyleSheets.push(sharedStyles);
      return root;
    }
  };
