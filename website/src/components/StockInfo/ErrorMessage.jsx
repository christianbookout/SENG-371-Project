export const ErrorMessage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-2xl font-bold">Stock not found</p>
      <p>Please check that you have the right ticker symbol</p>
      <p className="mt-4 text-xs">
        If this message looks incorrect, the API call limit may have been
        reached. Please try again in 60 seconds
      </p>
    </div>
  );
};
