import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ServiceCard from "./ServiceCard";

const About = () => {
  return (
    <>
      {/* Header Section */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Auction Overview.</h2>
      </motion.div>

      {/* Description Section */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        When you are selling your asset, all you need is the best possible price
        for it in the shortest time. This requires reaching out to as many
        buyers as possible. If you're worried about searching for prospective
        bidders, we have great news for you! Salasar Online Auction House
        provides forward e-auctions for a wide range of items. Connect with us
        today to explore endless opportunities.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {/* Map through services and render ServiceCard for each */}
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            title={service.title}
            icon={service.icon}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
