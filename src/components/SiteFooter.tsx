// Vishal Builds footer, same links as Tailor and Dak.
export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-2 px-6 py-10 text-center">
        <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
          Made by Vishal
        </p>
        <p className="font-mono text-[0.6875rem] tracking-wide text-muted">
          <a
            href="https://vishalbuilds.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-move"
          >
            Website
          </a>
          <span aria-hidden className="px-2 text-rule">
            ·
          </span>
          <a
            href="https://about.vishalbuilds.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-move"
          >
            About
          </a>
          <span aria-hidden className="px-2 text-rule">
            ·
          </span>
          <a
            href="mailto:vgvishal31@gmail.com"
            className="transition-colors hover:text-move"
          >
            Email
          </a>
        </p>
      </div>
    </footer>
  )
}
