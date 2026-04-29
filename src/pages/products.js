import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import products from './products-data';

import styles from './index.module.css';

function ComponentCard({ product }) {
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
        <p className={styles.longDescription}>{product.longDescription}</p>
        
        {product.tags && product.tags.length > 0 && (
          <div className={styles.tags}>
            {product.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        
        <div className={styles.cardActions}>
          <Link
            className="button button--primary button--sm"
            to={product.docsUrl}
            style={{ backgroundColor: product.color, borderColor: product.color }}>
            查看文档
          </Link>
          <Link
            className="button button--outline button--sm"
            to={product.website}
            target="_blank">
            访问官网
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">组件列表</h1>
        <p className="hero__subtitle">探索我们的组件产品组合</p>
        <p className={styles.subtitle}>为您的项目提供高质量的软件组件</p>
      </div>
    </header>
  );
}

export default function Products() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="组件列表"
      description="探索我们的组件产品组合，为您的项目提供高质量的软件组件。">
      <ProductsHeader />
      <main>
        <section className={styles.productsSection}>
          <div className="container">
            <div className="row">
              {products.map((product, index) => (
                <ComponentCard key={index} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
