'use client';

const ErrorLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-64px)]'>
      <h1 className='text-4xl'>{'404 - Page Not Found'}</h1>
      <p className='py-5'>{'해당 주소의 페이지는 없습니다.'}</p>
      <button onClick={() => history.back()}>
        <p>{'뒤로가기'}</p>
      </button>
    </div>
  );
};

export default ErrorLayout;
