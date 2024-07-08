import Link from "next/link";
import Image from "next/image";
import botOnlineStatus from "../utils/images/botStatus.svg";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="footer">
        <div className="footer-sec1">
          <div className="footer-header">
            <ul>
              <li>
                <Link className="h-color" href="/">
                Community Bot
                </Link>
                <br />
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  className="p-color"
                >
                  <Image
                    src={botOnlineStatus}
                    width={20}
                    height={20}
                    alt="online-status"
                    className="onlineStatus"
                  />{" "}
                  Bot is online!
                </span>
              </li>
            </ul>
          </div>
          <div className="footer-items">
            <ul>
              <li>
                <Link className="p-color" href="/commands">
                  Commands
                </Link>
              </li>
              <li>
                <Link className="p-color" href="#">
                  Support
                </Link>
              </li>
              <li>
                <Link className="p-color" href="#">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-sec2">
          <div className="footer-sec2-link">
            <Link className="p-color no-decoration" href="#">
              Support
            </Link>
            <Link
              target="_blank"
              className="p-color no-decoration"
              href="https://github.com/krushna06/Community-Bot"
            >
              Source Code
            </Link>
            <Link className="p-color no-decoration" href="#">
              Privacy
            </Link>
            <hr />
          </div>
          <p className="p-color">
              Created with ❤️ by{" "}
              <Link
                href="https://github.com/krushna06"
                className="h-color no-decoration"
              >
                Krushna Vyas
              </Link>
            </p>
            <div>
            <p className="p-color">{year} &copy; All rights reserved!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
