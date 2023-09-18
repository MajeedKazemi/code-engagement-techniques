import { motion } from 'framer-motion';
import React, { CSSProperties } from 'react';

export const GPTLoader: React.FC = () => {
    const containerStyle: CSSProperties = {
        position: "relative",
        width: "10rem",
        height: "10rem",
        boxSizing: "border-box"
      };
      
      const circleStyle: CSSProperties = {
        display: "block",
        width: "10rem",
        height: "10rem",
        border: "1.5rem solid #e9e9e9",
        borderTop: "1.5rem solid #3498db",
        borderRadius: "50%",
        position: "absolute",
        boxSizing: "border-box",
        top: 0,
        left: 0
      };
      
    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1
      };
    return (
      <div style={containerStyle}>
        <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>
    );
  }


export const ChatLoader: React.FC = () => {
    // return (
    // //     <div className="dot-container">
    // //     <div className="dot"></div>
    // //     <div className="dot"></div>
    // //     <div className="dot"></div>
    // //   </div>
    //     <motion.div
    //     initial={{ opacity: 0 }} 
    //     animate={{ opacity: 1 }} 
    //     transition={{ duration: 1 }} 
    // >
    //     ...
    // </motion.div>
    // );
    return (
        <div className="loading-container">
          <motion.span className="loading-dot" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            .
          </motion.span>
          <motion.span className="loading-dot" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>
            .
          </motion.span>
          <motion.span className="loading-dot" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>
            .
          </motion.span>
        </div>
      );
  };

export const Loader = () => {
    return <div className="loader"></div>;
};

