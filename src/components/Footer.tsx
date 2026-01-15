import { useState, useEffect } from "react"; // actually not needed here

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 KnightCram • Built for students, by students 🦉
        </p>
      </div>
    </footer>
  );
};

export default Footer;