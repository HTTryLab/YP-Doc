import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function TeamMember({ name, role, description, avatar }) {
  return (
    <div className={clsx('col col--4', styles.teamCard)}>
      <div className={styles.teamInner}>
        <div className={styles.avatar}>{avatar}</div>
        <h3 className={styles.memberName}>{name}</h3>
        <p className={styles.memberRole}>{role}</p>
        <p className={styles.memberDescription}>{description}</p>
      </div>
    </div>
  );
}

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
  
  const teamMembers = [
    {
      name: '张明',
      role: '技术总监',
      description: '拥有15年企业级软件架构经验，专注于.NET技术栈，带领团队完成多个大型项目的设计与实施。',
      avatar: '👨‍💼'
    },
    {
      name: '李华',
      role: '高级工程师',
      description: '精通前后端开发，对微服务架构有深入研究，负责核心产品的技术实现和性能优化。',
      avatar: '👨‍💻'
    },
    {
      name: '王芳',
      role: '产品经理',
      description: '10年产品管理经验，擅长用户需求分析和产品规划，致力于打造用户体验极佳的软件产品。',
      avatar: '👩‍💼'
    },
    {
      name: '陈伟',
      role: 'QA负责人',
      description: '专注于自动化测试和质量保障，确保产品的稳定性和可靠性。',
      avatar: '👨‍🔧'
    },
    {
      name: '刘洋',
      role: 'DevOps工程师',
      description: '负责CI/CD流程搭建和云基础设施管理，保障产品的快速部署和运维。',
      avatar: '👨‍🔧'
    },
    {
      name: '赵静',
      role: 'UI/UX设计师',
      description: '专注于用户界面设计和用户体验优化，打造美观且易用的产品界面。',
      avatar: '👩‍🎨'
    }
  ];

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

        <section className={styles.teamSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>团队成员</h2>
            <div className="row">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
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
              <a className="button button--outline" href="mailto:contact@yp.com">
                发送邮件
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
