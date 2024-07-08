import { useState, useEffect } from 'react';
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import config from '../../config.json';

export default function Commands() {
  const [commandDetails, setCommandDetails] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch(`${config.base_api_url}/commands`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCommandDetails(data.commandDetails);
      } catch (error) {
        console.error('Error fetching command details:', error);
      }
    };

    fetchCommands();
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>Commands | Community Bot</title>
        <meta
          name="description"
          content="Commands page | Minimal and awesome discord bot website created with ❤️ using NextJS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="about-section">
        <nav className="accordion arrows" id="commands">
          <header className="box">
            <label htmlFor="acc-close" className="box-title h-color">
              ⚡ Commands
            </label>
          </header>
          {commandDetails.length > 0 ? (
            commandDetails.map((category, index) => (
              <div key={index}>
                <input type="radio" name="accordion" id={`cb${index + 1}`} />
                <section className="box">
                  <label className="box-title p-color" htmlFor={`cb${index + 1}`}>
                    {category.category}
                  </label>
                  <label className="box-close" htmlFor="acc-close"></label>
                  <div className="box-content p-color">
                    <ul>
                      {category.commands.map((command, cmdIndex) => (
                        <li key={cmdIndex}>
                          <kbd>/{command}</kbd>{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            ))
          ) : (
            <p>Loading commands...</p>
          )}
          <input type="radio" name="accordion" id="acc-close" />
        </nav>
      </section>
      <Footer />
    </motion.div>
  );
}
