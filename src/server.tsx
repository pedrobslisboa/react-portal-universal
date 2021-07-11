import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { PortalCollector, PortalType } from "./index";

export class PortalExtractor {
  private _portals: Record<PortalType["name"], React.ReactNode>;

  constructor() {
    this._portals = {};
  }

  collectPortals = (element: JSX.Element): JSX.Element => {
    return (
      <PortalCollector
        collectPortal={(portal: PortalType) => {
          this._portals = {
            ...this._portals,
            ...{ [portal.name]: portal.content },
          };
        }}
      >
        {element}
      </PortalCollector>
    );
  };

  getPortal(name: string): string {
    return renderToString(<>{this._portals[name]}</>);
  }
}