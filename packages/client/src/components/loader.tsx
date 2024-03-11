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
        width: "5rem",
        height: "5rem",
        border: "1rem solid #e9e9e9",
        borderTop: "1rem solid #3498db",
        borderRadius: "50%",
        position: "absolute",
        boxSizing: "border-box",
        top: 0,
        left: 0
      };

      const textStyle: CSSProperties = {
        position: "absolute",
        display: "block",
        top: "7rem",
        fontSize: "1rem"
      };
      
    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1
      };
    return (
      <>
      <div style={containerStyle}>
        <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
        <div className='generating-text' style={textStyle}> Generating ...</div>
      </div>
      </>
    );
  }


export const ChatLoader: React.FC = () => {
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

