import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState ({name}){
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    console.log(state.value)

    React.useEffect(() => {
        console.log("empezando el efecto")

        if(!!state.loading){
            setTimeout(() => {
                console.log("haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    setState({ ...state, error: false, loading: false, confirmed: true })
                } else {
                    setState({ ...state, error: true, loading: false })
                }

                console.log("terminando la validacion")
            }, 3000)
        }

        console.log("terminando el efecto")
    }, [state.loading])



    if(!state.deleted && !state.confirmed){
        return (
        <div>
            <h2>Eliminar {name}</h2>

            <p>Por favor, escribe el codigo de seguridad.</p>

            {(state.error && !state.loading) && (
                <p>Error: el codigo es incorrecto</p>
            )}
            {state.loading && (
                <p>Cargando...</p>
            )}

            <input 
                placeholder="Codigo de seguridad" value={state.value}
                onChange={
                    (event) => {
                        setState({ ...state, value: event.target.value })
                        // setError(false) //este tambien puede ser
                    }
                }
            />
            <button onClick={() =>{
                setState({ ...state, loading: true })
                // setError(false) //este fue
                }
            }>Comprobar</button>
        </div>
        );
    } else if (!!state.confirmed && !state.deleted){
        return (
            <>
                <p>pedimos confirmacion. ¿tas seguro?</p>
                <button onClick={ () => setState({...state, deleted: true}) } >si, eliminar</button>
                <button onClick={ () => setState({...state, confirmed: false, value: ''}) } >no, me arrepenti</button>
            </>
        )
    } else {
        return (
            <>
                <p>eliminado con exito</p>
                <button onClick={ () => setState({...state, confirmed: false, deleted: false, value: ''}) } >resetear, volver atras</button>
            </>
        )
    }
}

export { UseState }