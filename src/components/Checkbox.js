const Checkbox = (props) => {
  const { name, value, onChange, ...checkProps } = props;

  return (
    <div className="form-group pt-3">
      <div className="form-check">
        <input
          type="checkbox"
          value={value}
          {...checkProps}
          onChange={onChange}
        />
        <label className="form-check-label pl-5">{name}</label>
      </div>
    </div>
  );
};

export default Checkbox;
