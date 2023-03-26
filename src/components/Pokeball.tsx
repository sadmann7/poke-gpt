import styles from "@/styles/pokeball.module.css";
import type { LucideProps } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PokeballProps extends LucideProps {
  isGenerated: boolean;
}

const Pokeball = ({ isGenerated, ...props }: PokeballProps) => {
  const pokeballRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!pokeballRef.current) return;
    pokeballRef.current.classList.add(styles.loading);
    pokeballRef.current.classList.toggle(
      isGenerated ? styles.success : styles.failure
    );
  }, [isGenerated]);

  return (
    <svg
      ref={pokeballRef}
      viewBox="0 0 100 100"
      width="150"
      height="150"
      {...props}
    >
      <g transform="translate(50 50) scale(0.8)">
        <g className={styles.stars} transform="scale(0)">
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M -50 -50 l 4.5 0 l 2.5 -4.5 l 2.5 4.5 l 4.5 0 l -3.5 3.5 l 1.5 5 l -5 -2.5 l -5 2.5 l 1.5 -5 l -3.5 -3.5"
          ></path>
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M 36 -50 l 4.5 0 l 2.5 -4.5 l 2.5 4.5 l 4.5 0 l -3.5 3.5 l 1.5 5 l -5 -2.5 l -5 2.5 l 1.5 -5 l -3.5 -3.5"
          ></path>
        </g>
        <g transform="translate(0 50)">
          <g className={styles.gravity}>
            <g transform="translate(0 -50)">
              <g className={styles.ball} transform="scale(1 1)">
                <g className={styles.bottom}>
                  <path
                    fill="#ffffff"
                    stroke="#303030"
                    strokeWidth="5"
                    d="M -47.5 0 a 47.5 47.5 0 0 0 95 0z"
                  ></path>
                </g>
                <g className={styles.top}>
                  <path
                    fill="#f15d5f"
                    d="M -47.5 0 a 47.5 47.5 0 0 1 95 0"
                  ></path>
                  <path
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="0 15 9 9 20 100"
                    d="M -38 -0 a 38 38 0 0 1 76 0"
                  ></path>
                  <path
                    fill="none"
                    stroke="#303030"
                    strokeWidth="5"
                    d="M -47.5 0 a 47.5 47.5 0 0 1 95 0z"
                  ></path>
                </g>
                <g className={styles.open} transform="scale(1 0)">
                  <path
                    fill="#303030"
                    stroke="#303030"
                    strokeWidth="5"
                    strokeLinejoin="round"
                    d="M -47.5 -10 a 190 190 0 0 1 95 0 a 190 190 0 0 1 -95 0"
                  ></path>
                  <path
                    fill="#303030"
                    stroke="#303030"
                    strokeWidth="5"
                    strokeLinejoin="round"
                    d="M -47.5 5 a 160 160 0 0 0 95 0 a 180 180 0 0 0 -95 0"
                  ></path>
                </g>
                <g className={styles.center}>
                  <circle
                    fill="#ffffff"
                    stroke="#303030"
                    strokeWidth="5"
                    cx="0"
                    cy="0"
                    r="12"
                  ></circle>
                  <circle
                    fill="#ffffff"
                    stroke="#303030"
                    strokeWidth="3"
                    cx="0"
                    cy="0"
                    r="6"
                  ></circle>
                  <g className={styles.inner} opacity="0">
                    <circle fill="#f15d5f" cx="0" cy="0" r="4.5"></circle>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Pokeball;
