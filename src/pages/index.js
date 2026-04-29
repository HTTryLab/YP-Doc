import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">团队介绍</h1>
        <p className="hero__subtitle">专业、创新、协作，打造卓越的企业级软件解决方案</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="团队介绍"
      description="了解我们的团队，专业的团队为您提供优质的软件解决方案。">
      <HomepageHeader />
      <main>
        <section className={styles.aboutSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>关于我们</h2>
            <p className={styles.aboutText}>
              YP团队是一支专注于企业级软件解决方案的专业团队。我们致力于为企业提供高质量、高可靠性的软件产品和服务。
            </p>
            <p className={styles.aboutText}>
              我们的使命是通过技术创新帮助企业提升效率、降低成本、增强竞争力。我们相信，优秀的软件产品能够改变企业的运营方式，创造更大的价值。
            </p>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>核心价值观</h2>
            <div className="row">
              <div className={clsx('col col--4', styles.valueCard)}>
                <div className={styles.valueIcon}>💡</div>
                <h3>创新</h3>
                <p>持续探索新技术，不断创新解决方案</p>
              </div>
              <div className={clsx('col col--4', styles.valueCard)}>
                <div className={styles.valueIcon}>⚡</div>
                <h3>高效</h3>
                <p>追求卓越效率，为客户创造最大价值</p>
              </div>
              <div className={clsx('col col--4', styles.valueCard)}>
                <div className={styles.valueIcon}>🤝</div>
                <h3>协作</h3>
                <p>团队协作，共同实现目标</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>联系我们</h2>
            <p className={styles.contactText}>
              如果您有任何问题或合作意向，欢迎随时联系我们！
            </p>
            <div className={styles.contactLinks}>
              <Link className="button button--primary" to="/YP-Doc/products">
                查看产品
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
