import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">
            EDIFICE<span className="text-accent">.</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Building Kolkata's future, one landmark at a time. Quality construction since 2005.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>12/A Park Street, Kolkata 700016</p>
            <p>+91 98300 12345</p>
            <p>hello@edifice.in</p>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Edifice Constructions. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
