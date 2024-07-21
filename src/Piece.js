const Piece = ({type, src, pos, selected}) => {
    return (  
        <img src={ src } alt="" className={ `piece ${type}${selected && ' selected'}` } 
            style={{'gridRow': pos[0], 'gridColumn': pos[1] }}
        />
    );
}
 
export default Piece;