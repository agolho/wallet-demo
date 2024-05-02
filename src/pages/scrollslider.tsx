import React from 'react';

interface DragonEggProps {
    imgSources: string[];
}

const ScrollSlider: React.FC<DragonEggProps> = ({ imgSources }) => {
    return (
        <div className="scroll-slider">
            <div className={"title"}>Possible Rewards</div>
            <div className="scroll-container">
                <ul>
                    {imgSources.map((src, index) => (
                        <li key={index}>
                            <img src={src} alt={`Prize ${index}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ScrollSlider;
