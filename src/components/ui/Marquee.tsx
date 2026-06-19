import { Fragment } from "react";

export default function Marquee({
  items,
  className = "",
  speed = 30,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="marquee-track animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="px-8">{item}</span>
                <span aria-hidden className="text-bone/40">
                  &#9679;
                </span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
