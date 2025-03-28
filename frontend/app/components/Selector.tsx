interface SelectorProps {
  options: string[];
  setOption: (option: string) => void;
  label: string;
}

const Selector = ({ options, setOption, label }: SelectorProps) => {
  const levelStyle: React.CSSProperties = {
    margin: "10px 0",
  };

  return (
    <div className="selector">
      <h1>{label}</h1>
      {options.map((option, index) => (
        <button
          className="button"
          key={index}
          onClick={() => setOption(option)}
          style={levelStyle}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Selector;
