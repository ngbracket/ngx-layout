import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.css';

/* ── Inline SVG icons ───────────────────────────────────────────────────── */
const FlexIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 5h5v14H3V5zm7 0h5v14h-5V5zm7 0h4v14h-4V5z"/>
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
  </svg>
);

const ResponsiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
  </svg>
);

const ExamplesIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"/>
  </svg>
);

/* ── Feature data ───────────────────────────────────────────────────────── */
type FeatureItem = {
  Icon: React.ComponentType;
  title: string;
  description: string;
  tags: string[];
  href: string;
  iconColor: string;
};

const features: FeatureItem[] = [
  {
    Icon: FlexIcon,
    title: 'Flexbox Layout',
    description:
      'Control direction, alignment, wrapping and spacing with intuitive one-dimensional flex directives.',
    tags: ['fxLayout', 'fxFlex', 'fxLayoutGap', 'fxLayoutAlign'],
    href: '/docs/fx-flex-api/fxflex-api',
    iconColor: '#1e88e5',
  },
  {
    Icon: GridIcon,
    title: 'CSS Grid',
    description:
      'Build two-dimensional layouts with named grid areas, configurable columns, rows and gap control.',
    tags: ['gdColumns', 'gdRows', 'gdAreas', 'gdGap'],
    href: '/docs/api-documentation',
    iconColor: '#43a047',
  },
  {
    Icon: ResponsiveIcon,
    title: 'Responsive',
    description:
      'Apply any directive at a specific breakpoint using xs / sm / md / lg / xl suffix aliases.',
    tags: ['fxShow', 'fxHide', '.xs', '.gt-sm', 'MediaObserver'],
    href: '/docs/breakpoints',
    iconColor: '#fb8c00',
  },
  {
    Icon: ExamplesIcon,
    title: 'Real-world Examples',
    description:
      'Holy Grail, column ordering, grid spans and more — curated from real StackOverflow questions.',
    tags: ['holy-grail', 'grid-span', 'column-order'],
    href: '/docs/use-cases',
    iconColor: '#8b32b9',
  },
];

function FeatureCard({ Icon, title, description, tags, href, iconColor }: FeatureItem) {
  return (
    <Link to={href} className={styles.featureCard}>
      <div className={styles.featureIconWrap} style={{ background: iconColor }}>
        <span className={styles.featureIcon}>
          <Icon />
        </span>
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
      <div className={styles.tagRow}>
        {tags.map((tag) => (
          <code key={tag} className={styles.tag}>{tag}</code>
        ))}
      </div>
      <span className={styles.featureArrow}>Explore →</span>
    </Link>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Explore the Library</h2>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
