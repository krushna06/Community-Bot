import Link from "next/link";
import { motion } from "framer-motion";

const Showcase = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
    >
      <main className="showcase">
        <h1 className="showcase-header h-color">Community Bot</h1>
        <h2 className="showcase-header-text h-color">
          The only discord bot you need!
        </h2>
        <p className="showcase-para p-color">
        The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community.
        </p>

        <span className="p-color">Bot is online!</span>
        <div className="showcase-btn">
          <button className="btn">
            <Link className="h-color no-decoration" href="#">
              Invite now!
            </Link>
          </button>

          <button className="btn">
            <Link className="h-color no-decoration" href="#">
              Join server!
            </Link>
          </button>
        </div>
      </main>
    </motion.div>
  );
};

export default Showcase;
