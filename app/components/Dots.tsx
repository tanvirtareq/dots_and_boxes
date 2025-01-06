import { Circle } from "react-konva";

const Dots: React.FC<{ size: number, gap: number, rad: number }> = ({ size, gap, rad }) => {
    const dots = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            dots.push(<Circle key={`${i}-${j}`} x={i * gap+2*rad} y={j * gap+2*rad} radius={rad} fill="black" />);
        }
    }
    return (
        dots
    );
};

export default Dots;

