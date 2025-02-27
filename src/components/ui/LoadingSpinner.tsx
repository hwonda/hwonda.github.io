const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative size-8 sm:size-10">
        <div className="absolute border-3 sm:border-4 border-gray-200 rounded-full size-8 sm:size-10" />
        <div className="absolute border-3 sm:border-4 border-blue-500 rounded-full size-8 sm:size-10 animate-spin border-t-transparent" />
      </div>
      <span className="ml-3 text-sm sm:text-base text-gray-600">{'Diki 검색중...'}</span>
    </div>
  );
};

export default LoadingSpinner;