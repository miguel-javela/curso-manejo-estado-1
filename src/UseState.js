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

    const onConfirm = () => {
        setState({ ...state, error: false, loading: false, confirmed: true })
    }

    const onError = () => {
        setState({ ...state, error: true, loading: false })
    }

    const onWrite = (newValue) => {
        setState({ ...state, value: newValue })
    }

    const onCheck = () => {
        setState({ ...state, loading: true })
    }

    const onDelete = () => {
        setState({...state, deleted: true})
    }

    const onReset = () => {
        setState({...state, confirmed: false, deleted: false, value: ''})
    }

    React.useEffect(() => {
        console.log("empezando el efecto")

        if(!!state.loading){
            setTimeout(() => {
                console.log("haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    onConfirm();
                } else {
                    onError();
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
                onChange={ (event) => { onWrite(event.target.value); } }
            />
            <button onClick={() => { onCheck() } }>Comprobar</button>
        </div>
        );
    } else if (!!state.confirmed && !state.deleted){
        return (
            <>
                <p>pedimos confirmacion. ¿tas seguro?</p>
                <button onClick={ () => onDelete() } >si, eliminar</button>
                <button onClick={ () => onReset() } >no, me arrepenti</button>
            </>
        )
    } else {
        return (
            <>
                <p>eliminado con exito</p>
                <button onClick={ () => onReset() } >resetear, volver atras</button>
            </>
        )
    }
}

export { UseState }