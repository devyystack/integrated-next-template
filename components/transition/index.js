import { useRouter } from 'next/router';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import React from 'react';

const Transition = ({ children }) => {
  const { asPath } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    inactive: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    out: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    in: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <React.Fragment>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={!shouldReduceMotion ? variants : null}
          initial="in"
          animate="inactive"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Transition;
