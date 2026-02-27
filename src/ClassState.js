import React from "react";

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: true,
            loading: false
        };
    }

    componentDidUpdate (){
        console.log("actualizacion")

        if(!!this.state.loading){
            setTimeout(() => {
                console.log("haciendo la validacion")
                this.setState ({ loading: false })
                console.log("terminando la validacion")
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>

                {this.state.error && (
                    <p>Error: el codigo es incorrecto</p>
                )}

                {this.state.loading && (
                    <p>Cargando...</p>
                )}


                <input placeholder="Codigo de seguridad" />
                <button 
                    onClick={() => this.setState({ loading: true })
                    }
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState }