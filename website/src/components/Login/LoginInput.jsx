export const LoginInput = (props) => {
    return (
        <input
          type={props.type}
          className="p-1 h-12 text-xl rounded shadow-lg"
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          />
    )
}