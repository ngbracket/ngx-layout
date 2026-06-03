import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import React from 'react';

import styles from './index.module.css';


function Hero(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <img
          src="/img/ngx-layout-icon.svg"
          width={88}
          height={88}
          alt="ngx-layout logo"
          className={styles.heroLogo}
        />
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <span className={styles.versionBadge}>v21.2.x</span>

        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="/docs/intro">
            Get Started
          </Link>
          <Link className={styles.btnSecondary} to="/docs/api-documentation">
            API Reference
          </Link>
          <Link
            className={styles.btnOutline}
            href="https://github.com/ngbracket/ngx-layout"
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}


function InstallSnippet(): React.JSX.Element {
  return (
    <section className={styles.installSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Quick Install</h2>
        <div className={styles.installCard}>
          <pre className={styles.installCode}>
            <code>npm install @ngbracket/ngx-layout</code>
          </pre>
          <Link className={styles.installDocsLink} to="/docs/install-ngx-layout">
            Full setup guide →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <HomepageFeatures />
        <InstallSnippet />
      </main>
    </Layout>
  );
}
