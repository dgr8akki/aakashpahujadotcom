import React, { useEffect, useRef } from 'react';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { IconGitHub, IconExternal, IconStar, IconFork } from '@components/icons';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 1000px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
`;

const StatCard = styled.div`
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 30px;
  text-align: center;
  transition: ${theme.transition};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px ${colors.shadowNavy};
  }
`;

const StatNumber = styled.div`
  color: ${colors.green};
  font-size: 48px;
  font-weight: 700;
  font-family: ${fonts.SFMono};
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: ${colors.slate};
  font-size: ${fontSizes.lg};
  font-family: ${fonts.SFMono};
`;

const ReposSection = styled.div`
  margin-top: 80px;
`;

const ReposGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 50px;
  
  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  `};
`;

const RepoCard = styled.a`
  position: relative;
  cursor: pointer;
  padding: 2rem 1.75rem;
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  
  &:hover,
  &:focus {
    transform: translateY(-7px);
    box-shadow: 0 20px 30px -15px ${colors.shadowNavy};
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const RepoFolder = styled.div`
  color: ${colors.green};
  svg {
    width: 40px;
    height: 40px;
  }
`;

const RepoLinks = styled.div`
  display: flex;
  align-items: center;
  margin-right: -10px;
  color: ${colors.lightSlate};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 7px;
    
    &:hover {
      color: ${colors.green};
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const RepoName = styled.h3`
  margin: 0 0 10px;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  
  ${RepoCard}:hover & {
    color: ${colors.green};
  }
`;

const RepoDescription = styled.p`
  color: ${colors.lightSlate};
  font-size: ${fontSizes.sm};
  margin-bottom: 15px;
  min-height: 40px;
`;

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${fontSizes.xs};
  color: ${colors.lightSlate};
`;

const RepoTech = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${colors.green};
    margin-right: 7px;
  }
`;

const RepoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const GitHubLink = styled.a`
  ${mixins.inlineLink};
  margin-top: 30px;
  display: inline-block;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
`;

const topRepos = [
  {
    name: 'DS-Algo-Made-Easy-With-Aakash',
    description: 'Solutions to problems from Hackerrank, Leetcode, and coding interview prep books',
    language: 'Java',
    stars: 11,
    forks: 0,
    github: 'https://github.com/dgr8akki/DS-Algo-Made-Easy-With-Aakash',
  },
  {
    name: 'ollama-browser-extension',
    description: 'Browser extension for interacting with Ollama AI models. Built with Plasmo and TypeScript.',
    language: 'TypeScript',
    stars: 3,
    forks: 0,
    github: 'https://github.com/dgr8akki/ollama-browser-extension',
  },
  {
    name: 'Mac-n-CSS',
    description: 'Macbook Pro UI using only HTML and CSS - no JavaScript!',
    language: 'HTML/CSS',
    stars: 3,
    forks: 0,
    github: 'https://github.com/dgr8akki/Mac-n-CSS',
    external: 'https://dgr8akki.github.io/Mac-n-CSS/',
  },
  {
    name: 'Milli-The-text-editor',
    description: 'Terminal-based text editor that aims to be easy to use and intuitive',
    language: 'C',
    stars: 3,
    forks: 1,
    github: 'https://github.com/dgr8akki/Milli-The-text-editor',
  },
  {
    name: 'resume',
    description: 'My resume built with LaTeX',
    language: 'TeX',
    stars: 4,
    forks: 0,
    github: 'https://github.com/dgr8akki/resume',
  },
  {
    name: 'js30',
    description: '30 Days of Vanilla JavaScript challenges',
    language: 'JavaScript',
    stars: 2,
    forks: 0,
    github: 'https://github.com/dgr8akki/js30',
  },
];

const GitHubStats = () => {
  const revealContainer = useRef(null);
  const revealRepos = useRef([]);
  
  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig(300));
    revealRepos.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="github-stats" ref={revealContainer}>
      <Heading>GitHub Contributions</Heading>
      <StatsGrid>
        <StatCard>
          <StatNumber>119+</StatNumber>
          <StatLabel>Public Repositories</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>35+</StatNumber>
          <StatLabel>Followers</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>11+</StatNumber>
          <StatLabel>Most Starred Repo</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>8+</StatNumber>
          <StatLabel>Years on GitHub</StatLabel>
        </StatCard>
      </StatsGrid>

      <ReposSection>
        <Heading>Popular Repositories</Heading>
        <ReposGrid>
          {topRepos.map((repo, i) => (
            <RepoCard
              key={i}
              href={repo.github}
              target="_blank"
              rel="nofollow noopener noreferrer"
              ref={el => (revealRepos.current[i] = el)}
            >
              <RepoHeader>
                <RepoFolder>
                  <IconGitHub />
                </RepoFolder>
                <RepoLinks>
                  <a href={repo.github} target="_blank" rel="nofollow noopener noreferrer" aria-label="GitHub Link">
                    <IconGitHub />
                  </a>
                  {repo.external && (
                    <a href={repo.external} target="_blank" rel="nofollow noopener noreferrer" aria-label="External Link">
                      <IconExternal />
                    </a>
                  )}
                </RepoLinks>
              </RepoHeader>
              <RepoName>{repo.name}</RepoName>
              <RepoDescription>{repo.description}</RepoDescription>
              <RepoFooter>
                <RepoTech>{repo.language}</RepoTech>
                <RepoStats>
                  <span>
                    <IconStar />
                    {repo.stars}
                  </span>
                  <span>
                    <IconFork />
                    {repo.forks}
                  </span>
                </RepoStats>
              </RepoFooter>
            </RepoCard>
          ))}
        </ReposGrid>
      </ReposSection>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <GitHubLink href="https://github.com/dgr8akki" target="_blank" rel="nofollow noopener noreferrer">
          View All Repositories on GitHub →
        </GitHubLink>
      </div>
    </StyledContainer>
  );
};

export default GitHubStats;
