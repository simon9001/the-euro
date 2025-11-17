import {type JSX } from "react/jsx-runtime";

// src/components/Footer.tsx
export default function Footer(): JSX.Element {
    return (
      <footer className="footer footer-center p-10 bg-memorial-dark text-white">
        <aside>
          <div className="text-4xl mb-4">🕯️</div>
          <p className="text-xl italic mb-4">
            "Well done, good and faithful servant." - Matthew 25:23
          </p>
          <p className="opacity-80">
            Betty Bayo - 1985-2024
          </p>
          <p className="opacity-60 text-sm mt-2">
            Built with love in her memory
          </p>
        </aside> 
        
        <nav>
          <div className="grid grid-flow-col gap-4 opacity-80">
            <a className="link link-hover cursor-pointer">Privacy</a>
            <a className="link link-hover cursor-pointer">Contact Family</a>
            <a className="link link-hover cursor-pointer">Media Inquiries</a>
          </div>
        </nav>
        
        <aside>
          <p className="opacity-60">
            Copyright © 2024 - Betty Bayo Memorial. All rights reserved.
          </p>
        </aside>
      </footer>
    )
  }