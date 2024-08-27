import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Procure<span className='text-[#915EFF]'>Net</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          {/* Best Online Auction Site Providing 100% Reliable  <br className='sm:block hidden' />and Secured Auctioning-Bidding Servicesinterfaces and web applications */}
          </p>
        </div>
      </div>

<div className='absolute bottom-0 left-0 right-0 flex justify-center items-center p-4'>
        <img
          src='src/assets/company/starbucks.png' 
          alt='Descriptive Alt Text'
          className='object-cover'
          style={{ width: '300px', height: '300px' }} 
        />
      </div>
    </section>
  );
};

export default Hero;