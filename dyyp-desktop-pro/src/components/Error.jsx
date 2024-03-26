const Error = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-header">Whoops!</h1>
            <div className="not-found-body">
                <img src="../DYYP_Animation_Error.gif" alt="dyyp not found!" className="not-found-img" draggable='false'/>
                <h3 className="not-found-subtitle">There seems to have been a problem...</h3>
            </div>
        </div>
    )
}

export default Error;