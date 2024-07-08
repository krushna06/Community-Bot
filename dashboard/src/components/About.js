import { useState, useEffect } from 'react';
import Link from 'next/link';
import config from '../../config.json';

const About = () => {
  const [totalCommands, setTotalCommands] = useState(null);
  const [totalServers, setTotalServers] = useState(null);

  // Read the base API URL from environment variables, or use config.json as fallback
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || config.base_api_url;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTotalCommands(data.totalCommands);
        setTotalServers(data.totalServers);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [baseApiUrl]);

  return (
    <>
      <section className="about-section" id="about-section">
        <div className="about-header">
          <h3 className="h-color">Why use this bot?</h3>
        </div>
        <div className="about-container">
          <div className="about-card">
            <div>
              <h4 className="h-color">⚡ Commands</h4>
              <p className="p-color">
                We have various commands for server admins & mods.
              </p>
              <hr />
            </div>
            <div>
              <h4 className="h-color">✉️ Rest API</h4>
              <p className="p-color">
                The REST API provides information about the commands available in the Discord bot.
              </p>
              <hr />
            </div>
            <div>
              <h4 className="h-color">✏️ Customization</h4>
              <p className="p-color">
                Fully customizable discord bot completely FREE!
              </p>
              <hr />
            </div>
          </div>
        </div>
        <p>
          <Link href="/commands" className="h-color no-decoration">
            Check out Commands &rarr;
          </Link>
        </p>

        <section className="about-stats">
          <div className="about-stats-card">
            <h4 className="h-color">{totalServers !== null ? `${totalServers}+` : 'Loading...'}</h4>
            <p className="p-color">Total Servers</p>
          </div>
          <div className="about-stats-card">
            <h4 className="h-color">{totalCommands !== null ? `${totalCommands}+` : 'Loading...'}</h4>
            <p className="p-color">Total Commands</p>
          </div>
        </section>
      </section>
    </>
  );
};

export default About;
