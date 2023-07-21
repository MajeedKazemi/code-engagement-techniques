import React, { useState, useEffect } from 'react';

interface SliderProps {
  maxIndex: number;
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onStopAutoMode: () => void;
}

const Slider: React.FC<SliderProps> = ({ maxIndex, currentIndex, onChangeIndex, onStopAutoMode }) => {
  const [sliderValue, setSliderValue] = useState(currentIndex);

  useEffect(() => {
    setSliderValue(currentIndex);
    if(currentIndex === maxIndex){
      onStopAutoMode();
    }
  }, [currentIndex]);

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Number(event.target.value);
    setSliderValue(newIndex);
    onChangeIndex(newIndex);
    onStopAutoMode();
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={maxIndex}
        value={sliderValue}
        onChange={handleIndexChange}
      />
    </div>
  );
};

export default Slider;
