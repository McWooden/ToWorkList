import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  function handleClick() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
    
  }
  return (
    <div className='p-2 w-full h-screen flex items-center justify-center flex-col gap-2'>
      <div className='w-full bg-burlywood p-2 rounded-md shadow text-primary max-w-[720px]'>
        <h1>Ada yang tidak beres :(</h1>
        <p className='my-2 bg-indianred p-2 rounded shadow'>Message: {error.message}</p>
        {error.code && <p>Code: {error.code}</p>}
        <div className='flex justify-end'>
          <div className='p-2 px-4 text-indianred w-fit bg-primary rounded pointer' onClick={handleClick}>
            <p>Hapus semua data</p>
          </div>
        </div>
      </div>
      <div className='w-full bg-burlywood p-2 rounded-md shadow text-primary max-w-[720px]'>
        <p className='mt-2'>{error.stack}</p>
      </div>
    </div>
  );
}

export default function MyErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
