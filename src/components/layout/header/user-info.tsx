import React from "react";
import { User } from "lucide-react";
import { truncateAddress } from "@/utils/helpers";

type Props = {
   user: any;
   address: string;
};

const UserInfo = ({ user, address }: Props) => {
   return (
      <div className="flex items-center space-x-2 py-2">
         <User size={20} />
         <span className="text-md font-medium">{user?.username || truncateAddress(address)}</span>
      </div>
   );
};

export default UserInfo;
