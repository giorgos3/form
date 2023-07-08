


const Input = (props) => {

const {label, placeholder, errorMessage, onChange, id, ...inputProps} = props

return(
    <div className="form-group pt-2 pb-2">
    <label>{placeholder}</label>
    <input className="form-control" {...inputProps} onChange={onChange}/>
    <span className="error text-danger">{errorMessage}</span>
    </div>

)




}

export default Input;