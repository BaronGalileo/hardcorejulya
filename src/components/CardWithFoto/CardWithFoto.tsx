import { useInView } from 'react-intersection-observer';


type CardWithFotoProps = {
    url: string,
    label: string,
    context: string,
    duration?: number, 
  };

export const CardWithFoto = ({url, label, context, duration = 1200 }: CardWithFotoProps) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });


    return (

        <div ref={ref} className="card-wrapper"
        style={{ '--transition-duration': `${duration}ms` } as React.CSSProperties}
        >
            <div className={`card-item left ${inView ? `in-view`: ''}`}>
                <img src={url} alt="Картинка"/>
            </div>
            <div className={`card-item right ${inView ? `in-view`: ''}`}>
                <h1>{label}</h1>
                <p>{context}</p>
            </div>
        </div>
    )
}