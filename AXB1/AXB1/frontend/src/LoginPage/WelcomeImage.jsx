import React from "react";

function WelcomeImage() {
  return (
    <aside className="flex flex-col w-[60%] ml-20 max-md:ml-0 max-md:w-full overflow-hidden rounded-[50px] bg-white">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c01484e7df09ca0eb71fee36883b0aafe79b4237c4086dc022008cb6160449d?placeholderIfAbsent=true&apiKey=134860f90afa4b4bbe840c2326e96abf"
        alt="Welcome illustration"
        className="object-contain w-full h-auto max-w-full aspect-[0.77] rounded-[inherit] max-md:mt-10"
      />
    </aside>
  );
}

export default WelcomeImage;
