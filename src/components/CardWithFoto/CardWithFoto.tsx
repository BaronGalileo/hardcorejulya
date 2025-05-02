import { useInView } from 'react-intersection-observer';


type CardWithFotoProps = {
    url: string,
    label: string,
    context: string,
    duration?: number,
    imagePosition?: "left" | "right"; 
  };

export const CardWithFoto = ({url, label, context, imagePosition = "left", duration = 1200 }: CardWithFotoProps) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });


    return (

        <div ref={ref} className={`card-wrapper ${imagePosition}`}
        style={{ '--transition-duration': `${duration}ms` } as React.CSSProperties}
        >
            <div className={`card-item  ${imagePosition} foto ${inView ? `in-view`: ''}`}>
                <img src={url} alt="Картинка"/>
            </div>
            <div className={`card-item ${imagePosition === "left" ? 'right':  "left"} text ${inView ? `in-view`: ''}`}>
                <h1>{label}</h1>
                <p>{context}</p>
            </div>
        </div>
    )
}