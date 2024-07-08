import Head from "next/head";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";

export default function Commands() {
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
          <input type="radio" name="accordion" id="cb1" />
          <section className="box">
            <label className="box-title p-color" htmlFor="cb1">
              Soon
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content p-color">
              <ul>
                <li>
                  <kbd>$command1</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command2</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command3</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
              </ul>
            </div>
          </section>
          <input type="radio" name="accordion" id="cb2" />
          <section className="box">
            <label className="box-title p-color" htmlFor="cb2">
              Soon
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content p-color">
              <ul>
                <li>
                  <kbd>$command1</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command2</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command3</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
              </ul>
            </div>
          </section>
          <input type="radio" name="accordion" id="cb3" />
          <section className="box">
            <label className="box-title p-color" htmlFor="cb3">
              Soon
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content p-color">
              <ul>
                <li>
                  <kbd>$command1</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command2</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command3</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
              </ul>
            </div>
          </section>

          <input type="radio" name="accordion" id="cb4" />
          <section className="box">
            <label className="box-title p-color" htmlFor="cb4">
              Soon
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content p-color">
              <ul>
                <li>
                  <kbd>$command1</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command2</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command3</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
              </ul>
            </div>
          </section>

          <input type="radio" name="accordion" id="cb5" />
          <section className="box">
            <label className="box-title p-color" htmlFor="cb5">
              Soon
            </label>
            <label className="box-close" htmlFor="acc-close"></label>
            <div className="box-content p-color">
              <ul>
                <li>
                  <kbd>$command1</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command2</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
                <li>
                  <kbd>$command3</kbd> -{" "}
                  <span className="p-color">Description of command</span>
                </li>
              </ul>
            </div>
          </section>

          <input type="radio" name="accordion" id="acc-close" />
        </nav>
      </section>
      <Footer />
    </motion.div>
  );
}
