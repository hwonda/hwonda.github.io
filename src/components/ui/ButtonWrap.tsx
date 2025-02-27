interface ButtonWrapProps {
  displayLevels: string[];
  range: number[];
  onRangeChange: (newRange: number[])=> void;
}

const ButtonWrap = ({ displayLevels, range, onRangeChange }: ButtonWrapProps) => {
  const handleClick = (index: number) => {
    if (range.length === 5) {
      // 모든 요소가 선택된 상태에서는 하나만 선택
      onRangeChange([index]);
    } else if (range.includes(index)) {
      // 이미 선택된 요소를 클릭하면 제거
      const newRange = range.filter((item) => item !== index);
      // 모든 요소가 제거되는 것을 방지
      if (newRange.length === 0) {
        onRangeChange([index]);
      } else {
        onRangeChange(newRange);
      }
    } else {
      // 새로운 요소 추가
      onRangeChange([...range, index].sort((a, b) => a - b));
    }
  };

  return (
    <div className="flex gap-1">
      {displayLevels.map((level, index) => (
        <button
          key={level}
          onClick={() => handleClick(index)}
          className={`px-2 py-0.5 text-xs rounded-full border border-gray3 transition-colors hover:bg-background-secondary ${
            range.includes(index)
              ? 'border-primary text-primary'
              : 'border-gray3 text-gray0 hover:text-primary hover:border-primary'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default ButtonWrap;