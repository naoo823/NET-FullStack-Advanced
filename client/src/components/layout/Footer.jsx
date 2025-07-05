// Footer layoutimport { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-accent/30 border-t border-gray/10 py-8 relative z-10">
      <div className="container mx-auto px-4 text-center text-gray">
        <div className="flex justify-center gap-8 mb-6">
          <a href="#" className="text-gray hover:text-primary transition-transform hover:-translate-y-1 block"><Twitter /></a>
          <a href="#" className="text-gray hover:text-primary transition-transform hover:-translate-y-1 block"><Github /></a>
          <a href="#" className="text-gray hover:text-primary transition-transform hover:-translate-y-1 block"><Linkedin /></a>
        </div>
        <p className="tracking-wide">© {new Date().getFullYear()} NET Team. All Rights Reserved.</p>
        <p className="mt-2 text-sm opacity-70">Silence. Discipline. Quality.</p>
      </div>
    </footer>
  );
}