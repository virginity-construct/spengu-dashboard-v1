import { ExternalLink, Github } from 'lucide-react';
import SpinguLogo from './SpinguLogo';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-spengu-surface-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <SpinguLogo size="sm" className="mr-2" />
            <span className="text-sm text-spengu-text-secondary">
              SPENGU Staking Dashboard &copy; {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#"
              className="text-sm text-spengu-text-secondary hover:text-spengu-text flex items-center gap-1 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Documentation</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="#"
              className="text-sm text-spengu-text-secondary hover:text-spengu-text flex items-center gap-1 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <Github className="h-3 w-3" />
            </a>
            <span className="text-spengu-text-secondary">|</span>
            <span className="text-xs text-spengu-text-secondary">Solana Devnet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}