/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import React from "react";
import Portal from "./../src/index";
import { PortalExtractor } from "../src/server";
import { renderToString } from "react-dom/server";

const Component = () => {
  return (
    <body>
      <Portal name="body" selector="#portal-selector">
        <div>Hello world!</div>
      </Portal>
      <Portal name="head" selector="head">
        <title>Hello world!</title>
      </Portal>
      <div>Hey</div>
    </body>
  );
};

describe("server-side", () => {
  it("should don't render portal on server", () => {
    const extractor = new PortalExtractor();
    const html = renderToString(extractor.collectPortals(<Component />));

    expect(html).toBe("<body><div>Hey</div></body>")
  });

  it("should be able to get portalContent through extractor", () => {
    const extractor = new PortalExtractor();
    renderToString(extractor.collectPortals(<Component />));

    expect(extractor.getPortals().head).toBe(
      '<title data-universal-portal="" data-reactroot="">Hello world!</title>'
    );
    expect(extractor.getPortals().body).toBe(
      '<div data-universal-portal="" data-reactroot="">Hello world!</div>'
    );
  })
});
