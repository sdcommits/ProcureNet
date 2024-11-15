import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
// import ServiceCard from "./ServiceCard";
import ServiceCard from "./ServiceCard";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Auction Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        When you are selling your asset, then all you need is the best possible price for it in the shortest time. And, this requires reaching out to as many buyers as possible. So, if you are worried about searching for prospective bidders, then we have a great news for you: Salasar Online Auction House provides forward e-auctions for all range of items. All you need to do is, connect with us the soonest.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            title={service.title}
            icon={service.icon}
            path={service.path} // Pass the specific path
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
