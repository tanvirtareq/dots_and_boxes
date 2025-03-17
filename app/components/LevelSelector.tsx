import React from 'react';

export const levelList = ['Level 1', 'Level 2'];

export type Level = typeof levelList[number];

interface LevelSelectorProps {
    setLevel: (level: Level) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ setLevel }) => {

    const levelStyle: React.CSSProperties = {
        margin: '10px 0',
    };

    return (
        <div className='level-selector'>
            <h2>Select Level</h2>
            {levelList.map((level, index) => (
                <button className='button' key={index} style={levelStyle}
                    onClick={() => setLevel(level)}
                >
                    {level}
                </button>
            ))}
        </div>
    );
};

export default LevelSelector;
