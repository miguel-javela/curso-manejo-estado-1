import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer ({name}){
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // const onWrite = (newValue) => {
    //     setState({ ...state, value: newValue })
    // }

    React.useEffect(() => {
        console.log("empezando el efecto")

        if(!!state.loading){
            setTimeout(() => {
                console.log("haciendo la validacion")

                if(state.value === SECURITY_CODE){
                    dispatch({type: 'CONFIRM'})
                } else {
                    dispatch({type: 'ERROR'})
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
                onChange={ (event) => { dispatch({type: 'WRITE', payload: event.target.value}) } }
            />
            <button onClick={() => { dispatch({type: 'CHECK'}) } }>Comprobar</button>
        </div>
        );
    } else if (!!state.confirmed && !state.deleted){
        return (
            <>
                <p>pedimos confirmacion. ¿tas seguro?</p>
                <button onClick={ () => dispatch({type: 'DELETE'}) } >si, eliminar</button>
                <button onClick={ () => dispatch({type: 'RESET'}) } >no, me arrepenti</button>
            </>
        )
    } else {
        return (
            <>
                <p>eliminado con exito</p>
                <button onClick={ () => dispatch({type: 'RESET'}) } >resetear, volver atras</button>
            </>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerObject = (state, payload) => ({
    'CONFIRM': { ...state, error: false, loading: false, confirmed: true },
    'ERROR': {...state, error: true, loading: false},
    'WRITE': { ...state, value: payload},
    'CHECK': {...state, loading: true},
    'DELETE': {...state, deleted: true},
    'RESET': {...state, confirmed: false, deleted: false, value: ''}
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }