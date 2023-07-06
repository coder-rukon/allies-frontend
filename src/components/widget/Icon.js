const Icon = (props) => {
    let className = 'allies_icon uil ' + ( props.className ? props.className  : '' );
    return <i class={className}></i>
}
export default Icon;