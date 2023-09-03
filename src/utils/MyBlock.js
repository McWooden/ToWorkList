export default function MyBlock({active, className, cb}) {
    return <div className={`navigation_block zi-2 p-fixed ${active?'active':'inactive'} ${className}`} onClick={cb}/>
}