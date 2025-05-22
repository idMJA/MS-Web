'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProgressiveTextProps {
  paragraphs: string[];
  delay?: number;
}

export default function ProgressiveText({ paragraphs, delay = 0 }: ProgressiveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false,
    margin: "-10% 0px -10% 0px"
  });
  
  // Add a subtle parallax effect when scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0.7 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: delay
      }
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        position: 'relative',
        zIndex: 1
      }}
      className="space-y-8 relative py-4"
    >
      {/* Background gradient that responds to scroll */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 dark:via-gray-900/30 to-transparent rounded-xl -z-10"
        style={{
          opacity: scrollYProgress,
          scale: useTransform(scrollYProgress, [0, 1], [0.95, 1.05])
        }}
      />
      
      {paragraphs.map((paragraph, paragraphIndex) => (
        <ProgressiveParagraph 
          key={paragraph.slice(0, 40).trim().replace(/[^a-zA-Z0-9]/g, '-')}
          text={paragraph} 
          delay={delay + paragraphIndex * 0.5} 
          index={paragraphIndex}
        />
      ))}
    </motion.div>
  );
}

interface ProgressiveParagraphProps {
  text: string;
  delay: number;
  index: number;
}

function ProgressiveParagraph({ text, delay, index }: ProgressiveParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px",
    amount: 0.2 // Trigger when 20% of the element is in view for earlier animation start
  });

  // Split text into sentences for progressive reveal
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  // Create paragraph variants for staggered animation
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  // Create sentence variants for staggered animation
  const sentenceVariants = {
    hidden: { opacity: 0, filter: "blur(3px)", y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 * i,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <motion.p
      ref={ref}
      variants={paragraphVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-lg text-gray-600 dark:text-gray-300 mb-6 pl-3 border-l-2 border-transparent dark:border-transparent relative"
      style={{
        borderLeftColor: isInView ? 'rgba(107, 114, 128, 0.5)' : 'transparent',
        transition: 'border-left-color 0.5s ease-in-out'
      }}
      whileHover={{
        x: 5,
        borderLeftColor: 'rgba(107, 114, 128, 0.8)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Add a subtle highlight effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-md -z-10" 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
      />
      
      {sentences.map((sentence, sentenceIndex) => (
        <motion.span
          key={sentence.slice(0, 40).trim().replace(/[^a-zA-Z0-9]/g, '-')}
          custom={sentenceIndex}
          variants={sentenceVariants}
          className="inline rounded px-0.5"
        >
          {sentence}
        </motion.span>
      ))}
    </motion.p>
  );
}