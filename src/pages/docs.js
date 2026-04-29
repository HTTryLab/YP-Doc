import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import products from './products-data';

import styles from './index.module.css';

function DocCard({ product }) {
  return (
    <div className={clsx('col col--6', styles.productCard)}>
      <div className={styles.cardInner} style={{ borderColor: product.color }}>
        <div className={styles.cardHeader}>
          <span className={styles.icon}>{product.icon}</span>
          <h2 className={styles.productName}>{product.name}</h2>
          {product.version && (
            <span className={styles.versionBadge}>{product.version}</span>
          )}
        </div>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.docLinks}>
          <div className={styles.docLinkItem}>
            <Link to={`/products/${product.slug}/docs/intro`}>
              📖 产品简介
            </Link>
          </div>
          <div className={styles.docLinkItem}>
            <Link to={`/products/${product.slug}/docs/getting-started/quickstart`}>
              ⚡ 快速开始
            </Link>
          </div>
          <div className={styles.docLinkItem}>
            <Link to={`/products/${product.slug}/docs/getting-started/installation`}>
              📦 安装指南
            </Link>
          </div>
          <div className={styles.docLinkItem}>
            <Link to={`/products/${product.slug}/docs/api-reference/overview`}>
              📚 API 参考
            </Link>
          </div>
        </div>
        
        <div className={styles.cardActions}>
          <Link
            className="button button--primary button--sm"
            to={product.docsUrl}
            style={{ backgroundColor: product.color, borderColor: product.color }}>
            进入文档
          </Link>
        </div>
      </div>
    </div>
  );
}

function DocsHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">文档中心</h1>
        <p className="hero__subtitle">探索我们的产品文档</p>
        <p className={styles.subtitle}>详细的API文档、使用指南和最佳实践</p>
      </div>
    </header>
  );
}

export default function Docs() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="文档中心"
      description="探索我们的产品文档，包含详细的API文档、使用指南和最佳实践。">
      <DocsHeader />
      <main>
        <section className={styles.productsSection}>
          <div className="container">
            <div className="row">
              {products.map((product, index) => (
                <DocCard key={index} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
