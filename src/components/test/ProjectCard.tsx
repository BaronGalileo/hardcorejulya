import { useInView } from 'react-intersection-observer';

type ProjectCardProps = {
    side: string;
    color: string;
    duration?: number; // в миллисекундах
  };
  
export const ProjectCard = ({ side, color, duration = 700 }: ProjectCardProps) => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
});
return (
    <div
    ref={ref}
    className={`project-card ${side} ${color} ${
    inView ? (side === 'left' ? 'in-view-left' : 'in-view-right') : ''
    }`}
    style={{
        transitionDuration: `${duration}ms`,
    }}
    ></div>
    );
  };