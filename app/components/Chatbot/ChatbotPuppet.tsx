"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatFlow from "./ChatFlow";
import EmojiAvatar from "./EmojiAvatar";

export default function ChatbotPuppet() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="chatbot-trigger"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <EmojiAvatar mood={null} size={24} />
            <span>Explorar</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="chatbot-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="chatbot-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
              <ChatFlow isOpen={isOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
