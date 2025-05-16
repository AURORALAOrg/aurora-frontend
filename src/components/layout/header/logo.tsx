import React from 'react';

const Logo = ({ onClickHome }: { onClickHome: () => void }) => {
   return (
      <div onClick={onClickHome} className="flex items-center cursor-pointer">
         <div className="p-1 rounded">
            <img src="/aurora-logo.png" alt="Aurora Logo" className="h-6 sm:h-7 md:h-8" />
         </div>
      </div>
   );
};

export default Logo;
