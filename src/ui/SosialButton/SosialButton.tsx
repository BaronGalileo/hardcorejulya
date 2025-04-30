type SosialButtonProps = {
    src: string,
    href: string

}

export const SosialButton = ({src, href}: SosialButtonProps) => {

    return(
        <div className="sosial-btn-wrapper">
            <a href={href}><img src={src}  alt=""/></a>
        </div>
    )
}