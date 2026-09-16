import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile } from './data';
import './styles.css';

const profileImage = `${import.meta.env.BASE_URL}images/profile.jpg`;

const SectionTitle = ({ number, children }) => (
  <div className="section-title">
    <span>{number}</span>
    <h2>{children}</h2>
  </div>
);

function EmailButton({ className = '', children }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    const subject = encodeURIComponent('[이력서 문의] 윤우중 님께 연락드립니다');
    const body = encodeURIComponent('안녕하세요, 윤우중 님.\n\n이력서를 보고 연락드립니다.\n\n');

    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`, '_blank', 'noopener,noreferrer');
  };

  return <a className={className} href={`mailto:${profile.email}`} onClick={handleClick}>{copied ? '이메일 복사됨' : children}</a>;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">윤우중 이력서</a>
      <nav aria-label="주요 메뉴">
        <a href="#experience">경력</a>
        <a href="#projects">프로젝트</a>
        <a href="#skills">기술</a>
        <a href="#ai-usage">AI 활용</a>
        <a href="#background">교육·수상</a>
      </nav>
      <div className="header-actions">
        <button type="button" className="print-button" onClick={() => window.print()}>PDF 저장</button>
        <EmailButton className="header-email">이메일 보내기</EmailButton>
      </div>
    </header>
  );
}

function ProfileHeader() {
  return (
    <section className="profile-header" id="top">
      <div className="profile-heading">
        <p className="role">WEB DEVELOPER</p>
        <div className="name-row">
          <h1>{profile.name}</h1>
          <div className="profile-photo-mobile">
            <img src={profileImage} alt="웹 개발자 윤우중 증명사진" />
          </div>
        </div>
        <p className="headline">서비스의 흐름을 이해하고<br />끝까지 구현하는 웹 개발자</p>
      </div>
      <div className="profile-summary">
        <div className="profile-overview">
          <div>
            <div className="employment"><span /> 현재 twentyoz 웹개발팀 주임으로 재직 중</div>
            <p>{profile.intro}</p>
          </div>
          <div className="profile-photo">
            <img src={profileImage} alt="웹 개발자 윤우중 증명사진" />
          </div>
        </div>
        <div className="contact-grid">
          <div><span>전화</span><a href={`tel:${profile.phone}`}>{profile.phone}</a></div>
          <div><span>이메일</span><EmailButton>{profile.email}</EmailButton></div>
          <div><span>거주지</span><strong>{profile.location}</strong></div>
          <div><span>포트폴리오</span><a href={profile.portfolio} target="_blank" rel="noreferrer">Notion 포트폴리오 ↗</a></div>
        </div>
        <div className="value-points">
          {profile.valuePoints.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
        </div>
      </div>
    </section>
  );
}

function CareerSummary() {
  return (
    <section className="resume-section summary-section">
      <SectionTitle number="01">핵심 역량</SectionTitle>
      <div className="summary-content">
        <p className="summary-lead">프론트엔드 구현에 한정하지 않고, 데이터 연동과 백엔드 기능 개발부터 운영 서버 배포까지 서비스 전반을 다룹니다.</p>
        <ul className="strength-list">
          <li><strong>풀스택 개발</strong><span>웹 서비스의 프론트엔드와 백엔드 기능 설계 및 구현</span></li>
          <li><strong>EMS</strong><span>태양광 설비 모니터링, 계통도 및 데이터 연동 개발</span></li>
          <li><strong>엔지니어링</strong><span>설비 태그 구성, 현장 구축 지원과 운영 환경 배포·점검</span></li>
          <li><strong>품질 개선</strong><span>웹 접근성, 상태 관리, 테스트와 공통 컴포넌트 개선</span></li>
          <li><strong>AI 활용</strong><span>구현·테스트·문서화 보조 및 GPT 기반 서비스 개발</span></li>
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="resume-section" id="experience">
      <SectionTitle number="02">경력</SectionTitle>
      <div className="career-list">
        {profile.experience.map((item) => (
          <article className="career-item" key={`${item.company}-${item.period}`}>
            <div className="career-meta">
              <time>{item.period}</time>
              {item.current && <span className="current-badge">재직 중</span>}
            </div>
            <div className="career-company">
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <strong>{item.summary}</strong>
            </div>
            <div className="career-detail">
              <div className="company-projects">
                {item.projects.map((project) => (
                  <section className="company-project" key={project.title}>
                    <div className="company-project-heading">
                      <h5>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.title} <span aria-hidden="true">↗</span></a> : project.title}</h5>
                      <span>{project.type}</span>
                    </div>
                    <p>{project.description}</p>
                    <h6>담당 업무</h6>
                    <ul>{project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
                    {project.technicalNotes?.length > 0 && <div className="technical-notes">
                      {project.technicalNotes.map((note) => <div key={note.label}><strong>{note.label}</strong><p>{note.value}</p></div>)}
                    </div>}
                    <div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  </section>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { label: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'Next.js', 'Zustand', 'TanStack Query', 'HTML5', 'CSS3', 'jQuery'] },
    { label: 'Backend & Data', items: ['NestJS', 'Drizzle ORM', 'Prisma', 'MySQL', 'PostgreSQL', 'SQLite'] },
    { label: 'Release & Operations', items: ['Docker', 'Linux', 'GitLab CI', 'NSIS', 'NSSM', 'Health Check', 'Internal Network Deployment'] },
    { label: 'EMS & Engineering', items: ['XD Runtime', 'InfoU', 'Modbus', 'P&ID', 'Tag Mapping', 'Historian', 'System Monitoring'] },
    { label: 'Web Platform', items: ['ECharts', 'Ant Design', 'Panda CSS', 'Vue i18n', 'Swiper', 'Canvas', 'Chart.js', 'D3', 'Vitest', 'html2pdf'] },
    { label: 'Cloud & CI/CD', items: ['AWS S3', 'CloudFront', 'AWS EC2', 'Vercel', 'GitHub Actions'] },
    { label: 'AI & Productivity', items: ['GPT Integration', 'AI-assisted Development', 'Prompt Design', 'Result Validation'] },
    { label: 'Collaboration', items: ['Git', 'GitLab', 'Jira', 'Figma'] },
  ];

  return (
    <section className="resume-section" id="skills">
      <SectionTitle number="04">기술 스택</SectionTitle>
      <div className="skill-groups">
        {groups.map((group) => (
          <div className="skill-group" key={group.label}>
            <h3>{group.label}</h3>
            <p>{group.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PersonalProjects() {
  return (
    <section className="resume-section" id="projects">
      <SectionTitle number="03">프로젝트 경험</SectionTitle>
      <div className="personal-projects">
        {profile.personalProjects.map((project) => (
          <article className="personal-project" key={project.title}>
            <div className="personal-project-head">
              <time>{project.period}</time>
              <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
            </div>
            <p className="personal-project-description">{project.description}</p>
            <div className="outcomes">{project.outcomes.map((outcome) => <strong key={outcome}>{outcome}</strong>)}</div>
            <h4>주요 기여</h4>
            <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AIUsage() {
  return (
    <section className="resume-section ai-usage" id="ai-usage">
      <SectionTitle number="05">AI 활용</SectionTitle>
      <div>
        <p className="ai-lead">AI를 결과물의 대체재가 아닌, 개발 과정의 속도와 완성도를 높이는 도구로 활용합니다.</p>
        <div className="ai-list">
          {profile.aiUsage.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Background() {
  return (
    <section className="resume-section" id="background">
      <SectionTitle number="06">교육 · 활동 · 수상</SectionTitle>
      <div className="background-grid">
        <div>
          <h3 className="subsection-label">교육 및 활동</h3>
          {profile.activities.map((item) => (
            <article className="background-item" key={item.title}>
              <time>{item.period}</time>
              <div><h4>{item.title}</h4><p>{item.description}</p></div>
            </article>
          ))}
        </div>
        <aside>
          <div className="side-block">
            <h3 className="subsection-label">학력</h3>
            <time>{profile.education.period}</time>
            <h4>{profile.education.school}</h4>
            <p>{profile.education.major}</p>
          </div>
          <div className="side-block award-block">
            <h3 className="subsection-label">수상</h3>
            <time>{profile.award.year}</time>
            <h4>{profile.award.title}</h4>
            <p>{profile.award.event}</p>
            <p>{profile.award.description}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="resume-section introduction">
      <SectionTitle number="07">자기소개</SectionTitle>
      <div>
        <p className="intro-kicker">AI-ASSISTED · FULL-CYCLE DEVELOPMENT</p>
        <h3>AI를 활용해 더 빠르게 실행하고,<br />검증과 결과에는 직접 책임집니다.</h3>
        <p>{profile.introduction}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div><strong>{profile.name}</strong><span>웹 개발자</span></div>
      <EmailButton>{profile.email}</EmailButton>
      <div className="footer-links">{profile.links.slice(0, 2).map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
    </footer>
  );
}

function App() {
  return <><Header /><main><ProfileHeader /><CareerSummary /><Experience /><PersonalProjects /><Skills /><AIUsage /><Background /><Introduction /></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
