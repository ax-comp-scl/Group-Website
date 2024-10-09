import React from 'react';

function WelcomeImage() {
  return (
    <aside className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c01484e7df09ca0eb71fee36883b0aafe79b4237c4086dc022008cb6160449d?placeholderIfAbsent=true&apiKey=134860f90afa4b4bbe840c2326e96abf"
        alt="Welcome illustration"
        className="object-contain grow w-full aspect-[0.77] max-md:mt-10 max-md:max-w-full"
      />
    </aside>
  );
}

export default WelcomeImage;