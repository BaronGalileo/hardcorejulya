import { ProjectCard } from "./ProjectCard";


export const TestView = () => {
    return (
      <section className="projects-section">
        <h2 className="header">Projects.</h2>
        <div className="projects">
          <ProjectCard side="left" color="red" duration={2000} />
          <ProjectCard side="right" color="green" />
          <ProjectCard side="left" color="blue" />
          <ProjectCard side="right" color="yellow" />
        </div>
      </section>
    );
  };