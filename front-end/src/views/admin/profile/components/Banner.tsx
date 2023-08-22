import banner from "assets/img/profile/banner.png";
import avatar from "assets/img/avatars/avatar11.png";

import Nft1 from "assets/img/nfts/Nft1.png";

import Card from "components/card";


const Banner =()=>{
  return (
    <Card extra="items-center p-[16px] ">
      <div className="w-full h-32 bg-cover relative flex justify-center rounded-2xl"  style={{backgroundImage:`url(${banner})`}}>
        <div className="flex absolute -bottom-12">
            <img className="h-[87px] w-[87px] rounded-full border-white border-4 " src={avatar} alt="" />
        </div>
      </div>
      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Adela Parkson
        </h4>
        <p className="text-base font-normal text-gray-600">Product Manager</p>
      </div>
      {/* Post followers */}
      
    </Card>
  );
};

export default Banner;
