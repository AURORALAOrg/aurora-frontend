"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logoPath?: string;
}

export default function AuthWrapper({
  children,
  title,
  subtitle,
  showLogo = true,
  logoPath = "/logo.png",
}: AuthWrapperProps) {
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    []
  );

  useEffect(() => {
    const calculatePositions = () => {
      const newPositions = [];
      const padding = 100;
      const width = window.innerWidth - padding * 2;
      const height = window.innerHeight - padding * 2;

      const cols = 5;
      const rows = 4;
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < 20; i++) {
        const gridX = i % cols;
        const gridY = Math.floor(i / cols);

        const x = padding + gridX * cellWidth + Math.random() * cellWidth * 0.8;
        const y =
          padding + gridY * cellHeight + Math.random() * cellHeight * 0.8;

        newPositions.push({ x, y });
      }
      setPositions(newPositions);
    };

    calculatePositions();
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  const icons = ["📚", "✏️", "🎓", "💡", "🔬", "🎨", "📐", "🗺️", "🎯", "🧩"];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="absolute inset-0 z-0">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: pos.x, y: pos.y, opacity: 0 }}
            animate={{
              y: [pos.y - 10, pos.y + 10, pos.y - 10],
              x: [pos.x - 5, pos.x + 5, pos.x - 5],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <div className="text-4xl text-primary/20 hover:text-primary/40 transition-colors duration-300">
              {icons[Math.floor(Math.random() * icons.length)]}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showLogo && (
          <motion.div
            className="flex justify-center mb-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/">
              <Image
                src={logoPath || "/placeholder.svg"}
                alt="Logo"
                width={128}
                height={48}
                className="w-32"
              />
            </Link>
          </motion.div>
        )}

        {(title || subtitle) && (
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title && (
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
